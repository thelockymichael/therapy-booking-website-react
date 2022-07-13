import axios from 'axios'
import authConfig from '../config/auth.config'
import {
  IContactForm,
} from '../types'

const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001' : 'http://164.90.192.154'

// eslint-disable-next-line consistent-return
const sendContactForm = async (formObject: IContactForm) => {
  const { data: contactForm } = await axios.post<IContactForm>(
    `${baseUrl}/api/contact`,
    {
      ...formObject,
      therapist: { email: authConfig.therapist },
    },
  )

  return contactForm
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { sendContactForm }
