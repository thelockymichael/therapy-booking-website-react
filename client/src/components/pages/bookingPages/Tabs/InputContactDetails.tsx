import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import {
  FormikErrors, Field, getIn,
} from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import bookingService from '../../../../services/bookings'
import { isEmpty, parseString } from '../../../../utils'
import { BookingForm, ITabWithInputContactFields, ITabWithoutSetFieldValue } from '../../../../types'
import { TextField } from '../../../FormField'
import colors from '../../../../colors'
import ErrorModal from '../../../Modal/ErrorModal'

const Styles = styled.div`
  width: 100%;
  margin: 0 auto;
  

  .header-container {
    margin-top: 5rem;
    margin-bottom: 4rem;
  }

  p {
    margin: 0;
  }

  /* Font styling */
  .poppins-font {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .avenir-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
  }

  .header-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 700;
    font-size: 32px;
  }

  /*  END  */

  /* Bottom Container */
  .bottom-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 8rem; 
  }

  .back-btn {
    display: flex;
    align-items: center;
    background-color: ${colors.champagnePink};
    padding: 1rem 1.5rem;
    border: 0;
    color: black;

    :hover {
      background-color: ${colors.desertSand};
      color: black;
    }
  }

  .next-btn {
    display: flex;
    align-items: center;
    border: 0;
    background-color: ${colors.antiqueBrass};
    padding: 1rem 1.5rem;
    :hover {
      background-color: #92593A
    }
  }
`

const InputContactDetails: React.FC<ITabWithInputContactFields> = ({
  errors,
  values,
  setSelectedTab,
  selectedTab,
  tabCount,
}) => {
  // ErrorModal
  const [modalError, setModalError] = useState<string>('')
  const [modalTitleError, setModalTitleError] = useState<string>('')
  const [show, setShow] = useState(false)

  const closeConfirmation = () => {
    setShow(false)
    // history.push('/')
  }

  const [formErrors, setFormErrors] = useState<{
    firstName: string,
    lastName: string,
    email: string,
    phoneNum: string
  }>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
  })

  const validate = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const contactErrors: {firstName: string, lastName: string, email: string, phoneNum: string} = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
    }

    console.log('errors', errors.bookingHolder)
    console.log('errors', getIn(errors, 'bookingHolder.firstName'))
    console.log('errors', getIn(errors, 'bookingHolder.lastName'))
    console.log('errors', getIn(errors, 'bookingHolder.email'))
    console.log('errors', getIn(errors, 'bookingHolder.phoneNum'))

    // const errors: FormikErrors<BookingForm> = {}

    console.log('Values jotain', values)

    if (!values.bookingHolder?.firstName) {
      contactErrors.firstName = 'Etunimi puuttuu'
    }

    if (!values.bookingHolder?.lastName) {
      contactErrors.lastName = 'Sukunimi puuttuu'
    }

    if (!values.bookingHolder?.email) {
      contactErrors.email = 'Sähköposti puuttuu'
    }

    // const bookingHolderEmail = getIn(values, 'bookingHolder.email')

    // console.log('bookingHolderEmail', bookingHolderEmail)

    // Validate form
    if (!isEmpty(errors)) {
      setFormErrors(contactErrors)
    } else {
      setFormErrors({
        firstName: '',
        lastName: '',
        email: '',
        phoneNum: '',
      })

      // Submit POST Request to BACKEND
      await bookingService.createNew(values)
        .then((response) => {
          setSelectedTab((selectedTab + 1) % tabCount)

          console.log('bookingData response', response)
        }).catch((error: any) => {
          const data = error.response.data as string
          const status = error.response.status as string
          const statusText = error.response.statusText as string

          // Something went wrong
          // status 400 Bad request
          if (!error.response.data) {
            setModalError('Unknown error')
            setModalTitleError('Error Occurred')
            setShow(true)
          }

          if (data.includes("No 'Therapist' record(s)")) {
            setModalError('(email goes here) not found.')
            setModalTitleError(`${status} ${statusText}`)

            setShow(true)
          }
        })
    }
  }

  return (
    <Styles>
      <div className="header-container">
        <span className="header-font">
          Syötä yhteystiedot
        </span>
      </div>
      {formErrors.firstName
        ? (
          <p style={{ color: 'red' }}>Etunimi puuttuu</p>
        )
        : null}
      <Field
        label="Etunimi (*)"
        placeholder="Etunimi"
        name="bookingHolder.firstName"
        component={TextField}
      />
      {formErrors.lastName
        ? (
          <p style={{ color: 'red' }}>Sukunimi puuttuu</p>
        )
        : null}
      <Field
        label="Sukunimi (*)"
        placeholder="Sukunimi"
        name="bookingHolder.lastName"
        component={TextField}
      />
      {formErrors.email
        ? (
          <p style={{ color: 'red' }}>Sähköposti puuttuu</p>
        )
        : null}
      <Field
        label="Sähköposti (*)"
        placeholder="Sähköposti"
        name="bookingHolder.email"
        component={TextField}
      />
      <Field
        label="Puhelin (ei pakollinen)"
        placeholder="Puhelin"
        name="bookingHolder.phoneNum"
        component={TextField}
      />

      <div className="bottom-container">
        <div style={{ flex: 2, textAlign: 'left' }}>

          {/* {!isEmpty(formErrors)
        && (
        <h1 style={{ color: 'red' }}>
          {formErrors.firstName}
        </h1>
        )} */}
          {parseString(values.serviceType) && (
          <p>
            {values.serviceType}
            ,  
          </p>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => setSelectedTab((selectedTab + tabCount - 1) % tabCount)}
            variant="primary"
            size="lg"
            className="back-btn"
          >
            <div style={{ flex: 1, marginRight: '1.25rem' }}>
              <FontAwesomeIcon
                size="2x"
                icon={faCaretLeft as IconProp}
              />
            </div>
            <div style={{ flex: 2 }}>
              <span className="avenir-font">
                Takaisin
              </span>
            </div>
          </Button>
          <Button
            onClick={validate}
            variant="primary"
            size="lg"
            className="next-btn"
          >
            <div style={{ flex: 2 }}>
              <span className="avenir-font">
                Valmis
              </span>
            </div>
            <div style={{ flex: 1, marginLeft: '1.25rem' }}>
              <FontAwesomeIcon
                size="2x"
                icon={faCaretRight as IconProp}
              />
            </div>
          </Button>
        </div>
      </div>
      <ErrorModal
        body={modalError}
        title={modalTitleError}
        show={show}
        handleClose={closeConfirmation}
      />
    </Styles>
  )
}

export default InputContactDetails
