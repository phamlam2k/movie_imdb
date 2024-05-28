import { useEffect, useState } from 'react'
import { Section } from './section'
import { Image } from '../../../libs/components/image'
import { Film } from '../../../interface'
import { Season as  SeasonInterface} from '../../../interface'
import { getSeason } from '../../../libs/api/api'
import { useParams } from 'react-router-dom'
import { IMAGE_URL, IMAGE_WIDTH } from '../../../libs/config/common'


export const Season = () => {
  const [season, setSeason] = useState<SeasonInterface | null>(null)

  const params = useParams<any>()
  
 
  const fetch = async () => {
    const response = await getSeason(
        parseInt(params.id as string),
        parseInt(params.seasonNumber as string)
        
    )
    setSeason(response)
  
  }

   useEffect(() => {
    fetch()
  }, [])
   console.log(season)
  if (!season) {
    return <></>
  }
  return (
    <>
      {/* background */}
      <div className='h-[150px] left-0 right-0 top-0 relative'>
        <Image className='h-[300px]' src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${season.poster_path}`}></Image>
      </div>

      {/* Poster and text */}
      <div className='h-16 mt-[600px]'>
        <Section>
          <div className='bg-primary h-[400px] w-[15%] rounded-lg overflow-hidden absolute top-[300px] bottom-10 left-[50px] '>
            <img
              src='https://static.vecteezy.com/system/resources/thumbnails/012/657/549/small/illustration-negative-film-reel-roll-tapes-for-movie-cinema-video-logo-vector.jpg'
              className='min-h-[200px] w-full h-full object-cover'
            ></img>
          </div>
          {/* absolute top-[350px] left-[400px] */}
          <div className=' absolute top-[440px] left-[500px] min-w-[10px]'>
            <p className='text-[40px] line-camp-1 py-5'>
              {season.filmName}
            </p>
            <div className='flex items-start justify-start'>
              <p className='text-xl text-[30px]  line-camp-3 opacity-[0.5] '>
                {' '}
                All Season  {' '}
              </p>
              <p className='text-xl text-[30px]   opacity-[0.5]  '>
                | {season.episodes?.length} episodes
              </p>
            </div>
          </div>
        </Section>
      </div>

     
      {/* Episodes */}
      {season.episodes?.map((episode, index) => (
        <Section title={`Episode ${episode.episodeNumber}`} key={index}>
          <div className='mb-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-gray-700 transition-colors duration-300 px-3 py-1.5'>
            <div className='bg-primary w-[400px] rounded-lg h-[260px] min-w-[200px] overflow-hidden shadow-lg'>
              <img
                src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${episode.stillPath}`}
                className='min-w-[200px] w-full h-full object-cover'
                alt='Episode Still'
              />
            </div>
            <div className='px-1 w-full overflow-hidden flex flex-col gap-3'>
              <h2 className='text-2xl text-white font-semibold truncate'>{episode.title}</h2>
              <p className='text-lg text-white opacity-75 line-clamp-3'>{episode.overview}</p>
              <div className='text-lg text-right text-white mt-auto'>{episode.airDate}</div>
            </div>
          </div>
        </Section>
      ))}

      
    </>
  )
}
