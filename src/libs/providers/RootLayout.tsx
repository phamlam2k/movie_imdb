import { MediaType } from '../../types/catalog.type'
import Footer from '../layout/Footer'
import Header from '../layout/Header'
import { Genre } from '../../interface'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { getGenres } from '../api/api'
import todoReducer from './reducers/root.reducer'
import { ACTION_KEYS } from '../config/key'
import { Outlet } from 'react-router-dom'

type Genres = {
  [key in MediaType]: Genre[]
}

export type IState = {
  genres: Genres
  grade: number
}

const initialState: IState = {
  genres: {
    movie: [],
    tv: []
  },
  grade: 0
}

export const GlobalContext = createContext<IState>(initialState)

export const GlobalReducer = createContext(null)

const RootLayout = () => {
  const [value, dispatch] = useReducer(todoReducer, initialState)

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

  useEffect(() => {
    fetchGenre()
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
