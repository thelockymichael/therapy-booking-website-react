import Joi from '@hapi/joi'

export const newBookingInputValidator = Joi.object({
  serviceName: Joi.string().required(),
  serviceType: Joi.string().required(),
  scheduledTimeMinutes: Joi.number().required(),
  startAppointment: Joi.date().required(),
  endAppointment: Joi.date().required(),
  onlineMeetingUrl: Joi.string().required(),
  receptionAddress: Joi.string().optional(),
  extraInfo: Joi.string().allow(null, ''),
  bookingHolder: Joi.object({
    id: Joi.number().optional(),
    streetAddress: Joi.string().optional(),
    email: Joi.string().required(),
    phoneNum: Joi.string().allow(null, ''),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
  therapist: Joi.object({
    email: Joi.string().required(),
  }),
})

export const newContactInputValidator = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().optional(),
  subject: Joi.string().required(),
  content: Joi.string().required(),
  therapist: Joi.object({
    email: Joi.string().required(),
  }),
})


export const schemaOptions = {
  abortEarly: false, // include all errors
  allowUnknown: true, // ignore unknown props
  stripUnknown: true // remove unknown props
}
