import { useContext, useState } from 'react'
import { userContext } from '../App.tsx'
import { BlogT } from '../types/blog.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Blog = ({ blog, updateLikes, removeBlog, veiw }: 
  {
    blog: BlogT,
    updateLikes?: () => Promise<void>,
    removeBlog?: () => Promise<void>,
    veiw?: jest.Mock
  }) => {

  const user = useContext(userContext)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)
  const toggleVisibility = () => setVisibility(!visibility)

  return (
    <div className='blog' >
      {visibility ?
        <div style={blogStyle} >
          {user === null ?
            <>
              <p>{blog.title} {blog.author}</p>
              <a href={blog.url}>{blog.url}</a>
              <p>{blog.likes}</p>
              <p>{blog.user!.name}</p>
              <button onClick={toggleVisibility} >hide</button>
            </> :
            <>
              <p>{blog.title} {blog.author}</p>
              <a href={blog.url}>{blog.url}</a>
              <p>{blog.likes}<button onClick={updateLikes} >like</button></p>
              <p>{blog.user!.name}</p>
              <button onClick={removeBlog} >reomve</button>
              <button onClick={toggleVisibility} >hide</button>
            </>
          }
        </div> :
        <div style={blogStyle} >
          {blog.title} {blog.author}
          <button onClick={toggleVisibility} >view</button>
          {`${veiw}`}
        </div>}
    </div>
  )
}

export default Blog