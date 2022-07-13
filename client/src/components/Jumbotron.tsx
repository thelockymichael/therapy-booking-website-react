import * as React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
  .jumbotron {
    background-size: cover;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
    border-radius: 0.3rem;
    height: 200px;
    color: #ccc;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`

const Jumbotron = () => (
  <Styles>
    <Container fluid className="jumbotron">
      <div className="overlay" />
      <Container>
        <h1>Welcome </h1>
        <p>Learn to code from my YouTube videos</p>
      </Container>
    </Container>
  </Styles>
)

export default Jumbotron
