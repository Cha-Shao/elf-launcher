import { resolve, resourceDir } from '@tauri-apps/api/path'
import { atom } from 'nanostores'
import { Store } from 'tauri-plugin-store-api'

export interface JavaInfo {
  version: string
  path: string
}
export interface Config {
  colorTheme: string
  javaInfo: JavaInfo[] | null
  selectedJava: string | null
  customJava: JavaInfo | null
  language: string
  // 不需要存储的信息
  appPath: string
  minecraftPath: string
}

const store = new Store('setup.ini')

const configState = atom<Config>({
  colorTheme: '#FF8729',
  javaInfo: null,
  selectedJava: null,
  customJava: null,
  language: 'zh',
  // 不需要存储的信息
  appPath: '',
  minecraftPath: '',
})

export const setupConfig = async () => {
  const savedConfig = await store.entries()
  if (savedConfig.length === 0) {
    await store.set('test', 'test')
    await store.set('colorTheme', configState.get().colorTheme)
    await store.set('javaInfo', configState.get().javaInfo)
    await store.set('selectedJava', configState.get().selectedJava)
    await store.set('customJava', configState.get().customJava)
    await store.set('language', configState.get().language)
    await store.save()
    setupConfig()
  }
  configState.set({
    ...Object.fromEntries(savedConfig),
    appPath: await resolve(await resourceDir(), 'EMCL'),
    minecraftPath: await resolve(await resourceDir(), '.minecraft'),
  } as unknown as Config)
}

export const setConfig: (value: (Config | ((prevState: Config) => Config))) => Promise<void> = async (value) => {
  if (typeof value === 'object') {
    configState.set(value)
    Object.entries(value).forEach(async ([key, value]) => {
      await store.set(key, value)
    })
    await store.save()
  } else {
    const newConfig = value(configState.get())
    await setConfig(newConfig)
  }
}

export default configState
