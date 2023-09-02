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

export enum RamMode {
  Low,
  Normal,
  High
}
export interface JavaInfo {
  version: string
  path: string
}
export enum HomeMode {
  Empty,
  Official,
  Local,
  Online
}
export interface Config {
  // game
  isolate: boolean
  javaInfo: JavaInfo[] | null
  selectedJava: string
  ramMode: RamMode
  // launcher
  colorTheme: string
  language: string
  homeMode: HomeMode
  homeUrl: string
}
export interface ConfigRuntime extends Config {
  appPath: string
  configPath: string
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
  const config: Config = {
    isolate: savedConfig.isolate || false,
    javaInfo: savedConfig.javaInfo || null,
    selectedJava: savedConfig.selectedJava || 'auto',
    ramMode: savedConfig.ramMode || RamMode.Normal,
    colorTheme: savedConfig.colorTheme || '#FF8729',
    language: savedConfig.language || 'zh',
    homeMode: HomeMode.Empty,
    homeUrl: '',
  }

  const javaInfo = await getJava()
  const appPath = await resolve(await resourceDir(), 'EMCL')
  const configPath = await resolve(await appDataDir())
  const minecraftPath = await resolve(await resourceDir(), '.minecraft')

  await setConfig({
    ...config,
    javaInfo: uniqBy([
      ...(config.javaInfo || []),
      ...javaInfo,
    ], 'version'),
    // ignore
    appPath,
    configPath,
    minecraftPath,
  })
}

export const setConfig: (value: (ConfigRuntime | ((prevState: ConfigRuntime) => ConfigRuntime))) => Promise<void> = async (value) => {
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
