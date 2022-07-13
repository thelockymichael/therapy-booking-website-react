import React from 'react'

import styled from 'styled-components'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import colors from '../../colors'

const Styles = styled.div`
.wrapper {
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
}

.paragraph {
  width: 20rem;
}

.left-container {
  /* flex: 1.25; */
  width: 50%;
  background: ${colors.ashGray};
  /* width: 40rem;
  height: 40rem;
  background: ${colors.ashGray};

  @media (max-width: 768px) {
   display: none;
  } */
}

.left-card {
  /* width: 26rem; */
  /* height: 30rem; */
  /* left: 12rem; */
  /* transform: translate(50%,-50%); */
  /* top: 50%; */
  /* left: -5%; */
  /* top: 24%;
  left: 20%; */
  position: absolute;
  /* left: 25%; */
  left: calc((100% - 700px) * 0.5);
  margin-top: 3rem;

  /* transform: translate(145%, 0%); */
  background-color: ${colors.champagnePink};
  text-align: center;
  @media (max-width: 768px) {
    position: relative;
    background-color: ${colors.champagnePink};
    text-align: center;
    left: 0;
    margin-top: 0;
  }
}

.card-text-container {
  color: black;
  text-align: center;
  padding: 0 2rem 2rem 2rem;
}

.img-container {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.img {
  width: 16rem;
  border-radius: 50%;
}

.right-container {
  /* flex: 2; */
  /* width: 393px; */
  width: 50%;
  margin: 16rem 4rem 4rem 16rem;
  background: white;

  /*
  margin: 4rem 4rem 4rem 4rem;
  flex: 2; 
  */
  @media (max-width: 768px) {
    margin: 2rem 2rem 2rem 2rem;
  }
}

.right-container h2 {
  margin-bottom: 2rem;
}

.right-container button {
  border-radius: 2rem;
  margin-top: 2rem;
  background-color: ${colors.antiqueBrass};
  border-width: 0mm;
}

.booking-btn {
  color: white;
  :hover {
    background-color: #92593A
  }
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
/*  END  */
`

const EtusivuPage = () => (
  <Styles>
    <div className="wrapper">
      <div className="left-card">
        <div className="img-container">
          <Image className="img" alt="image goes here" />
        </div>
        <div className="card-text-container">
          <h1>
            <span className="poppins-font" />
          </h1>
          <h4>
            <span className="avenir-font">
              Ratkaisukeskeinen
            </span>
            <br />
            <span className="avenir-font">
              lyhytterapeutti
            </span>
          </h4>
        </div>
      </div>
      <div className="left-container" />
      <div className="right-container">
        <h2><span className="poppins-font">Terapeuttista tukea</span></h2>
        <span className="avenir-font">
          <p className="paragraph">
            Etäyhteyksellä sinulle sopivalla tavalla mm. puhelimitse,
            Skypen tai Zoomin kautta.
          </p>
          <p>
            Olet lämpimästi tervetullut.
          </p>
        </span>
        <Button className="booking-btn" variant="primary" size="lg">
          <Nav.Item>
            <Nav.Link
              style={{ color: 'white' }}
              href="/booking/terapiapalvelut"
            >
              <span className="avenir-font">
                Varaa aika
              </span>
            </Nav.Link>
          </Nav.Item>
        </Button>
      </div>
    </div>
  </Styles>
)

export default EtusivuPage
