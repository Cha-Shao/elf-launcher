import {
  ButtonHTMLAttributes,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from 'react'
import { SizeType } from './component'
import classNames from 'classnames'
import getTextColor from '../../utils/getTextColor'
import configState from '../../config'
import { useStore } from '@nanostores/react'

interface ButtonProps {
  variant?: 'default' | 'primary' | 'border' | 'ghost'
  size?: SizeType
  loading?: boolean
}

const Button = forwardRef((
  props: ButtonProps & PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const config = useStore(configState)
  const {
    variant = 'default',
    size = 'md',
    loading = false,
    ...attrs
  } = props

  return (
    <button
      ref={ref}
      {...attrs}
      disabled={attrs.disabled || loading}
      className={classNames(
        attrs.className,
        'hover:brightness-105 active:brightness-95',
        'duration-200',
        variant === 'default' && 'bg-light dark:bg-dark',
        variant === 'primary' && 'text-light',
        variant === 'border' && 'border-2 border-slate-500/20',
        variant === 'ghost' && 'hover:bg-border/10',

        size === 'xs' && 'px-1 min-h-[1.25rem] rounded-sm text-xs',
        size === 'sm' && 'px-2 min-h-[1.5rem] rounded-md text-sm',
        size === 'md' && 'px-4 min-h-[2rem] rounded-md ',
        size === 'lg' && 'px-6 min-h-[2.5rem] rounded-lg text-xl',
        size === 'xl' && 'px-8 min-h-[4rem] rounded-lg text-2xl',

        (attrs.disabled || loading) && 'opacity-50',
      )}
      style={{
        ...attrs.style,
        ...(variant === 'primary' && {
          backgroundColor: config.colorTheme,
          boxShadow: `0 4px 6px -1px ${config.colorTheme}88, 0 2px 4px -2px ${config.colorTheme}88`,
          color: getTextColor(config.colorTheme),
        }),
      }}
    >
      {props.children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
