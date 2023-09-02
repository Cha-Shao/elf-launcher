import classNames from 'classnames'
import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react'

interface InputProps {
  onChange?: (val: string) => void
}

const Input = forwardRef((
  props: InputProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const {
    onChange = () => { },
    ...attrs
  } = props

  return (
    <input
      ref={ref}
      type="text"
      {...attrs}
      className={classNames(
        attrs.className,
        'outline-none',
        'bg-lightBackground dark:bg-darkBackground rounded-md',
        'min-h-[2rem]',
        'px-2',
      )}
      onChange={e => onChange(e.target.value)}
    />
  )
})

Input.displayName = 'Input'

export default Input
