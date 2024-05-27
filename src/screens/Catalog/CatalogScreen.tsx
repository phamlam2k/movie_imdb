import { useEffect, useState } from 'react';
import { MediaType } from '../../types/catalog.type';
import { Film } from '../../interface';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card } from '../Home/components/card';
import { useGlobalContext } from '../../libs/providers/RootLayout';
import { IMAGE_URL, IMAGE_WIDTH } from '../../libs/config/common';

interface Props {
  type: MediaType | 'search';
}

const CatalogScreen = (props: Props) => {
  let title = '';

  const [film, setFilm] = useState<Film[]>([]);
  const [params] = useSearchParams();
  const { popular } = useGlobalContext();
  const navigate = useNavigate()
  
  console.log(popular, props.type);

  switch (props.type) {
    case 'movie':
      title = 'Movies';
      break;
    case 'tv':
      title = 'TV Shows';
      break;
    case 'search':
      title = `Search result for ${params.get('q')}`;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (props.type === 'movie') {
      setFilm(popular?.allmovie || []);
    } else if (props.type === 'tv') {
      setFilm(popular?.alltv || []);
    }
  }, [props.type, popular]);

  return (
    <>
      {/* Background */}
      <div className='relative h-[120px]'>
        <div className='absolute inset-0 bg-primary w-full rounded-lg overflow-hidden'>
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
      <div className='mx-auto mt-[-50px] mb-[50px] w-full text-center'>
        <h1 className='text-[30px] px-6 py-1.5'>{title}</h1>
      </div>

      {/* Movies/TV Shows Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-7'>
        {film.map((film, index) => (
          <div key={index} className='flex flex-col items-center'>
            <Card
              className='w-[80%] h-[100%] mb-1'
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
              onClick={() => {
                navigate(`/${film.mediaType}/${film.id}`)
              }}
            />
            <h2 className='mt-2 text-center text-lg font-medium'>{film.title}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default CatalogScreen;
