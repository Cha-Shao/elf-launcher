import {
  resolve,
  resourceDir,
} from '@tauri-apps/api/path'
import type { JavaInfo } from '../config'
import runCommand from './runCommand'

export const getJavaPaths = async (): Promise<string[]> => {
  const whereJavaStdout = await runCommand('where', ['java'])
  const javaPaths = whereJavaStdout.split('\n').map(path => path.slice(0, path.length - 5))
  return javaPaths
}

export const getJavaInfo = async (path: string): Promise<JavaInfo> => {
  const libPath = await resolve(await resolve(await resourceDir(), 'EMCL'), 'lib')
  const version = await runCommand('cd', [
    libPath.replace(/\\\\\?\\/, ''),
    '&&',
    path,
    'getJavaVersion',
  ])
  return {
    path: path.replace('\\java.exe', ''),
    version: version.slice(0, version.length - 1),
  }
}

const getJava = async (): Promise<JavaInfo[]> => {
  const javaPaths = await getJavaPaths()
  const javaInfo: JavaInfo[] = await Promise.all(javaPaths.map(async path => await getJavaInfo(path)))
  return javaInfo
}

export default getJava
