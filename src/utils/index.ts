import { Request, Response } from "express"
import authConfig from '../config/auth.config'
import jwt from "jsonwebtoken"
import rp from "request-promise"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (n: any) => {
  return !isNaN(parseFloat(n)) && isFinite(n)
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

export const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7)
  }

  return null
}

// Validate hard-coded accessCode
export const validateAccessCode = (req: Request, res: Response) => {
  const accessCode = getTokenFrom(req)


  const correctAccessCode = accessCode === authConfig.accessCode 

  if (!correctAccessCode) {
    return res.status(401).json({ error: "token missing or invalid" })
  }
}

export const createZoomMeeting = async (req: Request, res: Response) => {
  const payload = {
    iss: authConfig.ZOOM_API_KEY,
    exp: ((new Date()).getTime() + 5000)
  }
  
  const zoom_token = jwt.sign(payload, authConfig.ZOOM_API_SECRET)
  
  const email = "(email goes here)"

  const options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Ratkausukeskeinen lyhytterapia - Etävastaanotto 60min",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true"
      }
    },
    auth: {
      bearer: zoom_token
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json"
    },
    json: true //Parse the JSON string in the response
  }
  try {
    const response = await rp(options) 

    return response
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log("API call failed, reason ", error)
    res.json({ error })
  }
}
