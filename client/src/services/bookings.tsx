import axios from 'axios'
import authConfig from '../config/auth.config'
import {
  BookingForm, BookingRemove, IBooking, NewBooking,
} from '../types'

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001' : 'http://164.90.192.154'

// eslint-disable-next-line consistent-return
const createNew = async (formObject: BookingForm) => {
  const { data: bookingData } = await axios.post<NewBooking>(
    `${baseUrl}/api/booking`,
    {
      ...formObject,
      onlineMeetingUrl: 'https://zoom.us/',
      therapist: { email: authConfig.therapist },
    },
  )

  return bookingData
}

const verifyBooking = async (code: string) => {
  const { data: bookingData } = await axios.get<IBooking>(
    `${baseUrl}/api/booking/confirmation/${code}`,
  )
  return bookingData
}

const cancelAppointment = async (bookingInfo: IBooking) => {
  const { data: deletedBookingData } = await axios.delete<BookingRemove>(
    `${baseUrl}/api/booking/${bookingInfo.id}`,
    {
      headers: {
        Authorization: `bearer ${bookingInfo.confirmationCode}`,
      },
    },
  )
  return deletedBookingData
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createNew, verifyBooking, cancelAppointment }
