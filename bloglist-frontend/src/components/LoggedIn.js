import React from 'react'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'
import Blog from './Blog'

const LoggedIn = ({user, blogs, setBlogs, setMessageType, setMessage}) => {

    const handleLogout = (e) => {
        window.localStorage.clear()
        window.location.reload()
      }

  return (
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
            <BlogsForm setMessageType={setMessageType} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
        </Togglable>
        <button onClick={handleLogout} >Log out</button>
    </div>
  )
}

export default LoggedIn