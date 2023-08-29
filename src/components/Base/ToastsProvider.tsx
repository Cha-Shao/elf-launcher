import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import Card from './Card'
import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import { useEffect } from 'react'

interface ToastProps {
  id: string
  content: string
  type: 'info' | 'success' | 'error'
}

const toastState = atom<ToastProps[]>([])

const Toast = (props: ToastProps) => {
  const toast = useToast()
  useEffect(() => {
    setTimeout(() => {
      toast.remove(props.id)
    }, 7000)
  }, [])

  const Icon = () => {
    switch (props.type) {
      case 'info': return <span className="icon-[ph--info-fill] text-info text-2xl" />
      case 'success': return <span className="icon-[ph--check-circle-fill] text-success text-2xl" />
      case 'error': return <span className="icon-[ph--x-circle-fill] text-error text-2xl" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -7 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -7 }}
      layout
      className='mt-2'
    >
      <Card size='sm' className='shadow-md'>
        <div className='flex items-center gap-2'>
          <Icon />
          <p>{props.content}</p>
        </div>
      </Card>
    </motion.div>
  )
}

const ToastsProvider = () => {
  const toasts = useStore(toastState)
  return (
    <div className='fixed left-24 bottom-4'>
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}

class Toasts {
  create(content: ToastProps['content'], type: ToastProps['type']) {
    toastState.set([
      ...toastState.get(),
      { id: new Date().getTime().toString(), content, type },
    ])
  }
  info(content: ToastProps['content']) {
    this.create(content, 'info')
  }
  success(content: ToastProps['content']) {
    this.create(content, 'success')
  }
  error(content: ToastProps['content']) {
    this.create(content, 'error')
  }
  remove(id: string) {
    toastState.set(toastState.get().filter(toast => toast.id !== id))
  }
}
export const useToast = () => new Toasts()

export default ToastsProvider
