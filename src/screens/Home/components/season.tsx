import React, { useEffect, useState } from "react"
import { Section } from "./section"
import { Image } from "../../../libs/components/image"
import { Film } from "../../../interface"
import RootLayout from './../../../libs/providers/RootLayout';

export const Season = () => {

    const [film, setFilm] = useState<Film>(
        {
            id: 0,
            mediaType: 'tv',
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
                    id: 1,
                    seasonNumber: 1
                },
                {
                    id: 2,
                    seasonNumber: 1
                },
                {
                    id: 3,
                    seasonNumber: 1
                },
                {
                    id: 4,
                    seasonNumber: 1
                },
            ],
        }
    )

    const [episodes, setEpisodes] = useState<any[]>()

    const fetch = () => {
        const arrs: any[] = []

        for (let i = 0; i < 12; i++) {
            arrs.push({})
        }
        setEpisodes(arrs)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <RootLayout>
            <>
                {/* background */}
                <div className="h-[150px] left-0 right-0 top-0 relative">
                    <Image className="h-[300px]" src=""></Image>
                </div>


                {/* Poster and text */}
                <div className="h-16 mt-[750px]">
                    <Section>
                        <div className=
                            'bg-primary h-[400px] w-[15%] rounded-lg overflow-hidden absolute top-[300px] bottom-10 left-[50px] '>
                            <img src="" className='min-h-[200px] w-full h-full object-cover'></img>

                        </div>
                        {/* absolute top-[350px] left-[400px] */}
                        <div className=" absolute top-[440px] left-[500px] min-w-[10px]">
                            <p className="text-xl text-[40px] line-camp-1 py-10">{film.title}</p>
                            <div className="flex items-start justify-start">
                                <p className="text-xl text-[30px]  line-camp-3 opacity-[0.5] "> Season 1 </p>
                                <p className="text-xl text-[30px]   opacity-[0.5]  ">| {episodes?.length} episodes</p>
                            </div>
                        </div>
                    </Section>
                </div>

                {/* Eposodies*/}
                <Section title="Episodes">
                    {episodes?.map((episodes, index) =>
                        <div className="mb-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary px-3 py-1.5  " key={index}>
                            <div className='bg-primary w-[400px] rounded-lg h-[460px] min-w-[300px]'>
                                <img src="" className='min-w-[200px] w-[100%] h-full object-cover'></img>
                            </div>

                            <div className="px-1 w-[80%]  overflow-hidden flex flex-col gap-3   ">
                                <p className="text-lg truncate">
                                    A screenplay synopsis is a vital tool in the filmmaking world, helping you sell your movie idea to agents, managers, producers, studio execs - basically anyone in
                                    Their journey is fraught with danger as they encounter ruthless scavengers and treacherous terrain. Along the way, Mia grapples with her guilt over leading Sam into danger and her fear of failing to protect him.

                                    As they near New Eden, Mia faces a moral dilemma when they stumble upon a group of refugees in desperate need of help. Risking their safety, Mia chooses compassion over self-preservation, earning the trust of the refugees.
                                </p>

                                <p className="opacity-[0.9] lime-clamp-5">

                                    A screenplay synopsis is a vital tool in the filmmaking world, helping you sell your movie idea to agents, managers, producers, studio execs - basically anyone in
                                    Their journey is fraught with danger as they encounter ruthless scavengers and treacherous terrain. Along the way, Mia grapples with her guilt over leading Sam into danger and her fear of failing to protect him.

                                    As they near New Eden, Mia faces a moral dilemma when they stumble upon a group of refugees in desperate need of help. Risking their safety, Mia chooses compassion over self-preservation, earning the trust of the refugees.
                                </p>

                                <div className="mt-auto pt-3 text-right">22- November 2024</div>
                            </div>
                        </div>
                    )}
                </Section>

            </>
        </RootLayout>
    )
}