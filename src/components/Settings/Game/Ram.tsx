import { useStore } from '@nanostores/react'
import classNames from 'classnames'
import { t } from 'i18next'
import Button from '~/components/Base/Button'
import Title from '~/components/Base/Title'
import {
  RamMode,
  setConfig,
} from '~/config'
import { configState } from '~/main'

const ramMode: {
  icon: string
  label: string
  desc: string
  value: RamMode
}[] = [{
  icon: 'icon-[ph--lightning-bold]',
  label: t('settings.game.ram.low.label'),
  desc: t('settings.game.ram.low.desc'),
  value: RamMode.Low,
}, {
  icon: 'icon-[ph--scales-bold]',
  label: t('settings.game.ram.normal.label'),
  desc: t('settings.game.ram.normal.desc'),
  value: RamMode.Normal,
}, {
  icon: 'icon-[ph--game-controller-bold]',
  label: t('settings.game.ram.high.label'),
  desc: t('settings.game.ram.high.desc'),
  value: RamMode.High,
}]

const Ram = () => {
  const config = useStore(configState)

  return (
    <div className="mb-4">
      <Title size="sm" className="mb-2">
        {t('settings.game.ram.label')}
      </Title>
      <div className='grid grid-cols-3 gap-2'>
        {ramMode.map((mode, i) => (
          <Button
            key={i}
            variant={config.ramMode === mode.value ? 'primary' : undefined}
            onClick={async () => await setConfig(prevConfig => ({
              ...prevConfig,
              ramMode: mode.value,
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

export default Ram
