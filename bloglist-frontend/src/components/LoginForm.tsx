import React, { useRef, useState } from 'react'
import BlogsForm from './BlogsForm.js'
import Togglable from './Togglable.js'
import Blog from './Blog.js'
import blogService from '../services/blogs.js'

const LoggedIn = ({ user, blogs, setBlogs, setMessageType, setMessage }) => {

  const blogFormRef = useRef()

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    user: ''
  })

  const handleNewBlog = async e => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()

    try {
      const blogObject = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }
      const response = await blogService.create(blogObject)
      const result = await blogService.getAll()
      setBlogs(result)
      setMessageType('success')
      setMessage(`New blog: ${response.title} by ${response.author}`)
      setTimeout(() => {
        setMessageType(null)
      }, 5000)
      setNewBlog({
        title: '',
        author: '',
        url: '',
      })
    } catch (exception) {
      setMessageType('error')
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessageType(null)
      }, 5000)
    }
  }

  const updateLikes = async id => {
    const blog = blogs.find(blog => blog.id === id)
    const chnagedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedNote = await blogService.update(id, chnagedBlog)
      await blogService.getAll().then(blogs => setBlogs( blogs ))
      setMessageType('success')
      setMessage(`${returnedNote.title} has been updated`)
      setTimeout(() => {
        setMessageType(null)
      }, 5000)
    }catch (exception) {
      setMessageType('error')
      setMessage(exception.response.data.error)
      setTimeout(() => {
        setMessageType(null)
      }, 5000)
    }

  }

  const removeblog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)

    if (window.confirm(`Would you like to remove ${blog.title} ?`)) {
      try {
        await blogService.remove(id)
        await blogService.getAll().then(blogs => setBlogs( blogs ))
        setMessageType('success')
        setMessage(`${blog.title} has been removed`)
        setTimeout(() => {
          setMessageType(null)
        }, 5000)
      }catch (exception) {
        setMessageType('error')
        setMessage(exception.response.data.error)
        setTimeout(() => {
          setMessageType(null)
        }, 5000)
      }
    }

  }

  return (
    <div>
      <p>{user.name} is logged in</p>
      <ul>
        {blogs.filter(blog => blog.user)
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            if (blog.user.username === user.username) {
              return (
                <li key={blog.id} >
                  <Blog blog={blog} updateLikes={() => updateLikes(blog.id)} removeblog={() => removeblog(blog.id)} />
                </li>
              )
            } else return (<>You have not posted any blogs yet !</>)
          })}
      </ul>
      <Togglable buttonLabel='New blog' ref={blogFormRef} >
        <BlogsForm handleNewBlog={handleNewBlog} newBlog={newBlog} setNewBlog={setNewBlog} />
      </Togglable>
      <button onClick={handleLogout} >Log out</button>
    </div>
  )
}

export default LoggedIn