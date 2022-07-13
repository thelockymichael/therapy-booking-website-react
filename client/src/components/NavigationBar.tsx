/* eslint-disable react/prop-types */
import './NavigationBar.css'
import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import styled from 'styled-components'
import { RouteComponentProps, StaticContext } from 'react-router'
import Hamburger from 'hamburger-react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faHamburger,
// } from '@fortawesome/free-solid-svg-icons'
// import {
//   faTogg,
// } from '@fortawesome/free-regular-svg-icons'
// import { IconProp, fa} from '@fortawesome/fontawesome-svg-core'

const NameAndTitleContainer = styled.div`
  .navbar-brand {
     font-size: 2em;

     &:nth-child(2) {
       font-size: 1em;
    }
  }

  display: flex;
  flex-direction: column;
  margin: 2rem 0rem 2rem 2rem;

  .title-font {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 36px;

    @media all and (max-width: 768px) {
      /* put your css styles in here */
      font-size: .8em;
    }
  }

  .title-bottom-font {
    font-family: 'Avenir', sans-serif;
    font-weight: 300;
    font-size: 20px;

    @media all and (max-width: 768px) {
      /* put your css styles in here */
      font-size: .8em;
    }
  }
`

const NavSpan = styled.span`
  font-family: 'Avenir', sans-serif;
  font-weight: 400;
`

const NavBar: React.ComponentType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RouteComponentProps<any, StaticContext, unknown>
> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { location } = props

  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="color-nav"
    >
      <NameAndTitleContainer>
        <Navbar.Brand href="/">
          <span className="title-font" />
        </Navbar.Brand>
        <Navbar.Brand>
          <span className="title-bottom-font">
            Ratkaisukeskeinen lyhytterapeutti
          </span>
        </Navbar.Brand>
      </NameAndTitleContainer>
      <div style={{ paddingRight: '1.25rem' }}>
        <Navbar.Toggle
          style={{
            border: 0,
            color: 'black',
          }}
          aria-controls="responsive-navbar-nav"
        >
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </Navbar.Toggle>
      </div>

      <Navbar.Collapse
        style={{
          padding: '1rem',
        }}
        id="responsive-navbar-nav"
      >

        <Nav
          activeKey={location.pathname}
          className="ms-auto"
        >
          <Nav.Item>
            <Nav.Link href="/">
              <NavSpan>
                Etusivu
              </NavSpan>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/lyhytterapia">
              <NavSpan>
                Lyhytterapia
              </NavSpan>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/kuka-olen">
              <NavSpan>
                Kuka olen
              </NavSpan>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/hinnasto">
              <NavSpan>
                Hinnasto
              </NavSpan>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/ajanvaraus">
              <NavSpan>
                Ajanvaraus
              </NavSpan>
            </Nav.Link>
          </Nav.Item>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
