import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState('');

  useEffect(() => {
    blogService.getAll().then(blogs =>  
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification errorMessage={errorMessage} />
      {user === null ?
        <LoginForm setErrorMessage={setErrorMessage} setUser={setUser} /> :
        <div>
          <p>{user.name} is logged in</p>
          <BlogsForm newBlog={newBlog} setNewBlog={setNewBlog} />
        </div>
      }
      <div>
        <button>show</button>
      </div>
    </div>
  )
}

export default App