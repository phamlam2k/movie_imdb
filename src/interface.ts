import { ReactNode } from 'react'
import { MediaType } from './types/catalog.type'
import { Geners } from './libs/config/common';

export interface CustomComponentProps {
  children?: ReactNode
  className?: String
}


export interface Film {
  id: number
  mediaType: MediaType
  title: string
  description: string
  posterpath: string
  coverpath: string
  genreIds: number[]
  seasons: Season[]
  poster_path?: string
}

export interface Cast {
  id: number
  name: string
  characterName: string
  profilePath: string
}

export interface Trailer {
  id: string
  key: string // YouTube video ID
  type?: string // e.g., 'Trailer'
}

export interface Genre {
  id: number
  name: string
}

export interface Episode {
  id: number
  title: string
  overview: string
  airDate: string
  stillPath: string
  episodeNumber: number
}


export interface Season {
  id: number
  filmName: string
  name: string
  season_number: number
  poster_path: string
  episodes: Episode[]
  airDate: string
}
               