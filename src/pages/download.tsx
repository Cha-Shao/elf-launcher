import { t } from 'i18next'
import Title from '../components/Base/Title'
import RouteAnimate from '../components/RouteAnimate'
import { Route } from '../components/Sidebar'
import Button from '../components/Base/Button'
import classNames from 'classnames'
import {
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom'
import { Suspense } from 'react'
import pageRoutes from '~react-pages'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import { useStore } from '@nanostores/react'
import { configState } from '../main'

const Layout = () => {
  const routes: Route[] = [{
    label: t('download.game.label'),
    path: '/game',
    icon: '',
    children: [{
      label: t('download.game.minecraft.label'),
      path: '/minecraft',
      icon: 'icon-[ph--cube-bold]',
    }, {
      label: t('download.game.modpack.label'),
      path: '/modpack',
      icon: 'icon-[ph--package-bold]',
    }],
  }, {
    label: t('download.content.label'),
    path: '/content',
    icon: '',
    children: [{
      label: t('download.content.mod.label'),
      path: '/mod',
      icon: 'icon-[ph--puzzle-piece-bold]',
    }],
  }]

  const navigator = useNavigate()
  const location = useLocation()
  const config = useStore(configState)

  return (
    <RouteAnimate className="w-[48rem] m-auto grid grid-cols-4 gap-4">
      <div>
        {routes.map((route, i) => (
          <div key={i}>
            <Title size="sm" className="mb-2">{route.label}</Title>
            {route.children?.map((child, i) => (
              <div key={i} className='relative'>
                <Button
                  onClick={() => navigator(route.path + child.path)}
                  variant={location.pathname.includes(route.path + child.path) ? 'default' : 'ghost'}
                  className='mb-1 w-full'
                >
                  <div className="flex items-center gap-2 py-2">
                    <span className={classNames(
                      child.icon,
                    )} />
                    <span>{child.label}</span>
                  </div>
                </Button>
                <AnimatePresence>
                  {location.pathname.includes(route.path + child.path) && (
                    <motion.div
                      layoutId="setting"
                      className="w-1 h-5 rounded-full absolute left-0 top-[22.5%]"
                      style={{
                        backgroundColor: config.colorTheme,
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="col-span-3">
        <Suspense fallback={<></>}>
          {useRoutes(pageRoutes.find(
            route => route.path === 'download')!.children!,
          )}
        </Suspense>
      </div>
    </RouteAnimate>
  )
}

export default Layout
