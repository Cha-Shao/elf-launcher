import { useStore } from '@nanostores/react'
import classNames from 'classnames'
import { t } from 'i18next'
import { useState } from 'react'
import Button from '~/components/Base/Button'
import Input from '~/components/Base/Input'
import Title from '~/components/Base/Title'
import { HomeMode, setConfig } from '~/config'
import { configState } from '~/main'

const homeMode: {
  label: string
  value: HomeMode
}[] = [{
  label: t('settings.launcher.home.empty.title'),
  value: HomeMode.Empty,
}, {
  label: t('settings.launcher.home.official.title'),
  value: HomeMode.Official,
}, {
  label: t('settings.launcher.home.local.title'),
  value: HomeMode.Local,
}]

const CustomHome = () => {
  const config = useStore(configState)
  const [homeUrl, setHomeUrl] = useState(config.homeUrl)

  return (
    <div className='mb-4'>
      <Title size='sm' className='mb-2'>
        {t('settings.launcher.home.label')}
      </Title>
      <div className='grid gap-2'>
        {homeMode.map((mode, i) => (
          <Button
            key={i}
            variant={mode.value === config.homeMode ? 'primary' : undefined}
            onClick={async () => await setConfig(prevConfig => ({
              ...prevConfig,
              homeMode: mode.value,
            }))}
          >
            <div className='py-2 flex justify-between items-center'>
              <span className='mr-2'>{mode.label}</span>
              {mode.value === config.homeMode && <span className="icon-[ph--check-bold]" />}
            </div>
          </Button>
        ))}
        <Button
          variant={config.homeMode === HomeMode.Online ? 'primary' : undefined}
          onClick={async () => await setConfig(prevConfig => ({
            ...prevConfig,
            homeMode: HomeMode.Online,
            homeUrl,
          }))}
        >
          <div className='py-2 flex justify-between items-center gap-8'>
            <span>{t('settings.launcher.home.online.title')}</span>
            <Input
              defaultValue={homeUrl || ''}
              onChange={val => setHomeUrl(val)}
              className='flex-grow text-dark dark:text-light'
              onBlur={async () => await setConfig(prevConfig => ({
                ...prevConfig,
                homeUrl,
              }))}
            />
            <span className={classNames(
              'icon-[ph--check-bold]',
              config.homeMode === HomeMode.Online ? 'opacity-100' : 'opacity-0',
            )} />
          </div>
        </Button>
      </div>
    </div>
  )
}

export default CustomHome
