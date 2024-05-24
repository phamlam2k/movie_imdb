export const BASE_URL = 'https://api.themoviedb.org/3'
import axios, { Axios, AxiosResponse } from 'axios'
import { MediaType } from '../../types/catalog.type'
import { Film } from '../../interface'
import { error } from 'console'
import { formatResult } from '../utils/common'



const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_TMDB_API_URL
})

axiosClient.interceptors.request.use((config) => {
    return {
        ...config,
        params: {
            API_KEY: process.env.REACT_APP_TMDB_API_KEY
        }
    }
})

export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
    try {
        const { data } = await axiosClient.get<
            any, AxiosResponse<{
                result: any[]

            }>>(`/trending/${mediaType}/week`)

        return data.result.map((val) => (
            formatResult(mediaType, val)

        ))
    } catch (error) {
        console.log(error)

    }
    return []

}


export const inTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosClient.get<
      any,
      AxiosResponse<{
        result: unknown[]
      }>
    >(`/movie/now_playing`)

    return data.result.map((val) => formatResult('movie', val))
  } catch (error) {
    console.log(error)
  }
  return []
}