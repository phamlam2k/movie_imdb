import { MediaType } from '../../types/catalog.type'
import { Film } from '../../interface'

export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + ' ' + (val2 || '')
}

export const formatResult = (mediaType: MediaType, obj: any): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.mergeClassName,
    description: obj.overview,
    coverpath: obj.backdrop_path,
    posterpath: obj.poster_path,
    genreIds: obj.genre_ids ?? [],
    mediaType,
    seasons: obj.season ?? []
  }
}
