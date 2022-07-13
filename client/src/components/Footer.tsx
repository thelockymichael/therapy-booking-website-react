import * as React from 'react'

import styled from 'styled-components'

const Styles = styled.div`
  .footer-container {
    bottom: 0;
    left: 0;
    height: 16rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .footer-row {
    display: flex;
  }

  .footer-phone {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .footer-email {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
  }

  .email-bold {
    margin-bottom: 2rem;
  }

  .phone-bold {
    margin-bottom: 2rem;
  }
`

const Footer = () => (
  <Styles>
    <div className="footer-container">
      <div className="footer-row">
        <div className="footer-phone">
          <div className="phone-bold">
            <p>
              <b>Puhelin </b>
            </p>
          </div>
          <div className="phone-text">
            <p>(e.g. phone num 341541251) (phone num goes here)</p>
          </div>
        </div>
        <div className="footer-email">
          <div className="email-bold">
            <p>
              <b>Sähköposti</b>
            </p>
          </div>

          <div className="email-text">
            <p>(email goes here)</p>
          </div>
        </div>
      </div>
    </div>
  </Styles>
)

export default Footer
