import classNames from 'classnames'
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef
} from 'react'
import Title from './Title'

export interface CardProps {
  title?: string
  size?: 'sm' | 'md' | 'lg'
  bordered?: boolean
}

const Card = forwardRef(function Card(
  props: CardProps & HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>
) {
  const {
    title = '',
    size = 'md',
    bordered = false,
    ...attrs
  } = props

  return (
    <div
      ref={ref}
      {...attrs}
      className={classNames(
        props.className,
        'bg-light dark:bg-dark',

        bordered && 'border-2 border-border',

        size === 'sm' && 'p-2 rounded-lg',
        size === 'md' && 'p-4 rounded-lg',
        size === 'lg' && 'p-6 rounded-2xl',
      )}
    >
      {title && (
        <Title size={size} className={classNames(
          size === 'sm' && 'mb-2',
          size === 'md' && 'mb-4',
          size === 'lg' && 'mb-6',
        )}>
          {title}
        </Title>
      )}
      {props.children}
    </div>
  )
})

export default Card