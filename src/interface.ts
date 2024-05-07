import { ReactNode } from "react";

export interface CustomComponentProps {           
    children?: ReactNode
    className? : String
} ;

export interface Season {
    id: number
}
export interface Film {
    id:number
    title: string
    description: string
    posterpath: string
    coverpath: string
    genreIds: number[]
    seasons: Season[]
};

