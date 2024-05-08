import './slider.css'

import { Settings } from 'react-slick'

export const Slider = (props: Settings) => {
  return <div {...props}>{props.children}</div>
}
