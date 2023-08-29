import { t } from 'i18next'
import Button from '../../Base/Button'
import Title from '../../Base/Title'
import { useStore } from '@nanostores/react'
import configState from '../../../config'
import getJava from '../../../lib/getJava'

const Java = () => {
  const config = useStore(configState)

  return (
    <div className="mb-4">
      <Title size='sm' className='mb-2'>Java</Title>
      <div className="grid gap-2">
        {config.javaInfo
          ? config.javaInfo.map((info, i) => (
            <Button
              key={i}
              onClick={async () => await getJava()}
            >
              <div className='py-4 text-left'>
                <p>{info.version}</p>
                <p className='text-xs opacity-50'>{info.path}</p>
              </div>
            </Button>
          )) : (
            <Button onClick={async () => await getJava()}>
              <div className='py-4 text-left'>
                <p>{t('settings.game.java.get.label')}</p>
                <p className='text-xs opacity-50'>{t('settings.game.java.get.desc')}</p>
              </div>
            </Button>
          )}
        <Button onClick={async () => await getJava()}>
          <div className='py-4 text-left'>
            <p>{t('settings.game.java.get.label')}</p>
            <p className='text-xs opacity-50'>{t('settings.game.java.get.desc')}</p>
          </div>
        </Button>
      </div>
    </div>
  )
}

export default Java
