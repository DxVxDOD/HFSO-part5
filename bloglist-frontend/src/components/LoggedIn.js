import React from 'react'
import BlogsForm from './BlogsForm'
import Togglable from './Togglable'
import Blog from './Blog'
import blogService from '../services/blogs';

const LoggedIn = ({user, blogs, setBlogs, setMessageType, setMessage}) => {

  const handleLogout = () => {
        window.localStorage.clear()
        window.location.reload()
    }

  const updateLikes = async id => {
    const blog = blogs.find(blog => blog.id === id);
    const chnagedBlog = {...blog, likes: blog.likes + 1};

    try {
      const returnedNote = await blogService.update(id, chnagedBlog);
      await blogService.getAll().then(blogs => setBlogs( blogs ))
      setMessageType('success')
      setMessage(`${returnedNote.title} has been updated`);
      setTimeout(() => {
        setMessageType(null)
      }, 5000)
    }catch (exception) {
      setMessageType('error');
        setMessage(exception.response.data.error);
        setTimeout(() => {
            setMessageType(null)
        }, 5000)
    }

  }

  return (
    <div>
        <p>{user.name} is logged in</p>
        <ul>
            {blogs.filter(blog => blog.user).map((blog) => {
              if (blog.user.username === user.username) {
                return (
                  <li key={blog.id} >
                    <Blog blog={blog} updateLikes={() => updateLikes(blog.id)} />
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