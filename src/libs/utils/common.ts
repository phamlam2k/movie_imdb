import { MediaType } from '../../types/catalog.type'
import { Film } from '../../interface'

export const mergeClassName = (val1: string, val2?: string) => {
  return val1 + ' ' + (val2 || '')
}

export const formatResult = (obj: any , mediaType?: MediaType, ): Film => {
  return {
    id: obj.id,
    title: obj.title || obj.name,
    description: obj.overview,
    coverpath: obj.backdrop_path,
    posterpath: obj.poster_path,
    genreIds: obj.genre_ids ?? [],
    mediaType: mediaType || obj.media_type,
    seasons: obj.seasons ?? []
  }
}
export const isFilm = (film: any): film is Film => {
  return <Film>film !== undefined
}
export const mergeFilms = (movies: Film[], tvs: Film[], limit = 6) => {
  const arrs: Film[] = []

  for (let i = 0; i < limit; i++) {
    let film: unknown

    if (i % 2 == 1) {
      if (tvs[i - 1]) {
        film = tvs[i - 1]
      }
    } else {
      if (movies[i - 1]) {
        film = tvs[i - 1]
      }
    }

    if (isFilm(film)) arrs.push(film)
  }

  return arrs
}
