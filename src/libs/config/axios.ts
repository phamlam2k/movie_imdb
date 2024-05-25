import axios from 'axios'

const axiosServices = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_URL
})

axiosServices.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: process.env.REACT_APP_TMDB_API_KEY
    }
  }
})

// interceptor for http
axiosServices.interceptors.request.use(
  (response) => {
    return response
  },
  (error) =>
    Promise.reject((error.response && error.response.data) || 'Wrong Services')
)

axiosServices.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosServices
