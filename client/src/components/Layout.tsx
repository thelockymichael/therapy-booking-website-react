import * as React from 'react'

import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import colors from '../colors'

const Styles = styled.div`
  .container-style {
    display: flex;
    flex-flow: column;
    height: 100%;
    background-color: ${colors.champagnePink};
  }
  .content {
    flex: 1 1 auto;
  }
`

const Layout: React.FC = ({ children }) => (
  <Styles>
    <Container fluid className="container-style">
      <Container className="content">{children}</Container>
    </Container>
  </Styles>
)

export default Layout
