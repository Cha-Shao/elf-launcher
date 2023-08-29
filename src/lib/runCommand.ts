import { Command } from '@tauri-apps/api/shell'

const runCommand = async (command: string, args: string[] = []) => {
  const process = await new Command(
    'cmd', [
    '/c', command, ...args,
  ], {
    ...(window.navigator.language.includes('zh') && { encoding: 'gbk' }),
  })
    .execute()
  return process.stdout
}

export default runCommand
