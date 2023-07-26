import React, { useState } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({setMessage, setMessageType, setUser}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({
                username: username,
                passwordHash: password,
            })

            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setMessageType('error')
            setMessage(exception.response.data.error);
            setTimeout(() => {
                setMessage(null)
            }, 5000)
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
            onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
            Password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button type='submit' >Login</button>
    </form>
  )
}

export default LoginForm