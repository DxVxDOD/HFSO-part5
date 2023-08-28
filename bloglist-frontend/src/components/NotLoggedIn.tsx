import Togglable from './Togglable.js'
import LoginForm from './LoginForm.js'
import Blog from './Blogs.js'
import { BlogT } from '../types/blog.js'

const NotLoggedIn = ({ setMessage, setMessageType, setUser, blogs }: 
  {
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
    setMessageType: React.Dispatch<React.SetStateAction<string | null>>,
    setUser:React.Dispatch<React.SetStateAction<null>>,
    blogs: BlogT[]
  }) => {

  return (
    <>
      <Togglable buttonLabel='Login' >
        <LoginForm setMessage={setMessage} setMessageType={setMessageType}  setUser={setUser} />
      </Togglable>
      <ul>
        {blogs.sort((a, b) => b.likes! - a.likes!).map(blog => <li key={blog.id} ><Blog blog={blog} /></li>)}
      </ul>
    </>
  )
}

export default NotLoggedIn