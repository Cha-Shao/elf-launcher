import { Suspense } from 'react'
import Providers from '../Providers'
import Header from './Header'
import Sidebar from './Sidebar'
import { useRoutes } from 'react-router-dom'
import routes from '~react-pages'
import ToastsProvider from './Base/ToastsProvider'

const App = () => {
  return (
    <Providers>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-grow h-full px-4 pt-8">
          <Suspense fallback={<></>}>
            {useRoutes(routes)}
            {/* {useRoutes(routes.map(route => ({
              ...route,
              path: `${route.path}/*`,
            })))} */}
          </Suspense>
        </main>
        <ToastsProvider />
      </div>
    </Providers>
  )
}

export default App
