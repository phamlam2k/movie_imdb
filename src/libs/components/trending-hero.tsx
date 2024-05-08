import { IoMdPlayCircle } from "react-icons/io"
import { Film } from "../../interface"
import { Image } from "./image"
import { SlArrowLeft , SlArrowRight } from 'react-icons/sl';

interface Props {
    film: Film
}
export const TrendingHero = (props: Props) => {
    return (
        <div className="h-[300px] relative flex justify-center m-[30px]">
                {/* bg-img */}
            <div className="absolute left-0 top-0 right-0 bottom-0">
                    <Image src =""></Image>
            </div>
         
            
                 {/* text */}
            <div className="flex flex-col items-start"></div>
            <p className="text-xl max-w-[50%] truncate">{props.film.title}</p>
            <p className="text-xl line-clamp-3">{props.film.description}</p>
            <button className="px-3 py-5 flex items-center gap-3">
                 <SlArrowLeft  size={18}/> 
                 <SlArrowRight  size={18}/>
                    <span> Play Trailer</span>
            </button>

        </div>
    )
}