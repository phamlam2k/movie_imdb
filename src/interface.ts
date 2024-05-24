import { ReactNode } from "react";
import { MediaType } from "./types/catalog.type";

export interface CustomComponentProps {           
    children?: ReactNode
    className? : String
} ;

export interface Season {
    id: number
    seasonNumber: number
}

export interface FilmInterface {
  
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
};

export interface Cast {
    id: number
    name: string
    characterName: string
    profilePath: string
}



export interface Trailer {
  id: number
  key: string
}

