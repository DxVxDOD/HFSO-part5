import axios from 'axios'
const baseUrl = '/api/blog'

let token = null;

const setToken = newToken => token = `Bearer ${newToken}`;

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: {Authorization: token}
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }