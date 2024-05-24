import { AxiosResponse } from 'axios'
import { Film } from '../../interface'
import { MediaType } from '../../types/catalog.type'
import axiosServices from '../config/axios'
import { BASE_URL, NOW_PLAYING_URL, TRENDING_URL } from '../config/endpointApi'
import { formatResult } from '../utils/common'

export const fetchMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?language=en-US&page=1&api_key=a37241f847697db472f3c7f222a20931`
    )
    const data = await response.json()

    return data
  } catch (error) {
    return []
  }
}

export const getTrendings = async (mediaType: MediaType): Promise<Film[]> => {
  try {
    const { data } = await axiosServices.get<
      Film,
      AxiosResponse<{
        results: Film[]
      }>
    >(`${TRENDING_URL}/${mediaType}/week`)

    return data.results.map((val) => formatResult(mediaType, val))
  } catch (error) {
    return []
  }
}

export const inTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosServices.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(NOW_PLAYING_URL)

    return data.results.map((val) => formatResult('movie', val))
  } catch (error) {
    return []
  }
}
