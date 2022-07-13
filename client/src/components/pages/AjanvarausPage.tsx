import * as React from 'react'
import styled from 'styled-components'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik'
import * as Yup from 'yup'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Layout from '../Layout'
import { IContactForm } from '../../types'
import contactService from '../../services/contact'

const AjanvarausPage = () => {
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

  /* Font styling */
  .poppins-font {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .avenir-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 17px;
  }
  /*  END  */

  .form-container {
    background-color: white;
    padding: 2rem;
  }
`

  const schema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phone: Yup.string().optional(),
    subject: Yup.string().required(),
    content: Yup.string().required(),
  })

  const sendForm = async (formValues: IContactForm) => {
    // eslint-disable-next-line no-console
    console.log('formValues', formValues)

    try {
      const contactData = await contactService.sendContactForm(formValues)

      // eslint-disable-next-line no-console
      console.log('contactData', contactData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error.response', error.response)
    }
  }

  return (
    <Layout>
      <Styles>
        <div className="container">
          <h2>
            <span className="poppins-font">
              Ajanvaraus
            </span>
          </h2>
          <span className="avenir-font">
            <p className="paragraph">
              <b>
                Lähivastaanotolla etusijalla ovat maskit,
                hyvä käsihygienia sekä riittävä etäisyys.
                Tulethan terveenä ja oireettomana.
              </b>
            </p>
            <p className="paragraph">
              <b>
                Ota yhteyttä
              </b>
              sähköpostitse, soittamalla,
              WhatsAppilla tai oheisella yhteydenottolomakkeella.
              Kerro varatessasi nimesi ja toivomuksesi
              ajankohdasta. Ajat ovat päivä- ja ilta-aikoja
              sekä satunnaisesti viikonloppuisin.
            </p>
            <p className="paragraph">
              Etävastaanotot toimivat puhelimitse tai
              videovälitteisesti Zoomilla. Puhelinajalla terapeutti
              soittaa sinulle ja videoajalla saat sähköpostiisi
              suoran linkin, jolla pääset ilman kirjautumista
            </p>
          </span>
          {/* TODO Contact Form */}
          <div className="form-container">
            <div style={{ marginBottom: '3rem' }}>
              <h3>
                <span className="poppins-font">
                  Ota yhteyttä
                </span>
              </h3>
            </div>

            <Formik
              validationSchema={schema}
              onSubmit={(values, { resetForm }) => {
                sendForm(values)
                resetForm()
              }}
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                subject: '',
                content: '',
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Etunimi (*)"
                      >
                        <Form.Control
                          placeholder="Etunimi"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          isInvalid={!!errors.firstName && touched.firstName}
                          // isInvalid={!!errors.firstName}
                          isValid={touched.firstName && !errors.firstName}
                        />
                        {errors.firstName
                          ? (
                            <Form.Control.Feedback type="invalid">
                              Etunimi puuttuu
                            </Form.Control.Feedback>
                          )
                          : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridLastName">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sukunimi (*)"
                      >
                        <Form.Control
                          placeholder="Sukunimi"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          isInvalid={!!errors.lastName && touched.lastName}
                          // isInvalid={!!errors.lastName}
                          isValid={touched.lastName && !errors.lastName}
                        />
                        {errors.lastName
                          ? (
                            <Form.Control.Feedback type="invalid">
                              Sukunimi puuttuu
                            </Form.Control.Feedback>
                          )
                          : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sähköpostiosoite (*)"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Sähköpostiosoite"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email && touched.email}
                          // isInvalid={!!errors.email}
                          isValid={touched.email && !errors.email}
                        />
                        {errors.email
                          ? (
                            <Form.Control.Feedback type="invalid">
                              S-posti puuttuu
                            </Form.Control.Feedback>
                          )
                          : null}
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPhone">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Puhelin"
                      >
                        <Form.Control
                          placeholder="Puhelin"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          isInvalid={!!errors.phone && touched.phone}
                          isValid={touched.phone && !errors.phone}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridSubject">
                      {/* <Form.Label>Aihe (*)</Form.Label> */}
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Otsikko (*)"
                        className="mb-3"
                      >
                        <Form.Control
                          placeholder="Otsikko"
                          name="subject"
                          value={values.subject}
                          onChange={handleChange}
                          isInvalid={!!errors.subject && touched.subject}
                          // isInvalid={!!errors.subject}
                          isValid={touched.subject && !errors.subject}
                        />
                        {errors.subject
                          ? (
                            <Form.Control.Feedback type="invalid">
                              Lomakkeen otsikko puuttuu
                            </Form.Control.Feedback>
                          )
                          : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridContent">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Sisältö (*)"
                      >
                        <Form.Control
                          style={{ height: '100px', resize: 'none' }}
                          as="textarea"
                          placeholder="Sisältö"
                          name="content"
                          value={values.content}
                          onChange={handleChange}
                          isInvalid={!!errors.content && touched.content}
                          // isInvalid={!!errors.content}
                          isValid={touched.content && !errors.content}
                        />
                        {errors.content
                          ? (
                            <Form.Control.Feedback type="invalid">
                              Lomakkeen sisältö puuttuu
                            </Form.Control.Feedback>
                          )
                          : null}
                      </FloatingLabel>
                    </Form.Group>
                  </Row>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button style={{ width: '14rem', height: '3rem' }} type="submit">Lähetä</Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Styles>
    </Layout>
  )
}

export default AjanvarausPage
