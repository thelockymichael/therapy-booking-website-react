import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone, faEnvelope, faForward, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { RouteComponentProps } from 'react-router'
import moment from 'moment'
import CustomModal from '../../Modal/CustomModal'
import ConfirmModal from '../../Modal/ConfirmModal'
import ActivityIndicator from '../../ActivityIndicator/Spinner'
import Layout from '../../Layout'
import { IBooking } from '../../../types'

import bookingService from '../../../services/bookings'
import colors from '../../../colors'
import { inDevelopment } from '../../../utils'

// const schema = Yup.object().shape({
//   serviceName: Yup.string().required('Service name is required'),
//   serviceType: Yup.string().required('Service type is required'),
// })

const Styles = styled.div`
  width: 50%;
  margin: 0 auto;

  p {
    margin: 0
  }

  .container {
    margin-top: 4rem;
    margin-bottom: 8rem;
  }

  .info-container {
    background-color: ${colors.desertSand};
    padding: .75rem;
  }

  .contact-details {
    position: absolute;
    margin: 1.25rem;
    right: 0;
  }
`

interface MatchParams {
  confirmationCode: string;
  name: string;
}

type Props = RouteComponentProps<MatchParams>

const EditBooking = ({ match }: Props) => {
  const history = useHistory()

  const [show, setShow] = useState(false)
  const [modalError, setModalError] = useState<string>()

  const [bookingInfo, setBookingInfo] = useState<IBooking>({
    serviceName: '',
    extraInfo: '',
    startAppointment: '',
    endAppointment: '',
    serviceType: '',
    scheduledTimeMinutes: 0,
    id: 0,
    onlineMeetingUrl: '',
    receptionAddress: '',
  })
  const [errorMsg, setErrorMsg] = useState<{status: number, message: string} | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('AuthService verify booking')

        const bookingData = await bookingService.verifyBooking(match.params.confirmationCode)
        // eslint-disable-next-line no-console
        console.log('bookingData', bookingData)

        setBookingInfo(bookingData)
        setLoading(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('error.response', error.response)
        setErrorMsg({
          message: error.response.data,
          status: error.response.status,
        })
        setLoading(false)
      }
    }

    if (match.path === '/booking/terapiapalvelut/booking/:confirmationCode') {
      verifyToken()
    }
  }, [])

  const handleCancellation = async () => {
    // eslint-disable-next-line no-console
    // console.log('formValues', formValues)
    // TODO Cancel appointment functionality
    try {
      // BACKUP
      const deletedBooking = await bookingService.cancelAppointment(bookingInfo)
      // eslint-disable-next-line no-console
      console.log('bookingData', deletedBooking)

      // setBookingInfo(bookingData)
      // setLoading(false)
      setShow(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error.response', error.response || 'Unknown Error')
      setModalError(error.response.data || 'Unknown Error')

      setShow(true)
    }
  }

  /** Modals */
  // CustomModal

  const handleClose = () => {
    setShow(false)
    history.push('/')
  }

  // ConfirmModal
  const [showConfirmation, setShowConfirmation] = useState(false)

  const closeConfirmation = () => {
    setShowConfirmation(false)
    // history.push('/')
  }

  const yesConfirmation = () => {
    setShowConfirmation(false)

    handleCancellation()
    // history.push('/')
  }
  /** Modals END */

  const formattedInformation = () => {
    const {
      startAppointment,
      endAppointment,
      serviceType,
      scheduledTimeMinutes,
    } = bookingInfo

    const startDate = moment(startAppointment).format('DD.MM.YYYY')
    const startTime = moment(startAppointment).format('HH:mm')
    const endTime = moment(endAppointment).format('HH:mm')

    const minutes = `${scheduledTimeMinutes} min`
    return (
      <div>
        <div className="info-container">
          <h4>Varauksesi</h4>
          <p>
            {startDate}
            {' '}
            klo
            {' '}
            {startTime}
            {' '}
            -
            {' '}
            {endTime}
          </p>
          <p>
            {serviceType}
          </p>
          <p>
            {minutes}
          </p>
          <p>
             
          </p>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageContainer = () => {
    if (errorMsg) {
      return (
        <>
          <h1>Varauksen muuttaminen tai poistaminen</h1>
          <h4>
            {errorMsg.status}
            :
            {' '}
            {errorMsg.message}
          </h4>
        </>

      )
    }

    return (
      <>
        <h1>Varauksen muuttaminen tai poistaminen</h1>
        <div className="info-container">
          {formattedInformation()}
        </div>
        {inDevelopment
        && (
        <Button
          variant="primary"
          // eslint-disable-next-line no-console
          onClick={() => console.log('EditBooking')}
          size="lg"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            <FontAwesomeIcon icon={faForward as IconProp} />
            <div style={{ marginLeft: '1rem' }}>
              Siirrä
            </div>
          </div>
        </Button>
        )}
        <Button
          variant="danger"
          onClick={() => setShowConfirmation(true)}
          size="lg"
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            <FontAwesomeIcon icon={faTrash as IconProp} />
            <div style={{ marginLeft: '1rem' }}>
              Peruuta varaus
            </div>
          </div>
        </Button>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}
      </>
    )
  }

  return (
    <Layout>

      <Styles>
        <div className="contact-details">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            <FontAwesomeIcon icon={faPhone as IconProp} />
            <div style={{ marginLeft: '1rem' }}>
              <p>
                (e.g. phone num 341541251) (phone num goes here)
              </p>
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            <FontAwesomeIcon icon={faEnvelope as IconProp} />
            <div style={{ marginLeft: '1rem' }}>
              <p>
                <a style={{ textDecoration: 'none' }} href="safasf.asfasf@gmail.com">
                  safasf.asfasf@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="container">

          {/* {TODO Activity Indicator} */}

          {isLoading ? <ActivityIndicator />

            : pageContainer()}

        </div>
        <ConfirmModal
          title="Peru varaus"
          body="Oletteko varma, että haluatte perua tämän varauksen?"
          show={showConfirmation}
          handleClose={closeConfirmation}
          yesConfirmation={yesConfirmation}
        />
        <CustomModal setShow={setShow} modalError={modalError} title="Varaus on peruutettu" bookingInfo={bookingInfo} show={show} handleClose={handleClose} />
        {/* <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal> */}
      </Styles>
    </Layout>
  )
}

export default EditBooking
