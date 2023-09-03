import { useStore } from '@nanostores/react'
import { configState } from './main'
import { useEffect } from 'react'

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const config = useStore(configState)

  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return [r, g, b]
  }

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
