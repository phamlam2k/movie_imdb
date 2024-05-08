import React from "react"
import { mergeClassName } from "../utils/common"


interface Props {
    src: string
}

export const Image = (props: Props) => {
    return ( 
        <div className= {mergeClassName('bg-primary')}>  
            <img src={props.src} className="w-[120px] h-[80px]"></img>
        </div>
    )
}



















