import { useStore } from '@nanostores/react'
import classNames from 'classnames'
import { t } from 'i18next'
import Button from '~/components/Base/Button'
import Title from '~/components/Base/Title'
import { setConfig } from '~/config'
import { configState } from '~/main'

const isolateMode: {
  icon: string
  label: string
  desc: string
  value: boolean
}[] = [{
  icon: 'icon-[ph--yin-yang-bold]',
  label: t('settings.game.isolate.close.label'),
  desc: t('settings.game.isolate.close.desc'),
  value: false,
}, {
  icon: 'icon-[ph--chart-pie-bold]',
  label: t('settings.game.isolate.open.label'),
  desc: t('settings.game.isolate.open.desc'),
  value: true,
}]

const Isolate = () => {
  const config = useStore(configState)

  return (
    <div className="mb-4">
      <Title size="sm" className="mb-2">
        {t('settings.game.isolate.label')}
      </Title>
      <div className='grid grid-cols-2 gap-2'>
        {isolateMode.map((mode, i) => (
          <Button
            key={i}
            variant={config.isolate === mode.value ? 'primary' : undefined}
            onClick={() => setConfig(prevConfig => ({
              ...prevConfig,
              isolate: mode.value,
            }))}
          >
            <div className='py-4 text-left'>
              <div className="flex items-center gap-1 mb-1">
                <span className={classNames(mode.icon, 'text-lg')} />
                <p>{mode.label}</p>
              </div>
              <p className='opacity-50 text-xs'>{mode.desc}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Isolate
