const Notification = ({ message, messageType }: {message: string, messageType: null | string}) => {
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