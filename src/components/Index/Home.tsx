import { useStore } from '@nanostores/react'
import {
  exists,
  readTextFile,
  writeBinaryFile,
} from '@tauri-apps/api/fs'
import { resolve } from '@tauri-apps/api/path'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { HomeMode } from '~/config'
import { configState } from '~/main'
import './home.css'
import { open } from '@tauri-apps/api/shell'
import classNames from 'classnames'
import Collapse from '../Base/Collapse'
import Button from '../Base/Button'

const Home = () => {
  const config = useStore(configState)
  let [content, setContent] = useState('')

  const setupOfficialHome = useCallback(async () => {
    const homeText = await fetch('https://emcl.elfmc.com/home.md')
      .then(res => res.text())
    setContent(homeText)
  }, [])
  const setupLocalHome = useCallback(async () => {
    const isLocalHomeExist = await exists(await resolve(configState.get().appPath, 'home.md'))
    if (isLocalHomeExist) {
      const localHomeContent = await readTextFile(await resolve(configState.get().appPath, 'home.md'))
      setContent(localHomeContent)
    } else {
      const file = await fetch('home.md')
      const buffer = await file.arrayBuffer()
      const path = await resolve(configState.get().appPath, 'home.md')
      await writeBinaryFile(path, buffer)
    }
  }, [])
  const setupOnlineHome = useCallback(async () => {
    const homeText = await fetch(config.homeUrl)
      .then(res => res.text())
    setContent(homeText)
  }, [])

  useEffect(() => {
    if (config.homeMode === HomeMode.Official) setupOfficialHome()
    if (config.homeMode === HomeMode.Local) setupLocalHome()
    if (config.homeMode === HomeMode.Online) setupOnlineHome()
  }, [])

  return (
    <ReactMarkdown
      // @ts-ignore
      rehypePlugins={[rehypeRaw]}
      components={{
        a(props) {
          return (
            <span
              className={classNames(
                'cursor-pointer underline',
                props.className,
              )}
              onClick={() => props.href && open(props.href)}
            >
              {props.children}
            </span>)
        },
        div(props) {
          if (props.className?.includes('alert')) {
            if (props.className.includes('alert-primary')) return (
              <div {...props}>
                <span className="icon-[ph--newspaper-clipping-bold] text-lg" />
                {props.children}
              </div>
            )
            if (props.className.includes('alert-info')) return (
              <div {...props}>
                <span className="icon-[ph--info-bold] text-lg" />
                {props.children}
              </div>
            )
            if (props.className.includes('alert-success')) return (
              <div {...props}>
                <span className="icon-[ph--check-circle-bold] text-lg" />
                {props.children}
              </div>
            )
            if (props.className.includes('alert-warning')) return (
              <div {...props}>
                <span className="icon-[ph--warning-bold] text-lg" />
                {props.children}
              </div>
            )
            if (props.className.includes('alert-error')) return (
              <div {...props}>
                <span className="icon-[ph--x-circle-bold] text-lg" />
                {props.children}
              </div>
            )
          }
          if (props.className?.includes('collapse'))
            return (
              <Collapse
                {...props}
                defaultOpen={props.className.includes('collapse-open')}
                className={props.className.replace('collapse', '')}
                title={props.title || '未输入标题'}
              />
            )
          return <div {...props} />
        },
        button(props) {
          return (
            <Button
              {...props}
              variant={props.className?.includes('primary')
                ? 'primary'
                : props.className?.includes('border')
                  ? 'border'
                  : undefined}
              onClick={() => props.id === 'refresh' && window.location.reload()}
            >
              {props.children}
            </Button>
          )
        },
      }}
      className={classNames(
        'prose dark:prose-invert max-w-[unset]',
        // normalize
        'prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0',
        'prose-p:m-0',
      )}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Home
