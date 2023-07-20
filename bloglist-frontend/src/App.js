import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import Blogs from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

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
      <Notification errorMessage={errorMessage} />
      {user === null ?
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} /> :
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
          <BlogsForm newBlog={newBlog} setNewBlog={setNewBlog} setErrorMessage={setErrorMessage}/>
          <button onClick={handleLogout} >Log out</button>
        </div>
      }
      <div>
        <button>show</button>
      </div>
    </div>
  )
}

export default App