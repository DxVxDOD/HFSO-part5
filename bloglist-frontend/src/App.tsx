import { useState, useEffect, createContext } from 'react'
import blogService from './services/blog.ts'
import Notification from './components/Notifications.tsx'
import LoggedIn from './components/LoggedIn.tsx'
import NotLoggedIn from './components/NotLoggedIn.tsx'
import { BlogT } from './types/blog.ts'

export const userContext = createContext(null)

const App = () => {
  const [blogs, setBlogs] = useState<Array<BlogT>>([])
  const [message, setMessage] = useState<string | null>(null)
  const [user, setUser] = useState(null)
  const [messageType, setMessageType] = useState<string | null>(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggesUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggesUserJSON) {
      const user = JSON.parse(loggesUserJSON)
      console.log(user)
      setUser(user)
      console.log(user.token)
      blogService.setToken(user.token)
    }
  },[])

  return (
    <userContext.Provider value={user} >
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