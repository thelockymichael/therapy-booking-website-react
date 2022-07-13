import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  FormikErrors,
} from 'formik'
import moment from 'moment'
import { inDevelopment, isEmpty } from '../../../../utils'
import { BookingForm, ITabWithHandleSubmit, ITabWithoutSetFieldValue } from '../../../../types'
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

  .info-container {
    background-color: ${colors.desertSand};
    padding: .75rem;
  }
  
  .rest-container {
    padding-top: 1.25rem;
  }

  .bottom-contact-details {
    padding-top: 1.25rem;
    padding-bottom: 3rem;
  }

  /* Bottom Container */
  .bottom-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .new-booking {
    background-color: ${colors.antiqueBrass};
    border: 0;

    :hover {
      background-color: #92593A
    }
  }

  `

const BookingCompleted: React.FC<ITabWithHandleSubmit> = ({
  values,
  setSelectedTab,
  selectedTab,
  handleSubmit,
  tabCount,
}) => {
  const startCreatingNewBooking = async () => {
    handleSubmit()
    setSelectedTab((selectedTab + 1) % tabCount)
  }

  const formattedInformation = () => {
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
      <div>
        <div className="info-container">
          <span className="avenir-font">

            <h4>Varaus</h4>
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
            <p />
          </span>
        </div>
        <div className="rest-container">
          <p>
            <span className="avenir-font">
              Voit muuttaa varaustasi sähköpostiisi tulleen
              varausvahvistuksen linkin avulla.
            </span>
          </p>
        </div>
        <div className="bottom-contact-details">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          >
            <FontAwesomeIcon icon={faPhone as IconProp} />
            <div style={{ marginLeft: '1rem' }}>
              <p>
                e.g. phone num 341541251
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
                  (email goes here)
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const addToCalendar = () => {
    // eslint-disable-next-line no-console
    console.log('Add to calendar')
  }

  return (
    <Styles>
      <div className="header-container">
        <span className="header-font">
          Kiitos varauksestasi
        </span>
      </div>
      {formattedInformation()}
      <div className="bottom-container">

        {inDevelopment
      && (
      <Button
        onClick={addToCalendar}
        style={{ backgroundColor: colors.artichoke }}
        size="lg"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
        }}
        >
          <FontAwesomeIcon icon={faCalendar as IconProp} />
          <div style={{ marginLeft: '1rem' }}>
            Lisää kalenteriisi
          </div>

        </div>
      </Button>
      )}
        <div>
          <Button
            onClick={startCreatingNewBooking}
            // style={{ backgroundColor: colors.antiqueBrass }}
            className="new-booking"
            size="lg"
          >
            Uusi varaus
          </Button>
        </div>
      </div>
    </Styles>
  )
}

export default BookingCompleted
