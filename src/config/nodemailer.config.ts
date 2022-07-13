import moment from "moment"
import nodemailer from "nodemailer"
import { NewBooking, NewContact } from "types"
import config from "../config/auth.config"

import { weekDayToFinnish} from "../utils"

const user = config.user
const pass = config.pass

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass
  }
})

// 1. NewBooking

// 2. confirmationCode
export const sendConfirmationBookingEmail = (booking: NewBooking, confirmationCode: string) => {
  const subjectDate = moment(booking.startAppointment).format('DD.MM.')

  const appointmentDate = moment(booking.startAppointment).format('DD.MM.YYYY')
  const appointmentTime = moment(booking.startAppointment).format('HH:mm')
  const endAppointmentTime = moment(booking.startAppointment)
    .add(booking.scheduledTimeMinutes, 'm')
    .format('HH:mm')

  const dt = moment(appointmentDate, "YYYY-MM-DD HH:mm:ss")
  let weekDay = dt.format('dddd')

  weekDay = weekDayToFinnish(weekDay)
  

  // URL link to modifying appointment
  const baseUrl = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/booking/terapiapalvelut/booking/${confirmationCode}`
    : `http://164.90.192.154/booking/terapiapalvelut/booking/${confirmationCode}`

  // TODO Send email to therapist 

  // 1. Another transport.sendEmail with
  // 2. bookingHolder's details
  // 3. 

  // Send notification to therapist for 

  // Booking holder details
  const {firstName, lastName} = booking.bookingHolder

  // To Therapist
  transport.sendMail({
    from: user,
    to: booking.therapist.email,
    subject: `Varausvahvistus - ${firstName} ${lastName} - ${weekDay} ${subjectDate} klo ${appointmentTime}`,
    html: `
    <b>${firstName} ${lastName} on varannut ajan.</b>
    <p>Varauksen tiedot</p>
    <p>
      ${appointmentDate} klo ${appointmentTime} - ${endAppointmentTime}
    </p>
    <p>
      ${booking.serviceType}
    </p>
    <p>
      Varauskoodi: ${confirmationCode}
    </p>
    <a href=${baseUrl}>Avaa varaus</a>
    <p>
      Tapaaminen pidetään etänä alla olevassa osoitteessa:
    </p>
    <a href=${booking.startOnlineMeetingUrl}>
      Link to Zoom meeting
    </a>
    `,
    // eslint-disable-next-line no-console
  }).catch(err => console.log(err))

  // To BookingHolder
  transport.sendMail({
    from: user,
    to: booking.bookingHolder.email,
    subject: `Varausvahvistus - ${weekDay} ${subjectDate} klo ${appointmentTime}`,
    html: `
          <b>Kiitos varauksestasi!</b>
          <p>Varauksesi tiedot </p>
          <p>
            ${appointmentDate} klo ${appointmentTime} - ${endAppointmentTime}
          </p>
          <p>
            ${booking.serviceType}
          </p>
          <p>
             
          </p>
          <p>
            Varauskoodi: ${confirmationCode}
          </p>
          <a href=${baseUrl}>Avaa varaus</a>
          <p>
            Otathan yhteyttä, mikäli haluat tarkentaa tai muuttaa varaustasi.
          </p>
          <p><b>Yhteystiedot: </b></p>
          <p>
            Lyhytterapeutti  
          </p>
          <p>
            (e.g. phone num 341541251) (phone num goes here)
          </p>
          <p>
            ${booking.therapist.email}
          </p>
          <p>
            Tapaaminen pidetään etänä alla olevassa osoitteessa:
          </p>
          <a href=${booking.joinOnlineMeetingUrl}>
            Link to Zoom meeting
          </a>
          `,
  // eslint-disable-next-line no-console
  }).catch(err => console.log(err))
  
}


export const sendCancelledBookingEmail = (booking: NewBooking, confirmationCode: string) => {
  const subjectDate = moment(booking.startAppointment).format('DD.MM.')

  const appointmentDate = moment(booking.startAppointment).format('DD.MM.YYYY')
  const appointmentTime = moment(booking.startAppointment).format('HH:mm')
  const endAppointmentTime = moment(booking.startAppointment)
    .add(booking.scheduledTimeMinutes, 'm')
    .format('HH:mm')

  const dt = moment(appointmentDate, "YYYY-MM-DD HH:mm:ss")
  let weekDay = dt.format('dddd')

  weekDay = weekDayToFinnish(weekDay)

  const bookingPageUrl = process.env.NODE_ENV === 'development'
    ? `http://localhost:3000/booking/terapiapalvelut/`
    : `http://164.90.192.154/booking/terapiapalvelut/`


  // Booking holder details
  const {firstName, lastName} = booking.bookingHolder

  // To Therapist
  transport.sendMail({
    from: user,
    to: booking.therapist.email,
    subject: `Peruttu varaus - ${firstName} ${lastName} - ${weekDay} ${subjectDate} klo ${appointmentTime}`,
    html: `
    <h4><b>${firstName} ${lastName} on perunut varauksen</b></h4>
    <p>Varauksen tiedot</p>
    <p>
      ${appointmentDate} klo ${appointmentTime} - ${endAppointmentTime}
    </p>
    <p>
      ${booking.serviceType}
    </p>
    <p>
      Varauskoodi: ${confirmationCode}
    </p>
    `,
  // eslint-disable-next-line no-console
  }).catch(err => console.log(err))


  // To BookingHolder
  transport.sendMail({
    from: user,
    to: booking.bookingHolder.email,
    subject: `Varaus peruttu - ${weekDay} ${subjectDate} klo ${appointmentTime}`,
    html: `
    <h4><b>Varauksesi on peruttu</b></h4>
    <p>Varauksesi tiedot</p>
    <p>
      ${appointmentDate} klo ${appointmentTime} - ${endAppointmentTime}
    </p>
    <p>
      ${booking.serviceType}
    </p>
    <p> </p>
    <p>
      Varauskoodi: ${confirmationCode}
    </p>
    <br />
    <br />
    <p>
      Voit varata uuden ajan <a href=${bookingPageUrl}>varaussivultamme</a>.
    </p>
    `,
  // eslint-disable-next-line no-console
  }).catch(err => console.log(err))
}

export const sendContactForm = (contactForm: NewContact): void => {

  // Booking holder details
  const {
    firstName, lastName,
    phone, email,
    subject, content, therapist
  } = contactForm

  // To Therapist
  transport.sendMail({
    from: user,
    to: therapist.email,
    subject: `Yhteyslomake, ${subject} -${firstName} ${lastName}`,
    html: `
    <p>${content}</p>
    <h4><b>Yhteystiedot</b></h4>
    <p>Nimi: ${firstName} ${lastName}</p>
    <p>Puh.nro: ${phone}</p>
    <p>Sähköposti: ${email}</p>
    `,
  }).catch(err => 
    // eslint-disable-next-line no-console
    console.log(err)
  )
}
