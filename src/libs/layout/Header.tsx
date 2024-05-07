import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Container } from "../components/container";
import { useEffect, useRef, useState } from "react";
import { mergeClassName } from './../utils/common';
import { IoIosSearch } from 'react-icons/io';

const MENU_CLASS = `
px-1.5 
pt-1.5 
hover:bg-primary
rounded-md`;

const MENU_CLASS_ACTIVE = ` bg-primary`;


const Header = () => {
  // check location cua router
  const location = useLocation()

  // lay search
  const [params, _] = useSearchParams()


  const navigate = useNavigate()

  const [pathName, setPathName] = useState('')

  const pathnameRef = useRef('')


  const [keyword, setKeyword] = useState('')



  const [isSearchFocus, setSearchFocus] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)


  
  const goToSearchPage = ()  => {
    if(keyword) {
      navigate(`/search?q=${keyword}`)
    } else {
      setKeyword('')
    }
  }

  const initKeyWord = () => {
    if(pathnameRef.current == '/search') {
      setKeyword(params.get('q') || '')

    }else {
      setKeyword('')
    }
  }

  const onWindowClick = () => {
    setSearchFocus(false)
    initKeyWord()
  }

  const getMenuClass = (path: string) => {
    if (path === pathName) {
      return (mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE))
    } else {
      return (mergeClassName(MENU_CLASS, ''))
    }
  }



  useEffect(() => {
    setPathName(location.pathname)
    pathnameRef.current = location.pathname
  }, [location.pathname])


  useEffect(() => {
    window.addEventListener('click', () => onWindowClick()) 
  }, []
  )


  return (
    <div className="bg-header p-3 flex items-center justify-between w-full"> {/* Full width container */}
      {/* Movie and menu */}
      <div className="flex items-stretch gap-6">
        <h1 className="text-2xl font-semibold">
          <Link to={"/home"}>Motchills</Link>
        </h1>
        <div className="flex pt-0.5 items-center gap-1.5">
          <Link className={getMenuClass('/movies')} to={"/movies"}>Movies</Link>
          <Link className={getMenuClass('/tv')} to={"/tv"}>TV</Link>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center border-b-2 border-white space-x-2 flex[0.5]
      focus-within:border-primary
      ">
        <input 
        onClick={e => { e.stopPropagation()
          setSearchFocus(true)}}
        value={keyword}
        onInput={e => setKeyword(e.currentTarget.value)}
        onKeyDown={e => e.key === "Enter" ? goToSearchPage(): ''}
        type="text" 
        className="bg-transparent outline-none w-50 py-1 px-2" 
        placeholder="Search..." /> {/* Controlled width */}
        <IoIosSearch className="cursor-pointer text-white" size={18} />
      </div>
    </div>
  );


};

export default Header;
