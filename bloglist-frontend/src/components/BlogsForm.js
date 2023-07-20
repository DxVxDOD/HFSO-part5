import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogsForm = ({setBlogs, blogs, setErrorMessage}) => {

    const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: '',
      user: ''
    });

    const handleNewBlog = e => {
      e.preventDefault();

      try {
        const blogObject = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        }
        blogService.create(blogObject);
        setNewBlog({
          title: '',
          author: '',
          url: '',
        });
      } catch (exception) {
        setErrorMessage(exception)
      }
    }

  return (
    <form onSubmit={handleNewBlog} >
      <div>
        Author
        <input
        type='text'
        name='Author'
        value={newBlog.author}
        onChange={({target}) => setNewBlog({...newBlog, author: target.value})}
        />
      </div>
      <div>
        Title
        <input
        type='text'
        name='Title'
        value={newBlog.title}
        onChange={({target}) => setNewBlog({...newBlog, title: target.value})}
        />
      </div>
      <div>
        url:
        <input
        type='text'
        name='Url'
        value={newBlog.url}
        onChange={({target}) => setNewBlog({...newBlog, url: target.value})}
        />
      </div>
      <button>Add blog</button>
    </form>
  )
}

export default BlogsForm