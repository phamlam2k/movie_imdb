import { useNavigate } from "react-router-dom";
import { Film } from "../../../interface";
import { Image } from "../../../libs/components/image";


interface Props {
  film: Film;
  onClick: () => void
  onPlayTrailer: () => void
}
export const TrendingHero = (props: Props) => {

  return (
    <div className="h-[400px] w-[95%] relative flex items-center m-[30px] cursor-pointer"
        onClick={() => props.onClick()}
    >
      {/* bg-img */}
      <div className=" absolute left-0 top-0 right-2 bottom-0 z-0 bg-primary w-[100%] h-[420px]">
          <Image className="" src=""></Image>
      </div>

      {/* text */}
      <div className="flex flex-col items-start relative z-10 p-20 gap-3">
      <p className="text-xl text-[28px] max-w-[90%] truncate">{props.film.title}</p>
      <p className="text-sm line-clamp-3">{props.film.description}</p>
      <button className="px-3 py-5 flex items-center gap-3 bg-header cursor-pointer rounded-md h-2 ">
        <span className="cursor-pointer "> Play Trailer</span>
      </button>
      </div>
    </div>
  );
};
