import moment from 'moment'
import { BookingForm } from '../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any) => Object.keys(value).length === 0

export const isString = (text: unknown): text is string => typeof text === 'string' || text instanceof String

export const parseString = (string: string): boolean => {
  if (!string || !isString(string)) {
    return false
  }
  return true
}

export const weekDayToFinnish = (weekDay: string) => {
  switch (weekDay) {
    case 'Monday':
      return 'ma'
    case 'Tuesday':
      return 'ti'
    case 'Wednesday':
      return 'ke'
    case 'Thursday':
      return 'to'
    case 'Friday':
      return 'pe'
    case 'Saturday':
      return 'la'
    case 'Sunday':
      return 'su'
    default:
      return 'ma'
  }
}

export const formatAppointmentDate = (values: BookingForm) => {
  const {
    startAppointment,
    endAppointment,
  } = values

  const startDate = moment(startAppointment).format('DD.MM.YYYY')
  const startTime = moment(startAppointment).format('HH:mm')
  const endTime = moment(endAppointment).format('HH:mm')

  return `${startDate} klo ${startTime} - ${endTime}`
}

// DO not show features in development

export const inDevelopment = process.env.NODE_ENV === 'development'
