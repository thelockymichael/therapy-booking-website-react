import React from 'react'
// import { Modal, Segment } from 'semantic-ui-react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

interface Props {
  title: string;
  body: string;
  show: boolean;
  handleClose: () => void;
  yesConfirmation: () => void;
}

// TODO IF Succesfully cancelled BOOKING
// Display modal
// TITLE: "Appointment cancelled"
// BODY: "Appointment was succesfully cancelled."
// 19.4.2021 klo 15:00 - 16:00
// 60 min

const ConfirmModal = ({
  title, body, show, handleClose, yesConfirmation,
}: Props) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title }</Modal.Title>
    </Modal.Header>
    <Modal.Body>{body}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        No
      </Button>
      <Button variant="primary" onClick={yesConfirmation}>
        Yes
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

export default ConfirmModal
// TODO IF not succesfully cancelled BOOKING
// Display modal
// TITLE: "Error occurred"
// BODY: "Booking was not found."
// 1. "Booking was not found."
// 2. "Something went wrong.""
