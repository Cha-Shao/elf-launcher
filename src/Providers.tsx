import { useStore } from '@nanostores/react'
import { configState } from './main'
import { useEffect } from 'react'

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const config = useStore(configState)

  useEffect(() => {
    const rootHTML = document.getElementById('root') as HTMLElement
    rootHTML.style.setProperty('--primary', config.colorTheme + '80')
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Providers
