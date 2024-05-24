import { useEffect, useState } from 'react'
import { Film } from '../../../interface'
import { Image } from '../../components/image'
import { mergeClassName } from '../../utils/common'

interface Props {
  keyword: String
  goToSearchPage: Function
}

export const SearchResult = (props: Props) => {
  const [items, setItem] = useState<Film[]>([])

  const [totalItem, setTotalItem] = useState(6)

  const fetch = () => {
    const arrs: Film[] = []

    for (let i = 0; i < 6; i++) {
      arrs.push({
        id: i,
        mediaType: 'tv',
        title:
          'eqweeqewwwwwwqwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
        description: '',
        coverpath: '',
        genreIds: [1, 2, 3, 4, 5, 6],
        posterpath: '',
        seasons: []
      })
    }

    setItem(arrs)
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
                z-20
            '
    >
      {items.map((film, id) => (
        <div
          key={id}
          className='flex items-start p-1.5 rounded-lg hover:bg-primary cursor-pointer m-1.5 gap-2'
        >
          {/* img */}
          <div className={mergeClassName(
            'bg-primary w-full rounded-lg overflow-hidde h-[100px] gap-3'
          )}
          >
            <img src="" className=' w-full h-full object-cover'></img>
          </div>

          {/* title and generes */}
          <div className='px-3 truncate'>
            <p className='text-base'>{film.title}</p>
            <ul className='flex flex-wrap gap-x-1.5 opacity-[0.7]'>
              {film.genreIds.map((id, i) => (
                <li key={i}>items {i}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      {totalItem >= 6 ? (
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
