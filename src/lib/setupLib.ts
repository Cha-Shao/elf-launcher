import {
  createDir,
  exists,
  writeBinaryFile,
} from '@tauri-apps/api/fs'
import {
  BaseDirectory,
  resolve,
  resourceDir,
} from '@tauri-apps/api/path'

const setupLib = async () => {
  const libPath = await resolve(await resourceDir(), 'EMCL\\lib')

  if (!(await exists(libPath))) await createDir('EMCL\\lib', {
    dir: BaseDirectory.Resource,
    recursive: true,
  })

  const file = await fetch('/lib/getJavaVersion.class')
  const buffer = await file.arrayBuffer()
  const path = await resolve(libPath, 'getJavaVersion.class')
  await writeBinaryFile(path, buffer)
}

export default setupLib
