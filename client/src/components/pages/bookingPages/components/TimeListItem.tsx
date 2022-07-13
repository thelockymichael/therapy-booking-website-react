import React, { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

interface ITimeListItem {
  setAppointment: (date: Date, time: number) => void,
  date: Date,
  item: number
}

const TimeListItem: React.FC<ITimeListItem> = ({ setAppointment, date, item }) => {
  const [show, setShow] = useState<boolean>(false)

  return (
    <ListGroup>
      <ListGroup.Item
        key={item}
        action
        className={show ? 'active' : ''}
        onClick={() => {
          setShow(!show)
          setAppointment(date, item)
        }}
      >
        {item}
        :00
      </ListGroup.Item>
    </ListGroup>
  )
}

export default TimeListItem
