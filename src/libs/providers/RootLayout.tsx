import { MediaType } from '../../types/catalog.type'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import { Film, Genre } from '../../interface'
import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { getGenres, getPopulars, getTrendings } from '../api/api'
import todoReducer from './reducers/root.reducer'
import { ACTION_KEYS } from '../config/key'
import { Outlet } from 'react-router-dom'
import { mergeFilms } from '../utils/common'

type Genres = {
  [key in MediaType]: Genre[]
}

export type IState = {
  genres: Genres
  popular: {
    allmovie: Film[],
    alltv: Film[]
  }
  name: string
  grade: number
}

const initialState: IState = {
  genres: {
    movie: [],
    tv: []
  },
  popular: {
    allmovie: [],
    alltv: []
  },
  grade: 0,
  name: ''
}




export const GlobalContext = createContext<IState>(initialState)


export const GlobalReducer = createContext(null)

const RootLayout = () => {
  const [value, dispatch] = useReducer(todoReducer, initialState)

  const [film, setFilms] = useState<Film>(null)

  const fetchGenre = async () => {
    const movie = await getGenres('movie')
    const tv = await getGenres('tv')

    dispatch({
      type: ACTION_KEYS.UPDATE_GENRES,
      payload: {
        movie,
        tv
      }
    })
  }

  const fetchAll = async () => {
    const allmovie = await getTrendings('movie')
    const alltv = await getTrendings('tv')

    dispatch({
      type: ACTION_KEYS.UPDATE_POPULAR,
      payload: {
        allmovie,
        alltv
      }
    })
  }
  

  useEffect(() => {
    fetchGenre()
    fetchAll()
  }, [])

  return (
    <GlobalContext.Provider value={value}>
      <GlobalReducer.Provider value={dispatch}>
        <Header />
        <Outlet />
        <Footer />
      </GlobalReducer.Provider>
    </GlobalContext.Provider>
  )
}

export default RootLayout

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export const useGlobalReducer = () => {
  return useContext(GlobalReducer)
}
