import { useNavigate, useParams } from "react-router-dom";
import RootLayout, { useGlobalContext } from "../../../libs/providers/RootLayout";
import { MediaType } from "../../../types/catalog.type";
import { screen } from '@testing-library/react';
import { Image } from "../../../libs/components/image";
import { Section } from './section';
import { Film, Cast, Trailer } from "../../../interface";
import { useEffect, useState } from "react";
import { Card } from "./card";
import Slider from "react-slick";
import { getDetail } from "../../../libs/api/api";
import { IMAGE_URL, IMAGE_WIDTH } from "../../../libs/config/common";


interface Props {
    mediaType: MediaType
}

export const Films = (props: Props) => {
    const { id } = useParams<{ id: string }>();

    const [film, setFilm] = useState<Film | null>(null)
    const [casts, setCasts] = useState<Cast[]>([])
    const [trailer, setTrailers] = useState<Trailer[]>([])
    const [recommendations, setRecommendations] = useState<Cast[]>([])
    const {genres} = useGlobalContext();
    const naivagte = useNavigate()

    console.log(genres)


 




    const fetch = async () => {
        const response = await getDetail(props.mediaType, parseInt(id))

        setFilm(response)


        const arrs: any[] = []

        for (let i = 0; i < 20; i++) {
            arrs.push({})
        }

        setCasts(arrs)
        setTrailers(arrs)
        setRecommendations(arrs)
    }

    useEffect(() => {
        fetch()
    }, [])

    if (film === null) {
        return  <div>
              
                </div>
    } else if (film === undefined) {
        return (
            <div className="text-center p-6 h-full flex-1">
              
            </div>
        )
    }

    return (
        <RootLayout>
            <>
                {/* background */}
                <div className="h-[700px] left-0 right-0 top-0 relative">
                    <Image className="h-[300px]" src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.coverpath}`}></Image>
                </div>


                {/* Poster and text */}
                <div className="h-16">
                    <Section>
                        <div className=
                            'bg-primary h-[400px] w-[15%] rounded-lg overflow-hidden absolute top-[300px] bottom-10 left-[50px] '>
                            <img src={`${IMAGE_URL}/${IMAGE_WIDTH.ORIGINAL}${film.posterpath}`} className='min-h-[200px] w-full h-full object-cover'></img>

                        </div>
                        {/* absolute top-[350px] left-[400px] */}
                        <div className=" absolute top-[450px] left-[500px] min-w-[10px]">
                            <p className="text-xl text-[50px] line-camp-1">{film.title}</p>
                            <ul className="flex items-center gap-5 cursor-pointer horver:bg-">
                                {
                                    film.genreIds.map((id, i) => (
                                        <li className=" px-7 py-3 my-4 bg-header  text-sm rounded-lg" key={i}>
                                            {  
                                            genres[film.mediaType]?.find((g) => g.id === id)?.name
                                            }
                                        </li>
                                    )
                                    )
                                }

                            </ul>
                            <p className="text-xl line-camp-3 py-20 opacity-[0.5]  w-[80%]">{film.description}</p>

                        </div>
                    </Section>
                </div>

                {/* Cast */}

                <div>
                    <Section title="Casts">
                        <div className="overflow-x-auto scrollbar  scrollbar-thumb-header scrollbar-track-gray-300" >
                            <div className="flex items-center gap-3 min-w-max">
                                {casts.map((cast, i) => (
                                    <div className="flex-shrink-0 w-[280px] mb-0" key={i}>
                                        <Card
                                            imageSrc=""
                                            title="Danny Rand eqweeq"
                                        />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>
                </div>


                {/* Trailer */}


                <div>
                    <Section title="Trailer">
                        <div className="overflow-x-auto scrollbar  scrollbar-thumb-header scrollbar-track-gray-300" >
                            <div className="flex items-center gap-3 min-w-max">
                                {trailer.map((cast, i) => (
                                    <div className="flex-shrink-0 w-[450px] mb-0" key={i}>
                                        <Card
                                            imageSrc=""
                                            title=""
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>
                </div>



                {/* Season */}
                <Section title="Season" >
                    <Slider slidesToShow={3} slidesToScroll={2} >
                        {film.seasons.map((season, id) => (
                            <Card title={`Season: ${season.seasonNumber}`} key={id} imageSrc=""
                                onClick={() => { naivagte(`/tv/${film.id}/season/${season.id}`) }}
                            ></Card>
                        ))}
                    </Slider>
                </Section>

                {/* Recommendation */}
                <Section title="Recomendtaion" >
                    <Slider autoplay={true} slidesToShow={8} slidesToScroll={2} >
                        {recommendations.map((re, id) => (
                            <Card title="" key={id} imageSrc=""></Card>
                        ))}
                    </Slider>
                </Section>

            </>
        </RootLayout>
    )
}