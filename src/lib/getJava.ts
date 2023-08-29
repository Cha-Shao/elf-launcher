import { resolve } from '@tauri-apps/api/path'
import configState, { setConfig } from '../config'
import type { JavaInfo } from '../config'
import runCommand from './runCommand'

const getJava = async () => {
  const whereJavaStdout = await runCommand('where', ['java'])
  const javaPaths = whereJavaStdout.split('\n').map(path => path.slice(0, path.length - 5))

  const libPath = await resolve(configState.get().appPath, 'lib')

  const javaInfo: JavaInfo[] = await Promise.all(javaPaths.map(async path => {
    const version = await runCommand('cd', [
      libPath.replace(/\\\\\?\\/, ''),
      '&&',
      path,
      'getJavaVersion',
    ])
    return {
      path,
      version: version.slice(0, version.length - 1),
    }
  }))

  await setConfig(prevConfig => ({
    ...prevConfig,
    javaInfo,
  }))
}

export default getJava
