import { motion } from 'framer-motion'
import { HTMLAttributes } from 'react'

const RouteAnimate = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 7 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 7 }}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </motion.div>
  )
}

export default RouteAnimate
