import { t } from 'i18next'
import { useStore } from '@nanostores/react'
import {
  JavaInfo,
  setConfig,
} from '../../../config'
import getJava, {
  getJavaInfo,
} from '../../../lib/getJava'
import { useState } from 'react'
import { dialog } from '@tauri-apps/api'
import { uniqBy } from 'lodash'
import { useToast } from '../../Base/ToastsProvider'
import { configState } from '../../../main'
import Title from '~/components/Base/Title'
import Button from '~/components/Base/Button'

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
    toast.success(t('settings.game.java.search.complete'))
    setLoading(false)
  }
  const handleImport = async () => {
    const javaPath = await dialog.open({
      multiple: false,
      filters: [{
        name: 'java',
        extensions: ['exe'],
      }],
    })
    if (!Array.isArray(javaPath) && javaPath?.endsWith('bin\\java.exe')) {
      const javaInfo: JavaInfo = await getJavaInfo(javaPath)
      if (config.javaInfo?.find(java => java.path === javaPath)) {
        toast.error(t('settings.game.java.exist'))
        return
      }
      await setConfig(prevConfig => ({
        ...prevConfig,
        javaInfo: uniqBy([
          ...(prevConfig.javaInfo || []),
          javaInfo,
        ], 'version'),
      }))
      toast.success(t('settings.game.java.manual.complete'))
    } else {
      toast.error(t('settings.game.java.manual.wrong_path'))
    }
  }

  return (
    <div className="mb-4">
      <Title size='sm' className='mb-2'>Java</Title>
      <div className="grid gap-2">
        <Button
          variant={config.selectedJava === 'auto' ? 'primary' : undefined}
          onClick={async () => await setConfig(prevConfig => ({
            ...prevConfig,
            selectedJava: 'auto',
          }))}
        >
          <div className='py-4 text-left'>
            <p>{t('settings.game.java.auto.label')}</p>
            <p className='text-xs opacity-50'>{t('settings.game.java.auto.desc')}</p>
          </div>
        </Button>
        {config.javaInfo && config.javaInfo.map((info, i) => (
          <Button
            key={i}
            variant={config.selectedJava === info.version ? 'primary' : undefined}
            onClick={async () => await setConfig(prevConfig => ({
              ...prevConfig,
              selectedJava: info.version,
            }))}
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
              <p>{t('settings.game.java.search.label')}</p>
              <p className='text-xs opacity-50'>{t('settings.game.java.search.desc')}</p>
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
