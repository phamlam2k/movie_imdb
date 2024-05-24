import React from 'react'
import { mergeClassName } from '../utils/common'

interface Props {
  src: string
  className: string
}

export const Image = (props: Props) => {
  return (
    <div  className={mergeClassName(
        'bg-primary w-full rounded-lg overflow-hidde h-[460px]'
      )}
      >
      <img src={props.src} className='min-h-[200px] w-full h-full object-cover'></img>
    </div>
  )
}
