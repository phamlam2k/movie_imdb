import { useNavigate, useParams } from "react-router-dom";
import RootLayout from "../../../libs/providers/RootLayout";
import { MediaType } from "../../../types/catalog.type";
import { screen } from '@testing-library/react';
import { Image } from "../../../libs/components/image";
import { Section } from './section';
import { Film, Cast, Trailer } from "../../../interface";
import { useEffect, useState } from "react";
import { Card } from "./card";
import Slider from "react-slick";
import { Season } from './season';


interface Props {
    mediaType: MediaType
}

export const Films = (props: Props) => {
    const { params } = useParams()

    const [film, setFilm] = useState<Film>({
        id: 0,
        mediaType: props.mediaType,
        title: 'The Movie Title',
        description: `A screenplay synopsis is a vital tool in the filmmaking world, helping you sell your movie idea to agents, managers, producers, studio execs - basically anyone in  
Their journey is fraught with danger as they encounter ruthless scavengers and treacherous terrain. Along the way, Mia grapples with her guilt over leading Sam into danger and her fear of failing to protect him.

As they near New Eden, Mia faces a moral dilemma when they stumble upon a group of refugees in desperate need of help. Risking their safety, Mia chooses compassion over self-preservation, earning the trust of the refugees.

But their newfound allies harbor a dark secret: New Eden is a myth perpetuated by a tyrant seeking to exploit survivors for his own gain. Mia must confront her inner demons and rally the refugees to overthrow the tyrant before he destroys them all.

In a climactic showdown, Mia leads the charge against the tyrant's stronghold, facing her fears head-on to protect her brother and secure a future free from oppression.'
`,
        posterpath: '',
        coverpath: '',
        genreIds: [1, 2, 3, 4],
        seasons: [
            {
                id:1,
                seasonNumber:1
            },
              {
                id:2,
                seasonNumber:1
            },
              {
                id:3,
                seasonNumber:1
            },
              {
                id:4,
                seasonNumber:1
            },
        ],
    })


    const [casts, setCasts] = useState<Cast[]>([])
    const [trailer, setTrailers] = useState<Trailer[]>([])
    const [recommendations, setRecommendations] = useState<Cast[]>([])
    const naivagte = useNavigate()

    const fetch = () => {
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

    return (
        <RootLayout>
            <>
                {/* background */}
                <div className="h-[700px] left-0 right-0 top-0 relative">
                    <Image className="h-[300px]" src=""></Image>
                </div>


                {/* Poster and text */}
                <div className="h-16">
                    <Section>
                        <div className=
                            'bg-primary h-[400px] w-[15%] rounded-lg overflow-hidden absolute top-[300px] bottom-10 left-[50px] '>
                            <img src="" className='min-h-[200px] w-full h-full object-cover'></img>

                        </div>
                        {/* absolute top-[350px] left-[400px] */}
                        <div className=" absolute top-[450px] left-[500px] min-w-[10px]">
                            <p className="text-xl text-[35px] line-camp-1">{film.title}</p>
                            <ul className="flex items-center gap-5 cursor-pointer horver:bg-">
                                {
                                    film.genreIds.map((genre, id) => (
                                        <li className=" px-7 py-3 my-4 bg-header  text-sm rounded-lg" key={id}>
                                            item{id}
                                        </li>
                                    )
                                    )
                                }

                            </ul>
                            <p className="text-xl line-camp-3 opacity-[0.5]  w-[80%]">{film.description}</p>

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
                        {film.seasons.map((season,id) => (
                            <Card title={`Season: ${season.seasonNumber}`}  key={id} imageSrc=""
                                onClick={() => { naivagte(`/tv/${film.id}/season/${season.id}`)}}
                            ></Card>
                        ))}
                    </Slider>
                </Section>

                {/* Recommendation */}               
                <Section title="Recomendtaion" >
                    <Slider autoplay={true} slidesToShow={8} slidesToScroll={2} >
                        {recommendations.map((re,id) => (
                            <Card title="" key={id} imageSrc=""></Card>
                        ))}
                    </Slider>
                </Section>

            </>
        </RootLayout>
    )
}