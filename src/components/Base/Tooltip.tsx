import * as tooltip from '@zag-js/tooltip'
import {
  useMachine,
  normalizeProps,
} from '@zag-js/react'
import { cloneElement } from 'react'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import classNames from 'classnames'

interface TooltipProps {
  content: string
  placement?: tooltip.Placement
  children: React.ReactElement
}

const Tooltip = (props: TooltipProps) => {
  const {
    placement = 'bottom',
  } = props

  const [state, send] = useMachine(tooltip.machine({
    id: props.content,
    positioning: {
      placement,
    },
    openDelay: 300,
    closeDelay: 0,
  }))

  const api = tooltip.connect(state, send, normalizeProps)

  return (
    <>
      {cloneElement(props.children, {
        ...api.triggerProps,
        ...props.children.props,
      })}
      <AnimatePresence>
        {api.isOpen && (
          <div {...api.positionerProps}>
            <div {...api.contentProps}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className={classNames(
                  'bg-dark text-light',
                  'px-1.5 py-0.5',
                  'rounded-md',
                  'text-sm',
                )}>
                <span>{props.content}</span>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Tooltip
