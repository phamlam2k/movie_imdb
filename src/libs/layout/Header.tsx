import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { mergeClassName } from './../utils/common'
import { IoIosSearch } from 'react-icons/io'
import { SearchResult } from './components/search-result'

const MENU_CLASS = `
px-1
py-1.5 
hover:bg-primary
rounded-md
mobile:px-6
`

const MENU_CLASS_ACTIVE = ` bg-primary`

const Header = () => {
  const location = useLocation()
  const [params, _] = useSearchParams()
  const navigate = useNavigate()

  const [pathname, setPathname] = useState('')
  const pathnameRef = useRef('')
  const defaultKeyword = useRef('')

  const [keyword, setKeyword] = useState('')
  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      navigate(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  const initKeyword = () => {
    if (pathnameRef.current === '/search') {
      setKeyword(defaultKeyword.current)
    } else {
      setKeyword('')
    }
  }

  const onWindowClick = () => {
    setSearchFocus(false)
    initKeyword()
  }

  const getMenuClass = (path: string) => {
    if (path === pathname) {
      return mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE)
    }

    return mergeClassName(MENU_CLASS, '')
  }

  useEffect(() => {
    setPathname(location.pathname)
    pathnameRef.current = location.pathname
    defaultKeyword.current = params.get('q') || ''
    initKeyword()
  }, [location.pathname])

  useEffect(() => {
    window.addEventListener('click', onWindowClick)

    return () => {
      window.removeEventListener('click', onWindowClick)
    }
  }, [])

  return (
    <div className='bg-header p-3 flex items-center justify-between w-full'>
      {' '}
      {/* Full width container */}
      {/* Movie and menu */}
      <div className='flex items-stretch gap-6'>
        <h1 className='text-2xl font-semibold'>
          <Link to={'/'}>Motchills</Link>
        </h1>
        <div
          className='
        flex 
        pt-0.5 
        items-center 
        gap-1.5
        mobile:fixed
        mobile:bottom-0
        mobile:left-0
        mobile:right-0
        mobile:justify-center
        mobile:py-3
        mobile:bg-header
        '
        >
          <Link className={getMenuClass('/movies')} to={'/movies'}>
            Movies
          </Link>
          <Link className={getMenuClass('/tv')} to={'/tv'}>
            TV
          </Link>
        </div>
      </div>
      {/* Search */}
      <div
        className='flex items-center border-b-2 border-white space-x-2 flex[0.5]
      focus-within:border-primary
      relative

      mobile:w-[250px]
  
   
      '
      >
        <input
          onClick={(e) => {
            e.stopPropagation()
            setSearchFocus(true)
          }}
          value={keyword}
          onInput={(e) => setKeyword(e.currentTarget.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? goToSearchPage() : '')}
          type='text'
          className='bg-transparent outline-none w-[450px] py-1 px-2 mobile:ml-[10px]'
          placeholder='Search...'
        />{' '}
        {/* Controlled width */}
        <IoIosSearch className='cursor-pointer text-white' size={18} />
        {/* tmp result */}
        {isSearchFocus ? (
          <SearchResult keyword={keyword} goToSearchPage={goToSearchPage} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default Header
