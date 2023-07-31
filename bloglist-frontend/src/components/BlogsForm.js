import React from 'react'

const BlogsForm = ({handleNewBlog, newBlog, setNewBlog }) => {

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