import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import './locales/i18n'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import Providers from './Providers'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { setupConfig } from './config'
import setupLib from './lib/setupLib'

const setup = async () => {
  await setupConfig()
  await setupLib()
}

setup()

const App = () => {
  return (
    <Providers>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-grow h-full px-4 pt-8">
          <Suspense fallback={<></>}>
            {useRoutes(routes)}
          </Suspense>
        </main>
      </div>
    </Providers>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
