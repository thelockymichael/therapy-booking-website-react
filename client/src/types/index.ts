import { FormikErrors, FormikProps, FormikTouched } from 'formik'

export interface BookingForm {
  serviceName: string,
  serviceType: string,
  scheduledTimeMinutes: number,
  startAppointment: string,
  endAppointment: string,
  extraInfo?: string,
  bookingHolder?: {
    email?: string,
    phoneNum?: string,
    firstName?: string,
    lastName?: string,
  }
}

export interface NewBooking {
  serviceName: string,
  serviceType: string,
  scheduledTimeMinutes: number,
  startAppointment: string,
  endAppointment: string,
  extraInfo: string,
  onlineMeetingUrl: string,
  bookingHolder: {
    email?: string,
    phoneNum?: string,
    firstName?: string,
    lastName?: string,
  }
  therapist: {
    email: string
  }
}

interface BookingHolder {
  id: number,
  email: string,
  phoneNum: string,
  firstName: string,
  lastName: string,
  streetAddress: string
}

interface Therapist {
  id: number,
  streetAddress: string
  email: string,
  firstName: string,
  lastName: string,
  phoneNum: string,
}

export interface IBooking {
  id: number,
  serviceName: string,
  serviceType: string,
  scheduledTimeMinutes: number,
  startAppointment: string,
  endAppointment: string,
  onlineMeetingUrl: string,
  receptionAddress: string,
  extraInfo?: string,
  confirmationCode?: string,
  bookingHolder?: BookingHolder,
  therapist?: Therapist
}

export type ITabWithoutSetFieldValue = Omit<ITab, 'setFieldValue'>
export interface ITabWithInputContactFields extends ITabWithoutSetFieldValue {
  errors: FormikErrors<BookingForm>
}

export interface ITabWithHandleSubmit extends ITabWithoutSetFieldValue {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export interface ITab {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
  selectedTab: number,
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>['setFieldValue'],
  tabCount: number,
  values: BookingForm
}

// AXIOS methods

export interface BookingRemove {
  code: 200,
  message: string,
  deletedBooking: IBooking
}

export interface IContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  content: string;
}

/** END AXIOS methods */
