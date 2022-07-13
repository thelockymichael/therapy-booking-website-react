import * as React from 'react'

import styled from 'styled-components'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Layout from '../Layout'
import colors from '../../colors'

const HinnastoPage = () => {
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

    .booking-btn {
      border-radius: 2rem;
      border: solid black;
      background-color: ${colors.champagnePink};
      :hover {
        background-color: ${colors.antiqueBrass};
        border: solid black;
      }
    }

    .booking-btn .nav-link {
      color: black;
      :hover {
        color: white;
      }
    }

    .bottom-container {
      display: flex;
      flex-direction: row;
    }
  `

  return (
    <Layout>
      <Styles>
        <div className="container">
          <h2>
            <span className="poppins-font">
              Hinnasto
            </span>
          </h2>
          <span className="avenir-font">
            <p className="paragraph">
              <b>
                Lyhytterapia ei kuulu Kelan korvaamiin hoitomuotoihin.
                Noin tunnin etävastaanotto tutustumistarjoituksena veloituksetta.
                Et tarvitse lähetettä terapiaan.
              </b>
            </p>
            <p className="paragraph">
              <b>
                Etävastaanotto (terapeutin soittamat videopuhelut ja puhelut)
              </b>
            </p>
            <div>
              <div className="price-row">
                <p>60 – 90 min</p>
                <p>65 e</p>
              </div>
              <div>
                <p>3 x etävastaanotto = 150 e (säästät 45 e)</p>
              </div>
            </div>
            <p className="paragraph">
              (Hinnat sisältävät alv:n 24%).
              Olen kevytyrittäjä ja laskutan terapiakerrat
              {' '}
              <b>
                <span style={{ textDecoration: 'underline' }}>
                  <a
                    style={{
                      color: 'black',
                      textDecoration: 'none',
                    }}
                    href="https://www.ukko.fi/"
                  >
                    Ukko.fi

                  </a>

                </span>
                -laskutuspalvelun
              </b>
              {' '}
              kautta.
            </p>
            <p className="paragraph">
              <b>
                Lasku toimitetaan
              </b>
              {' '}
              sinulle jokaisen käynnin
              jälkeen sähköpostilla.
            </p>
            <p className="paragraph">
              Ajan
              {' '}
              <b>peruuttamisesta</b>
              {' '}
              tulee
              ilmoittaa klo 20.00 mennessä
              edellisenä päivänä. Peruuttamattomasta
              ajasta veloitetaan hinnaston mukainen maksu.
            </p>
          </span>
          <div className="bottom-container">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image alt="ukko-logo" />
            </div>
            <div
              style={{
                marginLeft: '4rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                className="booking-btn"
                variant="primary"
                size="lg"
              >
                <Nav.Link
                  href="/asiakasrekisteri-ja-tietosuojaseloste"
                >
                  <span className="avenir-font">
                    Asiakasrekisteri- ja tietosuojaseloste
                  </span>
                </Nav.Link>
              </Button>
            </div>

          </div>
        </div>
      </Styles>
    </Layout>
  )
}

export default HinnastoPage
