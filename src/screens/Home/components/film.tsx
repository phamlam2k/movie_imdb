import { useNavigate, useParams } from 'react-router-dom'
import RootLayout, {
  useGlobalContext,
  useGlobalReducer
} from '../../../libs/providers/RootLayout'
import { MediaType } from '../../../types/catalog.type'
import { Image } from '../../../libs/components/image'
import { Section } from './section'
import { Film as FilmInterface, Cast, Trailer } from '../../../interface'
import { useEffect, useState } from 'react'
import { Card } from './card'
import Slider from 'react-slick'
import { getCasts, getDetail, getRecommendations, getTrailers } from '../../../libs/api/api'
import { IMAGE_URL, IMAGE_WIDTH } from '../../../libs/config/common'
import { ACTION_KEYS } from '../../../libs/config/key'
import { mergeClassName, youtubeThumbNail } from '../../../libs/utils/common'

interface Props {
  mediaType: MediaType
}

export const Films = (props: Props) => {
  const { id } = useParams<{ id: string }>()

  const [film, setFilm] = useState<FilmInterface | null>(null)
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailer, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])
  const { genres } = useGlobalContext()
  const dispatch = useGlobalReducer()
  const navigate = useNavigate()





  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id))
    const Cast = await getCasts(film.mediaType, film.id)
    const Trailer = await getTrailers(film.mediaType, film.id)
    const Recomendation = await getRecommendations(film.mediaType, film.id)

    setFilm(film)
    setCasts(Cast)
    setTrailers(Trailer)
    setRecommendations(Recomendation)
  }

  useEffect(() => {
    fetch()
    dispatch({
      type: ACTION_KEYS.UPDATE_GRADE,
      payload: 10
    })


  }, [id])

  if (film === null) {
    return <div></div>
  } else if (film === undefined) {
    return <div className='text-center p-6 h-full flex-1'></div>
  }

  return (
    <>
      {/* background */}
      <div className='h-[700px] left-0 right-0 top-0 relative'>
        <Image
          className='h-[300px]'
          src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.coverpath}`}
        ></Image>
      </div>

      {/* Poster and text */}
      <div className='h-16'>
        <Section>
          <div className='bg-primary h-[400px] w-[15%] rounded-lg overflow-hidden absolute top-[300px] bottom-10 left-[50px] '>
            <img
              src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
              className='min-h-[200px] w-full h-full object-cover'
            ></img>
          </div>
          {/* absolute top-[350px] left-[400px] */}
          <div className=' absolute top-[450px] left-[500px] min-w-[10px]'>
            <p className=' text-[45px] line-camp-1'>{film.title}</p>
            <ul className='flex items-center gap-5 cursor-pointer horver:bg-'>
              {film.genreIds.map((id, i) => (
                <li
                  className=' px-7 py-3 my-4 bg-header  text-sm rounded-lg'
                  key={i}
                >
                  {genres[film.mediaType]?.find((g) => g.id === id)?.name}
                </li>
              ))}
            </ul>
            <p className='text-xl line-camp-3 opacity-[0.5]  w-[80%]'>
              {film.description}
            </p>
          </div>
        </Section>
      </div>

      {/* Cast */}

      <div>
        <Section title='Casts'>
          <div className='overflow-x-auto scrollbar  scrollbar-thumb-header scrollbar-track-gray-600'>
            <div className='flex items-center gap-3 min-w-max'>
              {casts.map((cast, i) => (
                <div className='flex-shrink-0 w-[280px] mb-0' key={i}>
                  <Card imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${cast.profilePath}`} title={`${cast.characterName}`} original_name={`${cast.name}`} />
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>

      {/* Trailer */}

      <div>
        <Section title='Trailer' classNames={'h-[450px] mt-[50px]'}>
          <div className='overflow-x-auto scrollbar  scrollbar-thumb-header scrollbar-track-gray-600'>
            <div className='ml-[30px] flex items-center gap-10 min-w-max'>
              {trailer.map((trailer, i) => (
                <div className='flex-shrink-0 w-[450px] mb-0 pt-10 py-20' key={i}>
                  <div
                    className={mergeClassName(
                      'bg-primary w-full rounded-lg  h-[250px]'
                    )}
                  >
                    <img
                      src={youtubeThumbNail(trailer.key)}
                      className='min-h-[200px] w-full h-full'
                      alt='image_movie'
                    />
                    <p className="py-3 ">{trailer.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </div>


      {/* Season */}
      {props.mediaType === 'tv' && (
        <Section title="Season" classNames=''>
          {film.seasons.length > 1 ? (
            <Slider autoplay={true} slidesToShow={2} slidesToScroll={1}>
              {film.seasons.map((season, id) => (
                <Card
                  title={`Season: ${season.name}`}
                  className="h-[600px] w-full"
                  key={id}
                  imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${season.poster_path}`}
                  onClick={() => {
                    navigate(`/tv/${film.id}/season/seasons`);
                  }}
                />
              ))}
            </Slider>
          ) : (
            <Card
              title={`Season: ${film.seasons[0].name}`}
              className="w-[400px] h-auto object-cover"
              key={film.seasons[0].id}
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.seasons[0].poster_path}`}
              onClick={() => {
                navigate(`/tv/${film.id}/season/seasons`);
              }}
            />
          )}
        </Section>
      )}


      {/* Recommendation */}
      <Section title='Recomendtaion' classNames={'mt-[40px]'}>
        <Slider autoplay={true} slidesToShow={8} slidesToScroll={2}>
          {recommendations.map((re, id) => (
            <Card
              onClick={() => { navigate(`/${props.mediaType}/${re.id}`); }}
              title={re.title} key={id} imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${re.coverpath}`}></Card>
          ))}
        </Slider>
      </Section>


    </>
  )
}
