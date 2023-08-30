import {
  appDataDir,
  resolve,
  resourceDir,
} from '@tauri-apps/api/path'
import { Store } from 'tauri-plugin-store-api'
import getJava from '../lib/getJava'
import { uniqBy } from 'lodash'
import { configState } from '../main'
import { exists } from '@tauri-apps/api/fs'

export interface JavaInfo {
  version: string
  path: string
}
export interface Config {
  colorTheme: string
  javaInfo: JavaInfo[] | null
  selectedJava: string
  language: string
  // 不需要存储的信息
  appPath: string
  minecraftPath: string
}

const store = new Store('setup.dat')

export const setupConfig = async () => {
  const isConfigExist = await exists(await resolve(await appDataDir(), 'setup.dat'))
  if (!isConfigExist) {
    await store.set('colorTheme', '#FF8729')
    await store.set('javaInfo', [])
    await store.set('selectedJava', null)
    await store.set('language', 'zh')
    await store.save()
  }

  const savedConfig = Object.fromEntries(await store.entries()) as unknown as Config
  const config = {
    colorTheme: savedConfig.colorTheme || '#FF8729',
    javaInfo: savedConfig.javaInfo || null,
    selectedJava: savedConfig.selectedJava || 'auto',
    language: savedConfig.language || 'zh',
  }

  const javaInfo = await getJava()
  const appPath = await resolve(await resourceDir(), 'EMCL')
  const minecraftPath = await resolve(await resourceDir(), '.minecraft')

  await setConfig({
    ...config,
    javaInfo: uniqBy([
      ...(config.javaInfo || []),
      ...javaInfo,
    ], 'version'),
    appPath,
    minecraftPath,
  })
}

export const setConfig: (value: (Config | ((prevState: Config) => Config))) => Promise<void> = async (value) => {
  if (typeof value === 'object') {
    configState.set(value)
    Promise.all(
      Object.entries(value).map(async ([key, value]) => {
        if (key === 'appPath' || key === 'minecraftPath')
          return
        await store.set(key, value)
      }),
    )
    await store.save()
  } else {
    const newConfig = value(configState.get())
    await setConfig(newConfig)
  }
}
