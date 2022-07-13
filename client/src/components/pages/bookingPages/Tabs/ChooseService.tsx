import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import {
  FormikErrors,
} from 'formik'
import { Card, useAccordionButton } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import colors from '../../../../colors'

import { isEmpty, parseString } from '../../../../utils'
import { BookingForm, ITab } from '../../../../types'

const Styles = styled.div`
  width: 100%;
  margin: 0 auto;
  .container {
    margin-top: 5rem;
    margin-bottom: 8rem;
  }

  .header-container {
    margin-top: 5rem;
    margin-bottom: 4rem;
  }
 
  .sub-option-container {
    background-color: white;
    color: black;
    
    :hover {
      background-color: #DCDCDC;
      color: black;
    }
  }

  .sub-option-container.active {
    background-color: ${colors.antiqueBrass};
    color: #f5f5f5;
  }

  .accordion-item {
    background-color: white;
    border: 0;
  }

  .sub-option-container {
    padding: 1rem 3rem;
  }

  .custom-accordion {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;
  }

  .custom-accordion-btn {
    width: 100%;
    height: 100%;
    padding: .75rem 0rem .75rem 1.25rem;
    background-color: white;
    border: 0;
  }

  .card-header {
    padding: 0;
  }

  /* Font styling */
  .poppins-font {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
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

  .service-name-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 400;
    font-size: 20px;
  }

  .avenir-font {
    font-family: 'Poppins', sans-serif;
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
    margin-top: 20rem; 
    margin-bottom: 2.5rem;
  }

  .next-btn {
    display: flex;
    border: 0;
    align-items: center;
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
`
interface ICustomToggle {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
  children: React.ReactNode;
  eventKey: string;
}
// eslint-disable-next-line react/prop-types
const CustomToggle: React.FC<ICustomToggle> = ({
  setShow, show, children, eventKey,
}) => {
  // const [show, setShow] = useState<boolean>(false)

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    console.log('totaly custom!')
    setShow(!show)
  })

  return (
    <button
      type="button"
      onClick={decoratedOnClick}
      className="custom-accordion-btn"
    >
      <div
        className="custom-accordion"
      >
        {children}
      </div>
    </button>
  )
}

const ChooseService: React.FC<ITab> = ({
  values,
  setFieldValue,
  setSelectedTab,
  selectedTab,
  tabCount,
}) => {
  const [formErrors, setFormErrors] = useState<FormikErrors<BookingForm>>({})
  const [show, setShow] = useState<boolean>(false)

  const serviceNameField = 'serviceName'
  const serviceTypeField = 'serviceType'
  const scheduledTimeMinutesField = 'scheduledTimeMinutes'

  const options = [{
    mainOption: 'Ratkaisukeskeinen lyhytterapia',
    subOptions: [
      {
        name: 'Etävastaanotto, 60 min',
        scheduledTimeMinutes: 60,
      },
    ],
  }]

  const onChange = (option: string, subOption: {
    name: string,
    scheduledTimeMinutes: number
  }) => {
    setFormErrors({})

    setFieldValue(serviceNameField, option)
    setFieldValue(serviceTypeField, subOption.name)
    setFieldValue(scheduledTimeMinutesField, subOption.scheduledTimeMinutes)
  }

  const validate = () => {
    const requiredError = 'Et ole valinnut haluamaasi palvelua.'

    const errors: FormikErrors<BookingForm> = {}

    if (!values.serviceName) {
      errors.serviceName = requiredError
    }
    if (!values.serviceType) {
      errors.serviceType = requiredError
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
        <span className="header-font">
          Valitse palvelu
        </span>
      </div>
      {options.map((option) => (
        <Accordion key={option.mainOption} defaultActiveKey="0">
          <Card>
            <Card.Header>
              <CustomToggle
                setShow={setShow}
                show={show}
                eventKey="0"
              >
                <div style={{ flex: 2, textAlign: 'left' }}>
                  <span className="accordion-main-option-font">
                    Ratkaisukeskeinen lyhytterapia
                  </span>
                </div>
                <div style={{
                  flex: 1,
                  textAlign: 'end',
                  marginRight: '2rem',
                }}
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={!show ? faCaretDown as IconProp : faCaretUp as IconProp}
                  />
                </div>
              </CustomToggle>
              {/* <span className="accordion-header">
                Ratkaisukeskeinen lyhytterapia
              </span> */}
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <ListGroup variant="flush">
                {option.subOptions.map((subOption) => (
                  <ListGroup.Item
                    className="sub-option-container"
                    key={subOption.name}
                    action
                    eventKey={subOption.name}
                    onClick={() => onChange(
                      option.mainOption,
                      subOption,
                    )}
                  >
                    <span className="accordion-sub-option-font">
                      Etävastaanotto, 60 min
                    </span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {/* <Card.Body>Hello! I'm the body</Card.Body> */}
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
      <div className="bottom-container">
        <div style={{ flex: 2, textAlign: 'left' }}>
          {!isEmpty(formErrors)
        && (
        <h1 style={{ color: 'red' }}>
          {formErrors.serviceName}
        </h1>
        )}
          {parseString(values.serviceType) && (
          <p className="service-name-font">
            {values.serviceType}
            ,  
          </p>
          )}
        </div>
        <div>
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

export default ChooseService
