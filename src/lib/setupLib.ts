import {
  createDir,
  exists,
  writeBinaryFile,
} from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import { configState } from '../main'

const setupLib = async () => {
  const libPath = await resolve(configState.get().appPath, 'lib')

  if (!(await exists(libPath)))
    await createDir(libPath)

  const file = await fetch('/lib/getJavaVersion.class')
  const buffer = await file.arrayBuffer()
  const path = await resolve(libPath, 'getJavaVersion.class')
  await writeBinaryFile(path, buffer)
}

export default setupLib
