import * as React from 'react'
import {
  Spinner,
} from 'react-bootstrap'

export interface SpinnerProps {
  styles?: React.CSSProperties
}

const ActivityIndicator = (styles: SpinnerProps) => (
  <div style={{
    ...styles,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)

export default ActivityIndicator
