import { useEffect, useRef, useState } from 'react';
import { MediaType } from '../../types/catalog.type';
import { Film } from '../../interface';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Card } from '../Home/components/card';
import { useGlobalContext } from '../../libs/providers/RootLayout';
import { IMAGE_URL, IMAGE_WIDTH } from '../../libs/config/common';
import { discover, getTopRated, searchKeyWord } from '../../libs/api/api';

interface Props {
  type: MediaType | 'search' | 'list';
}

const CatalogScreen = (props: Props) => {
  let title = '';
  let request: (page: number) => Promise<{
    totalPages: number;
    films: Film[];
  }>;

  const [film, setFilm] = useState<Film[]>([]);
  const [params] = useSearchParams();
  const { popular } = useGlobalContext();
  const page = useRef(1);
  const totalPage = useRef(2);
  const loadingRef = useRef(false);
  const [onLoading, setOnLoading] = useState(false);
  const navigate = useNavigate();
  const { listTitle } = useParams<any>();

  switch (props.type) {
    case 'movie':
      title = 'Movies';
      request = (page: number) => discover('movie', page).then(response => ({
        totalPages: response.totalPages,
        films: response.films
      }));
      break;
    case 'tv':
      title = 'TV Shows';
      request = (page: number) => discover('tv', page).then(response => ({
        totalPages: response.totalPages,
        films: response.films
      }));
      break;
    case 'search':
      title = `Search results for ${params.get('q')}`;
      request = (page: number) => searchKeyWord(params.get('q') || '', page).then(response => ({
        totalPages: response.totalPages,
        films: response.film // Assuming 'response.film' contains the array of films
      }));
      break;
    default:
      break;
  }

  const fetch = async () => {
    loadingRef.current = true;
    setOnLoading(true);
    const { films, totalPages } = await request(page.current);
    setOnLoading(false)
    loadingRef.current = false;
    totalPage.current = totalPages;
    setFilm((arrs) => [...arrs, ...films]);
  };

  const onWindowScroll = () => {
    if (loadingRef.current) return;
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      if (totalPage.current > page.current) {
        page.current++;
        fetch();
      }
    }
  };

  useEffect(() => {
    setFilm([]);
    page.current = 1;
    fetch();
    console.log()
  }, [props.type, params]);

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll);
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
    };
  }, []);

  return (
    <>
      {/* Background */}
      <div className='relative h-[200px] md:h-[300px]'>
        <div className='absolute inset-0 bg-black bg-opacity-50 w-full rounded-lg overflow-hidden'>
          {props.type !== 'search' && (
            <img
              className='h-full w-full object-cover'
              src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${props.type === 'movie' ? popular?.allmovie[0]?.posterpath : popular?.alltv[0]?.posterpath}`}
              alt={`${title} Cover`}
            />
          )}
        </div>
      </div>

      {/* Title */}
      <div className='relative mx-auto mt-[-50px] mb-[50px] w-full text-center'>
        <h1 className='text-[30px] md:text-[40px] px-6 py-2 font-bold text-white bg-black bg-opacity-70 inline-block rounded-lg'>
          {title}
        </h1>
      </div>

      {/* Movies/TV Shows Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6 px-7'>
        {film.map((film, index) => (
          <div key={index} className='flex flex-col items-center transform hover:scale-105 transition-transform duration-300'>
            <Card
              className='w-full h-full mb-1 rounded-lg shadow-lg overflow-hidden'
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
              onClick={() => {
                navigate(`/${film.mediaType}/${film.id}`);
              }}
            />
            <h2 className='mt-2 text-center text-lg font-medium text-white'>{film.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogScreen;
