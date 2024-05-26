import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Film } from '../../interface'
import { Section } from './components/section'
import { TrendingHero } from './components/trending-hero'
import { Card } from './components/card'
import { useNavigate } from 'react-router-dom'
import {
  getPopulars,
  getTopRated,
  getTrendings,
  getinTheaters
} from '../../libs/api/api'
import { IMAGE_URL, IMAGE_WIDTH } from '../../libs/config/common'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { mergeFilms } from './../../libs/utils/common'

const HomeScreen = () => {
  const navigate = useNavigate()
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [populars, setPopulars] = useState<Film[]>([])
  const [topratedTV, setTopratedTV] = useState<Film[]>([])
  const [topratedMovie, setTopratedMovie] = useState<Film[]>([])

  const fetchTrendingList = async () => {
    const response = await getTrendings('tv')
    setTrendings(response)
  }

  const fetchInTheaterList = async () => {
    const response = await getinTheaters()
    setInTheaters(response)
  }

  const fetchPopular = async () => {
    const movies = await getPopulars('movie')
    const tvs = await getPopulars('tv')

    setPopulars(mergeFilms(movies, tvs, 20))
  }

  const fetchTopratedTV = async () => {
    const response = await (await getTopRated('tv')).films
    setTopratedTV(response)
  }

  const fetchTopratedMovie = async () => {
    const response = await (await getTopRated('movie')).films
    setTopratedMovie(response)
  }

  useEffect(() => {
    fetchTrendingList()
    fetchInTheaterList()
    fetchPopular()
    fetchTopratedTV()
    fetchTopratedMovie()
  }, [])

  return (
    <>
      {/* Trending */}
      <Section>
        <Slider
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          className='slick-hero'
        >
          {trendings.map((film: Film) => (
            <TrendingHero
              onPlayTrailer={() => {}}
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              film={film}
              key={film.id}
            />
          ))}
        </Slider>
      </Section>
      {/* In Theater */}
      <Section title='In Theatre'>
        <Slider
          autoplay={true}
          slidesToShow={8}
          slidesToScroll={1}
          className='w-[100%]'
        >
          {inTheaters.map((film) => (
            <Card
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              title={film.title}
              key={film.id}
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
            />
          ))}
        </Slider>
      </Section>

      {/* What's popular */}
      <Section title="What's popular">
        <Slider
          autoplay={true}
          slidesToShow={8}
          slidesToScroll={1}
          className='w-[100%]'
        >
          {populars.map((film) => (
            <Card
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              title={film.title}
              key={film.id}
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
            />
          ))}
        </Slider>
      </Section>

      {/* Top rated tv */}
      <Section title='Top Rated TV'>
        <Slider
          autoplay={true}
          slidesToShow={8}
          slidesToScroll={1}
          className='w-[100%]'
        >
          {topratedTV.map((film) => (
            <Card
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              title={film.title}
              key={film.id}
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
            />
          ))}
        </Slider>
      </Section>

      {/* Top rated movie */}
      <Section title='Top Rated Movies'>
        <Slider
          autoplay={true}
          slidesToShow={8}
          slidesToScroll={1}
          className='w-[100%]'
        >
          {topratedMovie.map((film) => (
            <Card
              onClick={() => navigate(`/${film.mediaType}/${film.id}`)}
              title={film.title}
              key={film.id}
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
            />
          ))}
        </Slider>
      </Section>
    </>
  )
}

export default HomeScreen
