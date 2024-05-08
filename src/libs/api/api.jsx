import { BASE_URL } from '../config/endpointApi'

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=a37241f847697db472f3c7f222a20931`
    )
    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error fetching data: ', error)
  }
}
