import React, { useState } from 'react'
import styled from 'styled-components'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  Formik, FormikErrors,
} from 'formik'
import * as Yup from 'yup'
import ChooseService from './Tabs/ChooseService'
import ChooseTime from './Tabs/ChooseTime'
import ChooseExtraInfo from './Tabs/ChooseExtraInfo'
import InputContactDetails from './Tabs/InputContactDetails'
import BookingCompleted from './Tabs/BookingCompleted'

import Layout from '../../Layout'
import { BookingForm } from '../../../types'
import { inDevelopment } from '../../../utils'
import bookingService from '../../../services/bookings'

// const schema = Yup.object().shape({
//   serviceName: Yup.string().required('Service name is required'),
//   serviceType: Yup.string().required('Service type is required'),
// })

const Styles = styled.div`
  .container {
    margin-top: 4rem;
    margin-bottom: 8rem;
  }

  .paragraph {
    margin-top: 2rem;
  }

  .price-row {
    display: flex;
    width: 12rem;
    justify-content: space-between;
  }

  .main-content {
    text-align: center;
  }

  .contact-details {
    position: absolute;
    margin: 1.25rem;
    right: 0;
  }
`

const BookingPage = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const tabCount = 5

  // const [bookingForm, setBookingForm] = useState<BookingForm>({
  //   serviceName: '',
  //   serviceType: '',
  // })

  const bookingHolderValidation = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().optional(),
  })

  const schema = Yup.object().shape({
    serviceName: Yup.string().required(),
    serviceType: Yup.string().required(),
    scheduledTimeMinutes: Yup.number().required(),
    startAppointment: Yup.string().required(),
    endAppointment: Yup.string().required(),
    extraInfo: Yup.string().optional(),
    bookingHolder: bookingHolderValidation,
  })

  const initValues: BookingForm = {
    serviceName: '',
    serviceType: '',
    scheduledTimeMinutes: 0,
    startAppointment: '',
    endAppointment: '',
    extraInfo: '',
    bookingHolder: {
      email: '',
      phoneNum: '',
      firstName: '',
      lastName: '',
    },
  }

  // const handleSubmit = async (formValues: {
  //   serviceName: string,
  //   serviceType: string
  // }) => {
  //   // eslint-disable-next-line no-console
  //   console.log('formValues', formValues)
  // }

  const sendForm = async (formValues: BookingForm) => {
    console.log('formValues', formValues)

    try {
      const bookingData = await bookingService.createNew(formValues)

      // eslint-disable-next-line no-console
      console.log('bookingData', bookingData)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error.response', error.response)
    }
  }

  return (
    <Layout>
      <Styles>
        <Formik
          initialValues={initValues}
          validationSchema={schema}
          // validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            // sendForm(values)
            resetForm()
          }}
        >
          {({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            values, setFieldValue, handleChange, errors, touched, handleSubmit,
          }) => (
            <>
              <Tabs
                hidden
                defaultActiveKey={selectedTab.toString()}
                id="controlled-tab-example"
                activeKey={selectedTab}
                onSelect={(k: unknown) => setSelectedTab(k as number)}
                className="mb-3"
              >
                <Tab eventKey={0} title="Pavelun varaus">
                  <ChooseService
                    values={values}
                    setFieldValue={setFieldValue}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    tabCount={tabCount}
                  />
                </Tab>
                <Tab eventKey={1} title="Päivä ja aika">
                  <ChooseTime
                    values={values}
                    setFieldValue={setFieldValue}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    tabCount={tabCount}
                  />
                </Tab>
                <Tab eventKey={2} title="Lisätiedot">
                  <ChooseExtraInfo
                    values={values}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    tabCount={tabCount}
                  />
                </Tab>
                <Tab eventKey={3} title="Syötä yhteystiedot">
                  <InputContactDetails
                    errors={errors}
                    values={values}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    tabCount={tabCount}
                  />
                </Tab>
                <Tab eventKey={4} title="Kiitos varauksestasi">
                  <BookingCompleted
                    values={values}
                    setSelectedTab={setSelectedTab}
                    selectedTab={selectedTab}
                    tabCount={tabCount}
                    handleSubmit={handleSubmit}
                  />
                </Tab>
              </Tabs>
              {inDevelopment
              && (
              <Button
                variant="danger"
                onClick={() => {
                  // eslint-disable-next-line no-console
                  console.log(values)
                }}
              >
                Submit
              </Button>
              )}
            </>
          )}

        </Formik>
      </Styles>
    </Layout>
  )
}

export default BookingPage
