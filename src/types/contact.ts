import  {Therapist} from "./booking"

export type NewContact = Omit<IContact, 'id'>

interface IContact {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone?: string,
  subject: string,
  content: string,
  therapist: Therapist
}