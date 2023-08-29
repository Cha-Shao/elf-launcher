import {
  createDir,
  exists,
  writeBinaryFile,
} from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import configState from '../config'

const setupLib = async () => {
  const libPath = await resolve(configState.get().appPath, 'lib')

  if (!(await exists(libPath)))
    await createDir(libPath)

  const res = await fetch('/lib/getJavaVersion.class')
  const buffer = await res.arrayBuffer()
  const file = await resolve(libPath, 'getJavaVersion.class')
  await writeBinaryFile(file, buffer)
}

export default setupLib
