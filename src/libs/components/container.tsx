import { CustomComponentProps } from '../../interface'
import { mergeClassName } from '../utils/common'

export const Container = (props: CustomComponentProps) => {
  return (
    <div className={mergeClassName('px-6 py-5 max-w-screen-lg')}>
      {props.children}
    </div>
  )
}
