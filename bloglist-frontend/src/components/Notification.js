import React from 'react'

const Notification = ([errorMessage]) => {
    if(errorMessage === null) {
        return null
    }
  return (
    <div>{errorMessage}</div>
  )
}

export default Notification