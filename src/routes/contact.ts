import express, { Request, Response } from "express"
import { NewBooking } from "types"
import { newContactInputValidator, schemaOptions } from "../validation"
import * as nodemailer from "../config/nodemailer.config"


import { prisma } from "../app"

const router = express.Router()

router.post("/", async (req: Request, res: Response) => {
  try {

    const { therapist }: NewBooking = req.body

    // validate request body against schema
    const { error } = newContactInputValidator.validate(req.body, schemaOptions)
  
    if (error) {
      // on fail return comma separated errors
      // eslint-disable-next-line no-console
      console.log(`Validation error: ${error.details.map(x => x.message).join(', ')}`)
      res.json({error: `Validation error: ${error.details.map(x => x.message).join(', ')}`})

    } 

    const foundTherapist = await prisma.therapist.findUnique({
      where: { email: therapist.email}
    })

    if (!foundTherapist) {
      return res.status(404).send("Therapist not found.")
    }

    nodemailer.sendContactForm(
      req.body
    )

    res.json(req.body)
   

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(error: unknown) {
    let errorMessage = "Something went wrong."

    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})



export { router as contactRouter }
