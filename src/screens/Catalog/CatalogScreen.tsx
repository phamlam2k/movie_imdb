import { useEffect, useState } from 'react'
import { MediaType } from '../../types/catalog.type'
import { Film } from '../../interface'
import { useSearchParams } from 'react-router-dom'
import { Card } from '../Home/components/card'

interface Props {
  type: MediaType | 'search'
}

const CatalogScreen = (props: Props) => {
  let title = ''

  const [film, setFilm] = useState<Film[]>([])
  const [params, _] = useSearchParams()

  switch (props.type) {
    case 'movie':
      title = 'Movie'
      break
    case 'tv':
      title = 'TV'
      break

    case 'search':
      title = `Search result for  ${params.get('q')} `
      break

    default:
      break
  }

  const fetch = () => {
    const arrs: any[] = []

    for (let i = 0; i < 20; i++) {
      arrs.push({
        title: ' eqweqwe'
      })
    }

    setFilm(arrs)
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <>
      {/* background */}
      <div className='h-[100px] left-0 right-0 top-0 relative '>
        <div className='overlay-film-cover'></div>
        <div className='bg-primary w-full rounded-lg overflow-hidden h-[120px] '>
          <img
            className='min-h-[120px] w-full h-full object-cover'
            src=''
          ></img>
        </div>
      </div>

      {/* POST AND TEXT */}
      <div className=' mx-auto mt-[-70px] mb-[50px] flex items-center w-[100%]  '>
        <h1 className='z-[10]  text-[30px] px-6 py-1.5'>
          {title}

          <div className='grid grid-cols-6  mobile:grid-cols-2 mt-[100px] w-[100%]'>
            {film.map((film, index) => (
              <div>
                <Card
                  className='w-[410px]'
                  imageSrc=''
                  title={film.title}
                  key={index}
                ></Card>
              </div>
            ))}
          </div>
        </h1>
      </div>
    </>
  )
}

export default CatalogScreen
