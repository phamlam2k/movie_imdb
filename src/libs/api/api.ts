import { AxiosResponse } from 'axios'
import { Film } from '../../interface'
import { MediaType } from '../../types/catalog.type'
import axiosServices from '../config/axios'
import { BASE_URL, NOW_PLAYING_URL, TRENDING_URL , POPULAR , TOP_RATED } from '../config/endpointApi'
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

    return data.results.map((val) => formatResult(val ,mediaType))
  } catch (error) {
    return []
  }
}

export const getinTheaters = async (): Promise<Film[]> => {
  try {
    const { data } = await axiosServices.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(NOW_PLAYING_URL)

    return data.results.map((val) => formatResult(val, 'movie'))
  } catch (error) {
    return []
  }
}


export const getPopulars = async (
  mediaType: MediaType,
  page = 1
): Promise<Film[]> => {
  try {
    const { data } = await axiosServices.get<
      any,
      AxiosResponse<{
        results: unknown[]
      }>
    >(`/${mediaType}/${POPULAR}`, {
      params: {
        page,
      }
    })

    return data.results.map((val) => formatResult(val ,mediaType))
  } catch (error) {
       return []
  }
}

export const getTopRated = async (
  mediaType: MediaType,
  page = 1
): Promise<{
  films: Film[]
  totalPages: number
}> => {
  try {
    const { data } = await axiosServices.get<
      any,
      AxiosResponse<{
        results: unknown[]
        total_pages: number
      }>
    >(`/${mediaType}/${TOP_RATED}`, {
      params: {
        page
      }
    })

    return {
      films: data.results.map((val) => formatResult(val ,mediaType )),
      totalPages: data.total_pages
    }
  } catch (error) {
    return {
      films: [],
      totalPages: 0
    }
  }

}

export const searchKeyWord = async (
  query: string,
  page = 1
): Promise<
  { 
    totalResults: number,
    film: Film[]
  }
> => {
  try {
    const { data } = await axiosServices.get<
      any,
      AxiosResponse<{
        total_Results: number
        results: unknown[]
      }>
    >(`/search/multi`, {
      params: {
        query,
        page
      }
    })

    return {
      totalResults: data.total_Results,
      film: data.results.map((val) => formatResult(val))
    }
    
  } catch (error) {
    return {
      totalResults: 0,
      film: []
    }
     
   
  }

  
}