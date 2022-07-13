export type NewBooking = Omit<IBooking, 'id'>

export type NewTherapist = Omit<Therapist, 'id'>


interface IBooking {
  id: number,
  serviceName: string,
  serviceType: string,
  scheduledTimeMinutes: number,
  startAppointment: string | Date,
  endAppointment: string | Date,
  startOnlineMeetingUrl?: string | null,
  joinOnlineMeetingUrl?: string | null,
  receptionAddress?: string | null,
  extraInfo?: string | null,
  bookingHolder: BookingHolder
  therapist: Therapist
}

interface BookingHolder {
  id?: number,
  email: string,
  phoneNum: string,
  firstName: string,
  lastName: string,
  streetAddress?: string | null
}

export interface Therapist {
  id?: number,
  streetAddress?: string | null,
  email: string,
  firstName: string,
  lastName: string,
  phoneNum: string 
}

