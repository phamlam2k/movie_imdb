import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext, useGlobalReducer } from '../../../libs/providers/RootLayout';
import { MediaType } from '../../../types/catalog.type';
import { Image } from '../../../libs/components/image';
import { Section } from './section';
import { Film as FilmInterface, Cast, Trailer } from '../../../interface';
import { useEffect, useState } from 'react';
import { Card } from './card';
import Slider from 'react-slick';
import { getCasts, getDetail, getRecommendations, getTrailers } from '../../../libs/api/api';
import { IMAGE_URL, IMAGE_WIDTH } from '../../../libs/config/common';
import { ACTION_KEYS } from '../../../libs/config/key';
import { youtubeThumbNail } from '../../../libs/utils/common';

interface Props {
  mediaType: MediaType;
}

export const Films = (props: Props) => {
  const { id } = useParams<{ id: string }>();

  const [film, setFilm] = useState<FilmInterface | null>(null);
  const [casts, setCasts] = useState<Cast[]>([]);
  const [trailer, setTrailers] = useState<Trailer[]>([]);
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([]);
  const { genres } = useGlobalContext();
  const dispatch = useGlobalReducer();
  const navigate = useNavigate();

  const fetch = async () => {
    const film = await getDetail(props.mediaType, parseInt(id));
    const Cast = await getCasts(film.mediaType, film.id);
    const Trailer = await getTrailers(film.mediaType, film.id);
    const Recomendation = await getRecommendations(film.mediaType, film.id);

    
    setFilm(film);
    setCasts(Cast);
    setTrailers(Trailer);
    setRecommendations(Recomendation);
  };

  useEffect(() => {
    fetch();
    dispatch({
      type: ACTION_KEYS.UPDATE_GRADE,
      payload: 10,
    });
  }, [id]);

  if (film === null) {
    return <div>Loading...</div>;
  } else if (film === undefined) {
    return <div className="text-center p-6 h-full flex-1">No film found</div>;
  }

  return (
    <>
      {/* Background */}
      <div className="relative h-[700px]">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.coverpath}`}
        />
      </div>

      {/* Poster and text */}
        <Section>
        <div className="relative flex flex-col items-center md:flex-row md:items-start mt-[-150px] md:mt-[-200px]">
          <div className="w-[320px] h-[450px] rounded-xl overflow-hidden shadow-xl bg-black">
            <img
              src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`}
              className="w-full h-full object-cover"
              alt="Film poster"
            />
          </div>
          <div className="mt-8 md:mt-0 md:ml-12 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white">{film.title}</h1>
            <ul className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
              {film.genreIds.map((id, index) => (
                <li
                  className="bg-header text-sm text-white px-4 py-2 rounded-lg"
                  key={index}
                >
                  {genres[film.mediaType]?.find((g) => g.id === id)?.name}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg text-white opacity-75">{film.description}</p>
          </div>
        </div>
      </Section>

      {/* Cast */}
      <Section title="Casts">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-header scrollbar-track-gray-600">
          <div className="flex items-center gap-4">
            {casts.map((cast, i) => (
              <div className="flex-shrink-0 w-[300px] mb-0 hover:scale-105 transition-transform duration-300" key={i}>
                <Card
                  imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${cast.profilePath}`}
                  title={cast.name}
                  original_name={cast.name}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Trailer */}
      <Section title="Trailer" classNames="h-[450px] mt-[50px]">
        <div className="overflow-x-auto scrollbar scrollbar-thumb-header scrollbar-track-gray-600">
          <div className="flex items-center gap-10 ml-[30px]">
            {trailer.map((trailer, i) => (
              <div className="flex-shrink-0 w-[400px] mb-0 pt-10 py-20 hover:scale-105 transition-transform duration-300 cursor-pointer" key={i}>
                <div className="bg-primary w-full rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={youtubeThumbNail(trailer.key)}
                    className="min-h-[200px] w-full h-full object-cover"
                    alt="Trailer Thumbnail"
                    onClick={() =>  navigate(`/${film.mediaType}/${film.id}/trailer/${trailer.id}`)}
                  />
                  <p className="py-3 text-center text-white">{trailer.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Season */}
      {props.mediaType === 'tv' && (
        <Section title="Season">
          {film.seasons.length > 1 ? (
            <Slider autoplay={true} slidesToShow={2} slidesToScroll={1}>
              {film.seasons.map((season, id) => (
                <Card
                  title={`Season: ${season.name}`}
                  className="h-[600px] w-full hover:scale-105 transition-transform duration-300"
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
              className="w-[500px] h-auto object-cover hover:scale-105 transition-transform duration-300"
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
      <Section title="Recommendation" classNames="mt-[40px]">
        <Slider autoplay={true} slidesToShow={4} slidesToScroll={1}>
          {recommendations.map((re, id) => (
            <Card
              onClick={() => {
                navigate(`/${props.mediaType}/${re.id}`);
              }}
              title={re.title}
              key={id}
              className="hover:scale-105 transition-transform duration-300"
              imageSrc={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${re.coverpath}`}
            />
          ))}
        </Slider>
      </Section>
    </>
  );
};
