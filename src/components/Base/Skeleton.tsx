import classNames from 'classnames'
import { HTMLAttributes } from 'react'

const Skeleton = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={classNames(
        props.className,
        'rounded-md',
        'animate-pulse',
      )}
    >

    </div>
  )
}

export default Skeleton
