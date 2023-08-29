import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import IconButton from './Base/IconButton'
import classNames from 'classnames'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import configState from '../config'
import { useStore } from '@nanostores/react'

export interface Route {
  label: string
  icon: string
  path: string
  children?: Route[]
}

const routes: Route[] = [{
  label: '首页',
  icon: 'icon-[ph--house-bold]',
  path: '/',
}, {
  label: '新闻',
  icon: 'icon-[ph--compass-bold]',
  path: '/news',
}, {
  label: '商店',
  icon: 'icon-[ph--shopping-cart-bold]',
  path: '/store',
}]

const Sidebar = () => {
  const location = useLocation()
  const navigator = useNavigate()
  const config = useStore(configState)

  return (
    <div className="p-2 bg-light border-r border-white dark:bg-dark dark:border-black flex flex-col justify-between">
      <div>
        {routes.map((route, i) => (
          <div key={i} className="relative overflow-hidden">
            <IconButton
              size="xl"
              variant="ghost"
              icon={<span className={classNames(
                route.icon,
                'text-3xl',
              )} />}
              style={{
                ...(location.pathname.split('/')[1] === route.path.split('/')[1] && { color: config.colorTheme }),
              }}
              onClick={() => navigator(route.path)}
            />
            <AnimatePresence>
              {location.pathname.split('/')[1] === route.path.split('/')[1] && (
                <motion.div
                  layoutId="side-bar"
                  className="w-1 h-6 rounded-full absolute left-0 top-[32%]"
                  style={{
                    backgroundColor: config.colorTheme,
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden">
        <IconButton
          size="xl"
          variant="ghost"
          icon={<span className='icon-[ph--gear-six-bold] text-3xl' />}
          style={{
            ...(location.pathname.split('/')[1] === 'settings' && { color: config.colorTheme }),
          }}
          onClick={() => navigator('/settings/game')}
        />
        <AnimatePresence>
          {location.pathname.split('/')[1] === 'settings' && (
            <motion.div
              layoutId="side-bar"
              className="w-1 h-6 rounded-full absolute left-0 top-[32%]"
              style={{
                backgroundColor: config.colorTheme,
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Sidebar
