import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Film } from '../../interface'
import { Section } from './components/section'
import { TrendingHero } from './components/trending-hero'
import RootLayout from '../../libs/providers/RootLayout'
import { Card } from './components/card'
import { useNavigate } from 'react-router-dom'
import { getTrendings } from '../../libs/api/api'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const HomeScreen = () => {
  const navigate = useNavigate()
  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])

  const getTrendingList = async () => {
    const response = await getTrendings('tv')

    setTrendings(response)
  }

  useEffect(() => {
    getTrendingList()
  }, [])

  return (
    <RootLayout>
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
              <Card title={film.title} key={film.id} imageSrc='' />
            ))}
          </Slider>
        </Section>
      </>
    </RootLayout>
  )
}

export default HomeScreen
