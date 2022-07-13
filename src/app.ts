import { PrismaClient } from '@prisma/client'
import express, { Application, Request, Response } from 'express'
import cors from "cors"
import path from "path"
import { NewBooking, NewTherapist} from 'types'
import * as nodemailer from "./config/nodemailer.config"
import jwt from "jsonwebtoken"
import config from "./config/auth.config"
import { createZoomMeeting, getTokenFrom, validateAccessCode } from "./utils"
import { newBookingInputValidator, schemaOptions } from './validation'
import { contactRouter } from './routes/contact'
import 'dotenv/config'

export const prisma = new PrismaClient()
const app: Application = express()

const options: cors.CorsOptions = {
  credentials: true,
  origin: true,
}

app.use(express.json())

app.use(cors(options))
// // eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "../public")))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// GET ALL BOOKINGS with an assigned therapist and bookingHolder
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { bookingHolder: true, therapist: true }
    })

    res.json(bookings)
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})


// CREATE NEW BOOKING with the reference to therapist and bookingHolder
app.post("/api/booking", async (req, res) => {
  try {
    // validateAccessCode(req, res)

    const {
      serviceName, serviceType, scheduledTimeMinutes,
      startAppointment, endAppointment, receptionAddress,
      extraInfo, bookingHolder, therapist
    }: NewBooking = req.body

    // validate request body against schema
    const { error } = newBookingInputValidator.validate(req.body, schemaOptions)
  
    if (error) {
      // on fail return comma separated errors
      // eslint-disable-next-line no-console
      console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
      res.json({error: `Validation error: ${error.details.map(x => x.message).join(', ')}`})

    } 
    // // CREATE confirmationCode

    const zoomMeeting = await createZoomMeeting(req, res)

    // eslint-disable-next-line no-console
    console.log("zoomMeeting", zoomMeeting)
    
    // TODO start_url
    // TODO join_url

    const token = jwt.sign({ email: bookingHolder.email }, config.secret)
    // eslint-disable-next-line no-console
    console.log("confirmationCode", token)

    const result = await prisma.booking.create({
      data: {
        startOnlineMeetingUrl: zoomMeeting.start_url,
        joinOnlineMeetingUrl: zoomMeeting.join_url,
        serviceName,
        serviceType,
        scheduledTimeMinutes,
        startAppointment,
        endAppointment,
        receptionAddress,
        extraInfo,
        confirmationCode: token,
        bookingHolder: { create: {
          email: bookingHolder.email,
          phoneNum: bookingHolder.phoneNum,
          firstName: bookingHolder.firstName,
          lastName: bookingHolder.lastName,
          streetAddress: bookingHolder.streetAddress ?? "",
        }},
        therapist: {
          connect: {email: therapist.email}
        }
      }
    })

    // eslint-disable-next-line no-console
    console.log("zoomMeeting", zoomMeeting)
    
    // TODO start_url
    // TODO join_url

    // res.json(zoomMeeting)

    // TODO start_url
    // TODO join_url
    nodemailer.sendConfirmationBookingEmail(
      {
        ...req.body,
        startOnlineMeetingUrl: zoomMeeting.start_url,
        joinOnlineMeetingUrl: zoomMeeting.join_url
      },
      token
    )

    res.json(result)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

// VERIFY BOOKING with confirmationCode

app.get("/api/booking/confirmation/:confirmationCode", async (req, res) => {
  
  // validateAccessCode(req, res)

  const { confirmationCode } = req.params

  try {
    const foundBooking = await prisma.booking.findUnique({
      where: { confirmationCode: confirmationCode}
    })

    // eslint-disable-next-line no-console
    console.log("booking")
      
    if (!foundBooking) {
      return res.status(404).send("Booking not found.")
    }

    return res.json(foundBooking)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})


// DELETE BOOKING
app.delete("/api/booking/:id", async (req: Request, res: Response) => {
  try {

    const confirmationCode = getTokenFrom(req)

    const { id } = req.params

    const foundBooking = await prisma.booking.findUnique({
      where: { id: Number(id)}
    })
    // eslint-disable-next-line no-console
    console.log("booking", foundBooking)
      
    if (!foundBooking) {
      return res.status(404).send("Booking not found.")
    }

    const correctConfirmation = foundBooking.confirmationCode === confirmationCode
    if (!correctConfirmation) {
      return res.status(401).json({ error: "confirmation code missing or invalid" })
    }
    
    const deletedBooking = await prisma.booking.delete({
      where: { id: Number(id) },
      include: { bookingHolder: true, therapist: true }
    })

    nodemailer.sendCancelledBookingEmail(
      deletedBooking,
      confirmationCode
    )

    res.status(200).json({
      code: 200,
      message: `booking ${id} successfully deleted`,
      deletedBooking
    })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

/**  ALL Therapist routes */

// GET Therapists
app.get("/api/therapists", async (req, res) => {
  try {

    const allTherapists = await prisma.therapist.findMany({
      include: { bookings: true}
    })

    res.json(allTherapists)

  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

// GET Therapist by ID
app.get("/api/therapist/:id", async (req, res) => {
  try {
    const { id } = req.params

    const therapist = await prisma.therapist.findUnique({
      where: { id: Number(id) }
    })

    res.json(therapist)

  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

// POST Therapist
app.post("/api/therapist", async (req, res) => {
  try {
    validateAccessCode(req, res)

    const body: NewTherapist = req.body
    
    const result = await prisma.therapist.create({
      data: { ...body, streetAddress: "" }
    })

    res.json(result)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

// DELETE Therapist
app.delete("/api/therapist/:id", async (req, res) => {
  try {
    validateAccessCode(req, res)

    const { id } = req.params

    const result = await prisma.therapist.delete({
      where: { id: Number(id) },
    })

    res.json(result)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

/** END Therapist routes  */

/** CONTACT FORM */
app.use("/api/contact", contactRouter)
/** END CONTACT FORM */

app.get("*", (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.resolve(__dirname, "../public", "index.html"))
})



export default app



 
// const result = await prisma.therapist.create({
//   data: {
//       streetAddress: therapist.streetAddress,
//       email: therapist.email,
//       firstName: therapist.firstName,
//       lastName: therapist.lastName,
//       phoneNum: therapist.phoneNum,
//     }
//   }
// })

