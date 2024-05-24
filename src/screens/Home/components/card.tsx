import { useNavigate } from "react-router-dom";
import { Film } from "../../../interface"

interface Props {
    imageSrc: string
    title: string
    onClick?: Function
    className?: string 
}

export const Card = (props: Props) => {
    const navigate = useNavigate()

    return (
    <div className={props.className}> 
        <div className="mx-3 my-1.5 px-6 w-[100%] h-[400px] flex flex-col p-0 cursor-pointer gap-7"
             onClick={() => (props.onClick? props.onClick(): '')}>
            <img src="" alt={props.title} className="w-full h-full bg-primary" />
            <p className="py-1.5 line-">{props.title}</p>
        </div>
    </div>  
    );   
}
