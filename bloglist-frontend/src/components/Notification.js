import React from 'react'

const Notification = ({ message, messageType }) => {
  if(messageType === null) {
    return null
  } else if (messageType === 'success') {
    return (<div className={messageType} >{message}</div>)
  }
  return (
    <div className={messageType} >{message}</div>
  )
}

export default Notification