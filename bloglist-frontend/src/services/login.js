// eslint-disable-next-line no-undef
const axios = require('axios')
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }