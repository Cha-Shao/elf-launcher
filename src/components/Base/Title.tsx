import classNames from 'classnames'
import {
  HTMLAttributes,
  PropsWithChildren,
} from 'react'
import { SizeType } from './component'

interface Props {
  size?: SizeType
}

const Title = (props: Props
  & PropsWithChildren
  & HTMLAttributes<HTMLHeadingElement>) => {
  const {
    size = 'md',
    ...attrs
  } = props

  switch (size) {
    case 'xl':
      return (
        <h1 {...attrs} className={classNames('text-5xl font-bold', props.className)}>
          {props.children}
        </h1>
      )
    case 'lg':
      return (
        <h2 {...attrs} className={classNames('text-3xl font-bold', props.className)}>
          {props.children}
        </h2>
      )
    default: // md
      return (
        <h3 {...attrs} className={classNames('text-2xl font-bold', props.className)}>
          {props.children}
        </h3>
      )
    case 'sm':
      return (
        <h4 {...attrs} className={classNames('text-xl font-bold', props.className)}>
          {props.children}
        </h4>
      )
    case 'xs':
      return (
        <h5 {...attrs} className={classNames('text-lg font-bold', props.className)}>
          {props.children}
        </h5>
      )
  }
}

export default Title