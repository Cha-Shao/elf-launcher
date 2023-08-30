import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import './locales/i18n'
import { BrowserRouter as Router } from 'react-router-dom'
import { setupConfig } from './config'
import type { Config } from './config'
import setupLib from './lib/setupLib'
import { setupLanguage } from './locales/i18n'
import App from './components/App'
import { atom } from 'nanostores'

export const configState = atom<Config>({
  colorTheme: '#FF8729',
  javaInfo: null,
  selectedJava: 'auto',
  language: 'zh',
  // 不需要存储的信息
  appPath: '',
  minecraftPath: '',
})

const setup = async () => {
  await setupConfig()
  await setupLib()
  await setupLanguage()
}

const mount = async () => {
  await setup()

  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
  )
}

mount()
