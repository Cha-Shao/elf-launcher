import { t } from 'i18next'
import Button from '../../Base/Button'
import Title from '../../Base/Title'
import { useStore } from '@nanostores/react'
import configState, {
  JavaInfo,
  setConfig,
} from '../../../config'
import getJava, { getJavaInfo } from '../../../lib/getJava'
import { useState } from 'react'
import { dialog } from '@tauri-apps/api'
import { uniqBy } from 'lodash'
import { useToast } from '../../Base/ToastsProvider'

const Java = () => {
  const [loading, setLoading] = useState(false)
  const config = useStore(configState)
  const toast = useToast()

  const handleSearch = async () => {
    setLoading(true)
    const javaInfo = await getJava()
    await setConfig(prevConfig => ({
      ...prevConfig,
      javaInfo: uniqBy([
        ...(prevConfig.javaInfo || []),
        ...javaInfo,
      ], 'path'),
    }))
    toast.success('搜索完毕')
    setLoading(false)
  }
  const handleImport = async () => {
    const javaPath = await dialog.open({
      multiple: false,
      filters: [{
        name: 'javaw',
        extensions: ['exe'],
      }],
    })
    if (!Array.isArray(javaPath) && javaPath?.endsWith('bin\\javaw.exe')) {
      const javaInfo: JavaInfo = await getJavaInfo(javaPath)
      await setConfig(prevConfig => ({
        ...prevConfig,
        javaInfo: uniqBy([
          ...(prevConfig.javaInfo || []),
          javaInfo,
        ], 'version'),
      }))
    }
  }

  return (
    <div className="mb-4">
      <Title size='sm' className='mb-2'>Java</Title>
      <div className="grid gap-2">
        <Button onClick={() => { }}>
          <div className='py-4 text-left'>
            <p>{t('settings.game.java.auto.label')}</p>
            <p className='text-xs opacity-50'>{t('settings.game.java.auto.desc')}</p>
          </div>
        </Button>
        {config.javaInfo && config.javaInfo.map((info, i) => (
          <Button
            key={i}
            onClick={handleSearch}
          >
            <div className='py-4 text-left'>
              <p>{info.version}</p>
              <p className='text-xs opacity-50'>{info.path}</p>
            </div>
          </Button>
        ))}
        <div className='grid grid-cols-2 gap-2'>
          <Button onClick={handleSearch} loading={loading}>
            <div className='py-4 text-left'>
              <p>{t('settings.game.java.get.label')}</p>
              <p className='text-xs opacity-50'>{t('settings.game.java.get.desc')}</p>
            </div>
          </Button>
          <Button onClick={handleImport}>
            <div className='py-4 text-left'>
              <p>{t('settings.game.java.import.label')}</p>
              <p className='text-xs opacity-50'>{t('settings.game.java.import.desc')}</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Java
