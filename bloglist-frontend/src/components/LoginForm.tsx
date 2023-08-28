import React, { FormEvent, useState } from 'react'
import loginService from '../services/login.ts'
import blogService from '../services/blog.ts'
import { AxiosError } from 'axios'

const LoginForm = ({ setMessage, setMessageType, setUser }: 
  {
    setMessage: React.Dispatch<React.SetStateAction<string | null>>,
    setMessageType: React.Dispatch<React.SetStateAction<string | null>>,
    setUser: React.Dispatch<React.SetStateAction<null>>
  }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception: unknown) {
      if (exception instanceof AxiosError && exception.response) {
        setMessageType('error')
        setMessage(exception.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
  }

  return (
    <form onSubmit={handleLogin} >
      <div>
            Username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
            Password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' >Login</button>
    </form>
  )
}

export default LoginForm