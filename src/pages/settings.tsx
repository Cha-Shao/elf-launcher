import classNames from 'classnames'
import Button from '../components/Base/Button'
import RouteAnimate from '../components/RouteAnimate'
import { Route } from '../components/Sidebar'
import {
  useLocation,
  useNavigate,
  useRoutes,
} from 'react-router-dom'
import pageRoutes from '~react-pages'
import Title from '../components/Base/Title'
import { t } from 'i18next'
import { Suspense } from 'react'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import { configState } from '../main'
import { useStore } from '@nanostores/react'

const Layout = () => {
  const routes: Route[] = [{
    label: t('settings.game.label'),
    path: '/game',
    icon: 'icon-[ph--game-controller-bold]',
  }, {
    label: t('settings.launcher.label'),
    path: '/launcher',
    icon: 'icon-[ph--rocket-launch-bold]',
  }]

  const navigator = useNavigate()
  const location = useLocation()
  const config = useStore(configState)

  return (
    <RouteAnimate className={classNames(
      'w-[48rem] m-auto',
      'grid grid-cols-4 gap-4',
      'h-full',
    )}>
      <div className='pt-8'>
        <Title size="sm" className="mb-2">{t('settings.label')}</Title>
        {routes.map((route, i) => (
          <div key={i} className='relative'>
            <Button
              onClick={() => navigator('/settings' + route.path)}
              variant={location.pathname.includes(route.path) ? 'default' : 'ghost'}
              className="mb-1 w-full"
            >
              <div className="flex items-center gap-2 py-2">
                <span className={classNames(
                  route.icon,
                  'text-lg',
                )} />
                <span>{route.label}</span>
              </div>
            </Button>
            <AnimatePresence>
              {location.pathname.includes(route.path) && (
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
      <div className="pt-8 col-span-3 overflow-y-scroll overflow-x-hidden h-full">
        <Suspense fallback={<></>}>
          {useRoutes(pageRoutes.find(
            route => route.path === 'settings')!.children!,
          )}
        </Suspense>
      </div>
    </RouteAnimate>
  )
}

export default Layout
