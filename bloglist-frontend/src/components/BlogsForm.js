import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogsForm = ({setMessage, setMessageType}) => {

  const [newBlog, setNewBlog] = useState({
      title: '',
      author: '',
      url: '',
      user: ''
    });

    const handleNewBlog = async e => {
      e.preventDefault();

      try {
        const blogObject = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
        }
        const result = await blogService.create(blogObject);
        console.log(result.user);
        setMessageType('success')
        setMessage(`New blog: ${result.title} by ${result.author}`)
        setTimeout(() => {
          setMessageType(null)
        }, 5000)
        setNewBlog({
          title: '',
          author: '',
          url: '',
        });
      } catch (exception) {
        setMessageType('error');
        setMessage(exception.response.data.error);
        setTimeout(() => {
            setMessageType(null)
        }, 5000)
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
        Url:
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