import { useStore } from '@nanostores/react'
import { configState } from './main'
import { useEffect } from 'react'
import hexToRgb from './utils/hexToRgb'

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const config = useStore(configState)

  useEffect(() => {
    const rootHTML = document.getElementById('root') as HTMLElement
    rootHTML.style.setProperty('--primary', config.colorTheme)
    rootHTML.style.setProperty('--primary-rgb', hexToRgb(config.colorTheme).join(','))
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Providers
