import PropTypes from 'prop-types'
import { FormEvent } from 'react'
import { BlogT } from '../types/blog.ts'

const BlogsForm = ({ handleNewBlog, newBlog, setNewBlog }: 
  {
    handleNewBlog: (e: FormEvent) => Promise<void>,
    newBlog: BlogT,
    setNewBlog: React.Dispatch<React.SetStateAction<BlogT>>
  }) => {

  return (
    <form onSubmit={handleNewBlog} >
      <div>
        Author
        <input
          type='text'
          name='Author'
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        Title
        <input
          type='text'
          name='Title'
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div>
        Url:
        <input
          type='text'
          name='Url'
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <button>Add blog</button>
    </form>
  )
}

export default BlogsForm

BlogsForm.propType ={
  handleNewBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.object.isRequired,
  setNewBlog: PropTypes.func.isRequired
}