import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

import {
  FormikErrors, Field,
} from 'formik'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { formatAppointmentDate, isEmpty, parseString } from '../../../../utils'
import { BookingForm, ITabWithoutSetFieldValue } from '../../../../types'
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
    font-weight: 700;
    font-size: 20px;
  }

  .free-times-font {
    font-family: 'AveniAvenirdr', sans-serif;
    font-weight: 700;
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

  .container {
    display: flex;
    flex-direction: row;
  }

  .left-side {
    flex: 2;
  }

  .right-side {
    flex: 1;
  }
  `

const ChooseExtraInfo: React.FC<ITabWithoutSetFieldValue> = ({
  values,
  setSelectedTab,
  selectedTab,
  tabCount,
}) => {
  const formatInformation = () => {
    const {
      startAppointment,
      endAppointment,
      serviceType,
      scheduledTimeMinutes,
    } = values

    const startDate = moment(startAppointment).format('DD.MM.YYYY')
    const startTime = moment(startAppointment).format('HH:mm')
    const endTime = moment(endAppointment).format('HH:mm')

    const minutes = `${scheduledTimeMinutes} min`

    return (
      <>
        <div style={{ marginBottom: '2rem' }}>
          <span className="avenir-font">
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
          </span>
        </div>

        <span className="avenir-font">
          <b>
            Syötä mahdolliset lisätiedot alle
          </b>
        </span>
      </>
    )
  }

  return (
    <Styles>
      <div className="header-container">
        <span className="header-font">Lisätiedot</span>
      </div>
      <span className="avenir-font">
        <b>
          Varauksesi tähän mennessä
        </b>
      </span>

      <div>
        {formatInformation()}
        <Field
          placeholder="Syötä tähän mahdolliset lisätiedot"
          component="textarea"
          rows="4"
          name="extraInfo"
          type="text"
          className="form-control"
        />
      </div>
      <div className="bottom-container">
        <div style={{ flex: 2, textAlign: 'left' }}>
          {parseString(values.serviceType)
          && parseString(values.startAppointment) && (
          <span className="service-name-font">
            <p>
              {formatAppointmentDate(values)}
            </p>
            <p>
              {values.serviceType}
              ,  
            </p>
          </span>
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
            onClick={() => setSelectedTab((selectedTab + 1) % tabCount)}
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

export default ChooseExtraInfo
