import { useState, useEffect, createContext } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoggedIn from './components/LoggedIn'
import NotLoggedIn from './components/NotLoggedIn'

export const userContext = createContext(null);

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
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
    <userContext.Provider value={{user: user}} >
      <div>
        <h1>Blogs app</h1>
        <Notification message={message} messageType={messageType} />
        {user === null ? 
          <NotLoggedIn setMessage={setMessage} setUser={setUser} setMessageType={setMessageType} blogs={blogs} /> : 
          <LoggedIn user={user} blogs={blogs} setMessage={setMessage} setMessageType={setMessageType} setBlogs={setBlogs} />
        }
      </div>
    </userContext.Provider>
  )
}

export default App