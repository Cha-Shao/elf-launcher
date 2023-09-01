import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
} from 'react'
import { SizeType } from './component'
import classNames from 'classnames'
import { useStore } from '@nanostores/react'
import { configState } from '~/main'

interface IconButtonProps {
  icon: React.ReactNode
  variant?: 'default' | 'primary' | 'border' | 'ghost'
  size?: SizeType
}

const IconButton = forwardRef((
  props: IconButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const config = useStore(configState)
  const {
    icon = null,
    variant = 'default',
    size = 'md',
    ...attrs
  } = props

  return (
    <button
      ref={ref}
      {...attrs}
      className={classNames(
        attrs.className,
        'flex justify-center items-center',
        'hover:brightness-105 active:brightness-95',
        'duration-200',
        variant === 'default' && 'bg-light',
        variant === 'primary' && 'text-light',
        variant === 'border' && 'border-2 border-slate-500/20',
        variant === 'ghost' && 'hover:bg-border/10',

        size === 'xs' && 'w-[1.25rem] h-[1.25rem] rounded-sm text-xs',
        size === 'sm' && 'w-[1.5rem] h-[1.5rem] rounded-md text-sm',
        size === 'md' && 'w-[2rem] h-[2rem] rounded-md ',
        size === 'lg' && 'w-[2.5rem] h-[2.5rem] rounded-lg text-xl',
        size === 'xl' && 'w-[4rem] h-[4rem] rounded-lg text-2xl',

        attrs.disabled && 'opacity-50',
      )}
      style={{
        ...attrs.style,
        ...(variant === 'primary' && {
          backgroundColor: config.colorTheme,
          boxShadow: `0 4px 6px -1px ${config.colorTheme}88, 0 2px 4px -2px ${config.colorTheme}88`,
        }),
      }}
    >
      {icon}
    </button>
  )
})

IconButton.displayName = 'IconButton'

export default IconButton
