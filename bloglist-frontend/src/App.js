import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleLogout = (e) => {
    window.localStorage.clear()
    window.location.reload()
  }

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
        <>
        <Togglable buttonLabel='Login' >
          <LoginForm setMessage={setMessage} setMessageType={setMessageType}  setUser={setUser} />
        </Togglable>
          <ul>
            {blogs.map(blog => <li key={blog.id} ><Blog blog={blog} /></li>)}
          </ul>
        </> :
        <div>
          <p>{user.name} is logged in</p>
          <ul>
            {blogs.filter(blog => blog.user).map((blog) => {
              if (blog.user.username === user.username) {
                return (
                  <li key={blog.id} >
                    <Blog blog={blog} />
                  </li>
                )
              } else return (<>You have not posted any blogs yet !</>)
            })}
          </ul>
          <Togglable buttonLabel='New blog' >
            <BlogsForm setMessageType={setMessageType} setMessage={setMessage}/>
          </Togglable>
          <button onClick={handleLogout} >Log out</button>
        </div>
      }
    </div>
  )
}

export default App