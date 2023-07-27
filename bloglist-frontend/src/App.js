import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LoggedIn from './components/LoggedIn'
import Togglable from './components/Togglable'
import NotLoggedIn from './components/NotLoggedIn'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>  
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggesUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if(loggesUserJSON) {
      const user = JSON.parse(loggesUserJSON);
      setUser(user);
      blogService.setToken(user.token)
    }
  },[])

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={message} messageType={messageType} />
      {user === null ? 
        <NotLoggedIn setMessage={setMessage} setUser={setUser} setMessageType={setMessageType} blogs={blogs} /> : 
        <LoggedIn user={user} blogs={blogs} setMessage={setMessage} setMessageType={setMessageType} />
      }
    </div>
  )
}

export default App