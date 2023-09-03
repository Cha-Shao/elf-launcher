import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import {
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  useState,
} from 'react'
import Card from './Card'
import classNames from 'classnames'
import Title from './Title'

interface CollapseProps {
  title: string
  defaultOpen?: boolean
}

const Collapse = forwardRef((
  props: CollapseProps & HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const {
    defaultOpen = false,
    ...attrs
  } = props

  const [expand, setExpand] = useState(defaultOpen)

  return (
    <Card
      ref={ref}
      {...attrs}
      title={undefined}
      className={props.className}
    >
      <div
        className="flex justify-between items-center"
        onClick={() => setExpand(prevState => !prevState)}
      >
        <Title size='sm'>{props.title}</Title>
        <span className={classNames(
          'icon-[ph--caret-up-bold]',
          'duration-200',
          expand && 'rotate-180',
        )} />
      </div>
      <AnimatePresence>
        {expand && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='mt-2'
          >
            {props.children}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
})

export default Collapse
