import { Film } from "../../../interface"

interface Props {
    film: Film
}
export const Card  = (props: Props) => {
    return (
        <div className="mx-3 my-1.5 px-6 bg-primary w-[70%] h-[300px] flex justify-center items-end">
                <img src="https://newshour-classroom-tc.digi-producers.pbs.org/uploads/images/Oppenheimer-Christopher-Nolan-0.width-400.jpg" className="h-[250px] "></img>
                <p className="py-1.5">{props.film.title}</p>
        </div>

    
    )
}