import './slider.css'; 
import Slick from 'react-slick'
import { Settings } from 'react-slick';


export const Slider = (props : Settings) => {
    return (
        <div {...props }>{props.children}</div>
    )

}