import {
  exists,
  readTextFile,
  writeBinaryFile,
} from '@tauri-apps/api/fs'
import {
  appDataDir,
  resolve,
} from '@tauri-apps/api/path'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { configState } from '~/main'

const Home = () => {
  let [content, setContent] = useState('')

  const readLocalHome = useCallback(async () => {
    const isLocalHomeExist = await exists(await resolve(configState.get().configPath, 'home.md'))
    if (isLocalHomeExist) {
      const localHomeContent = await readTextFile(await resolve(await appDataDir(), 'home.md'))
      console.log(localHomeContent)
      setContent(localHomeContent)
    } else {
      const file = await fetch('home.md')
      const buffer = await file.arrayBuffer()
      const path = await resolve(configState.get().configPath, 'home.md')
      await writeBinaryFile(path, buffer)
    }
  }, [])

  useEffect(() => {
    readLocalHome()
  }, [])

  return (
    <ReactMarkdown
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Home
