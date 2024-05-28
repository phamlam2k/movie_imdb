import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { getDetail, getTrailers } from '../../../libs/api/api';
import { IMAGE_URL, IMAGE_WIDTH } from '../../../libs/config/common';
import { Film as FilmInterface, Trailer as TrailerInterface } from '../../../interface';
import { Section } from './section';
import { Image } from '../../../libs/components/image';
import { MediaType } from '../../../types/catalog.type';

interface Props {
    mediaType: MediaType;
}

const TrailerComponent = ({ mediaType }: Props) => {
    const { id, trailerid } = useParams<{ id: string; trailerid: string }>();
    const [film, setFilm] = useState<FilmInterface | null>(null);
    const [trailer, setTrailer] = useState<TrailerInterface[]>([]);

    useEffect(() => {
        const fetchFilmAndTrailer = async () => {
            try {
                const filmData = await getDetail(mediaType, parseInt(id));
                const trailerData = await getTrailers(mediaType, parseInt(id));
                setFilm(filmData);
                const selectedTrailer = trailerData.filter(trailer => trailer.id === trailerid);
                setTrailer(selectedTrailer.length > 0 ? selectedTrailer : []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchFilmAndTrailer();
    }, [id, trailerid, mediaType]);

    if (!film || trailer.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/* Background */}
            <div className="relative h-[700px] overflow-hidden">
                <Image
                    className="absolute inset-0 w-full h-full object-cover"
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
                        <p className="mt-4 text-lg text-gray-300 mb-3">{film.description}</p>
                        {trailer.map((trailer) => (
                       <YouTube videoId={trailer.key} className="aspect-video w-full max-w-3xl" />
                    ))}
                    </div>

                    {/* Trailer */}
                   
                </div>
            </Section>
        </>
    );
};

export default TrailerComponent;
