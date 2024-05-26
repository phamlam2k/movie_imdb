import { MediaType } from '../../types/catalog.type';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import { Genre } from '../../interface';
import { createContext, ReactNode, useEffect, useState , useContext} from 'react';
import { Geners } from './../config/common';
import { getGenres } from '../api/api';

type Genres = {
  [key in MediaType]: Genre[];
};

export const GlobalContext = createContext<{
  genres: Genres;
}>({
  genres: {
    movie: [],
    tv: [],
  }
});

export const useGlobalContext = () => useContext(GlobalContext);


const RootLayout: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  });

  const fetchGenre = async () => {
    const movie = await getGenres('movie')
    const tv = await getGenres('tv')

    setGenres({
      movie,
      tv
    })
  }

  useEffect(() => {
    fetchGenre()
  }, [])



  return (
    <GlobalContext.Provider value={{ genres }}>
      <Header />
      {children}
      <Footer />
    </GlobalContext.Provider>
  );
};

export default RootLayout;
