import { useState } from "react"

const Blog = ({blog, updateLikes, removeblog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [visibility, setVisibility] = useState(false);
  const toggleVisibility = () => setVisibility(!visibility)

  return (
    <>
    {visibility ? 
      <div style={blogStyle} >
        <p>{blog.title} {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}<button onClick={updateLikes} >like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={removeblog} >reomve</button>
        <button onClick={toggleVisibility} >hide</button>
      </div> : 
      <div style={blogStyle} >
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} >view</button>
      </div>}
    </>
)
}

export default Blog