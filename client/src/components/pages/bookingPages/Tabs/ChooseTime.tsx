import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import {
  FormikErrors,
} from 'formik'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { isEmpty, parseString } from '../../../../utils'
import { BookingForm, ITab } from '../../../../types'
import colors from '../../../../colors'

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
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  .service-name-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 20px;
  }

  .accordion-main-option-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 24px;
  }

  .accordion-sub-option-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 20px;
  }


  .free-dates-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 20px;
  }

  .free-times-font {
    font-family: 'AveniAvenirdr', sans-serif;
    font-weight: 400;
    font-size: 20px;
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
    margin-bottom: 2.5rem;
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

  .bottom-container p {
    margin: 0;
  }
  /* END */

  .container {
     display: flex;
     flex-direction: row;
   }

   .left-side {
    flex: 1;
    text-align: left;
   }

   .right-side {
    flex: 3;
   }

  
   /* list-group-item list-group-item-action */
   .active {
    background-color: turquoise;
    border: 0;
   }
  /* END */

  .right-side .list-group {
    width: 6rem;
    text-align: center;
  }

  .list-group-item {
    background-color: white;
  }
`

const ChooseTime: React.FC<ITab> = ({
  values,
  setFieldValue,
  setSelectedTab,
  selectedTab,
  tabCount,
}) => {
  // TODO
  // 1. Choose date: e.g. 29th of April
  // 2. Show times for 29th of april from 9:00 to 17:00
  // 3. Select date: 29.4. Select time: 13:00
  // 4. CONTINUE

  const [startDate, setStartDate] = useState(new Date())

  const [availableTimes, setAvailableTimes] = useState<JSX.Element>()

  const [formErrors, setFormErrors] = useState<FormikErrors<BookingForm>>({})

  const setAppointment = (date: Date, time: number) => {
    setFormErrors({})

    const startAppointment = moment(date)
      .set({
        hours: time, minute: 0, second: 0, millisecond: 0,
      })
      .toISOString()

    const endAppointment = moment(startAppointment)
      .add(values.scheduledTimeMinutes, 'm')
      .toISOString()

    setFieldValue('startAppointment', startAppointment)

    setFieldValue('endAppointment', endAppointment)
  }

  const createTimes = (date: Date) => {
    const content = (
      <>
        <p>
          <span className="free-times-font">
            Iltapäivä
          </span>
        </p>
        <ListGroup>
          {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((item) => (
            <ListGroup.Item
              key={item}
              action
              variant="dark"
              onClick={() => setAppointment(date, item)}
            >
              {item}
              :00
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>

    )

    setAvailableTimes(content)
  }

  const handleAppointment = (date: Date) => {
    setStartDate(date)
    createTimes(date)
  }

  const validate = () => {
    const errors: FormikErrors<BookingForm> = {}

    if (!values.endAppointment) {
      errors.endAppointment = 'Valitse päivämäärä ja kellonaika.'
    }

    // Validate form
    if (!isEmpty(errors)) {
      setFormErrors(errors)
    } else {
      setFormErrors({})
      setSelectedTab((selectedTab + 1) % tabCount)
    }
  }

  return (
    <Styles>
      <div className="header-container">
        <span className="header-font">Valitse ajankohta</span>
      </div>
      <div className="container">
        <div className="left-side">
          <p>
            <span className="free-dates-font">
              Vapaat ajat
            </span>
          </p>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => handleAppointment(date)}
            inline
          />
        </div>
        <div className="right-side">
          {availableTimes}
        </div>
      </div>

      <div className="bottom-container">
        <div style={{ flex: 2, textAlign: 'left' }}>
          {!isEmpty(formErrors)
        && (
        <h1 style={{ color: 'red' }}>
          {formErrors.startAppointment}
          {formErrors.endAppointment}
        </h1>
        )}
          {parseString(values.serviceType) && (
          <p>
            <p className="service-name-font">
              {values.serviceType}
              ,  
            </p>
          </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button
            onClick={() => setSelectedTab((selectedTab
                        + tabCount - 1)
                        % tabCount)}
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
                Seuraava
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
    </Styles>
  )
}

export default ChooseTime
