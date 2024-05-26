import { useEffect, useState, useRef, useContext } from 'react'
import { Film } from '../../../interface'
import { mergeClassName } from '../../utils/common'
import { searchKeyWord } from '../../api/api'
import { IMAGE_URL, IMAGE_WIDTH } from '../../config/common'
import { useGlobalContext } from '../../providers/RootLayout'
import { useNavigate } from 'react-router-dom';


interface Props {
  keyword: string
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItem] = useState<Film[]>([])

  const [totalItem, setTotalItem] = useState(6)

  const searchTimeOut = useRef<any>('')

  const navigate = useNavigate();

  const {genres} = useGlobalContext();



  const fetch = async() => { 
    if(!props.keyword) return
    clearTimeout(searchTimeOut.current)
    searchTimeOut.current = setTimeout( async() => {
      const res = await searchKeyWord(props.keyword)  
      console.log(res.totalResults)
      setTotalItem(res.totalResults)
      setItem(res.film)
    }, 10)
   
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])
  return (
    <div
      className='
                absolute
                top-[48px]
                left-0
                right-0
                rounded-md
                overflow-hidden
                bg-header
                max-h-[1000px]
                overflow-y-auto
                z-20
            '
    >
      {items.map((film, id) => (
        <div
          key={id}
          className='flex items-start p-2 rounded-lg hover:bg-primary cursor-pointer m-2 gap-3'
          onClick={() => navigate(`/${film.mediaType}/${film.id})`)}
        >
          {/* img */}
          <div className={mergeClassName(
            'bg-primary rounded-lg overflow-hidden h-24 w-48 flex-shrink-0'
          )}
          >
            <img src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`} className=' w-full h-full object-cover rounded-lg'></img>
          </div>

          {/* title and generes */}
          <div className='px-3 truncate'>
            <p className='text-base font-semibold overflow-hidden'>{film.title}</p>
            <ul className='flex flex-wrap gap-1.5 opacity-70'>
              {film.genreIds.map((id, i) => (
                <li key={i} className='text-sm'>
                  {
                    genres[film.mediaType].find(g => g.id === id)?.name
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {totalItem >= 7 ? (
        <button
          className='px-3 py-1.5 bg-primary w-full mx-1 hover:text-body sticky bottom-0 shadow-lg'
          onClick={() => props.goToSearchPage}
        >
          More Result
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
