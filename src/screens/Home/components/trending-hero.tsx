import { Film } from "../../../interface";
import { Image } from "../../../libs/components/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";


interface Props {
  film: Film;
}
export const TrendingHero = (props: Props) => {
  return (
    <div className="h-[400px] w-[95%] relative flex items-center m-[30px]">
      {/* bg-img */}
      <div className=" absolute left-0 top-0 right-2 bottom-0 z-0 bg-primary w-[100%] h-[420px]">
         <img  src="" className="h-[100%] w-[100%] mr-[10px]">
         </img>

      </div>

      {/* text */}
      <div className="flex flex-col items-start relative z-10 p-20 gap-3">
      <p className="text-xl max-w-[50%] truncate">{props.film.title}</p>
      <p className="text-sm line-clamp-3">{props.film.description}</p>
      <button className="px-3 py-5 flex items-center gap-3 bg-primary cursor-pointer rounded-md h-2">
        <span className="cursor-pointer"> Play Trailer</span>
      </button>
      </div>
    </div>
  );
};
