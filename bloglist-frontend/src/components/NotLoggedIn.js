import React from 'react'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import Blog from './Blog'

const NotLoggedIn = ({setMessage, setMessageType, setUser, blogs}) => {

  return (
    <>
        <Togglable buttonLabel='Login' >
            <LoginForm setMessage={setMessage} setMessageType={setMessageType}  setUser={setUser} />
        </Togglable>
        <ul>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog => <li key={blog.id} ><Blog blog={blog} /></li>)}
        </ul>
    </> 
  )
}

export default NotLoggedIn