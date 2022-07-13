import React from 'react'
// import { Modal, Segment } from 'semantic-ui-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import styled from 'styled-components'
import { IBooking } from '../../types'

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  bookingInfo: IBooking;
  show: boolean;
  modalError?: string;
  handleClose: () => void;
}

const Styles = styled.div`
  p {
    margin: 0
  }
`

// TODO IF Succesfully cancelled BOOKING
// Display modal
// TITLE: "Appointment cancelled"
// BODY: "Appointment was succesfully cancelled."
// 19.4.2021 klo 15:00 - 16:00
// 60 min

const CustomModal = ({
  setShow, title, bookingInfo, show, modalError, handleClose,
}: Props) => {
  const bodyContent = () => {
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
      <Styles>
        <h4>Varaus on nyt peruttu.</h4>
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
          Therapist
        </p>
      </Styles>
    )
  }

  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalError ? 'Tapahtui virhe' : title }</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalError || bodyContent()}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => (modalError ? setShow(false) : handleClose())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )

  // <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
  //   <Modal.Header>Add a new patient</Modal.Header>
  //   <Modal.Content>
  //     {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
  //     <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
  //   </Modal.Content>
  // </Modal>
}

CustomModal.defaultProps = {
  modalError: undefined,
}

export default CustomModal
// TODO IF not succesfully cancelled BOOKING
// Display modal
// TITLE: "Error occurred"
// BODY: "Booking was not found."
// 1. "Booking was not found."
// 2. "Something went wrong.""
