import { appWindow } from '@tauri-apps/api/window'

const Header = () => {
  return (
    <div
      data-tauri-drag-region
      className='w-full flex justify-end fixed top-0 right-0 z-[114514]'
    >
      <button
        className='h-8 w-12 flex justify-center items-center hover:bg-slate-500/10'
        onClick={() => appWindow.minimize()}
      >
        <span className='icon-[ph--minus-bold]' />
      </button>
      <button
        className='h-8 w-12 flex justify-center items-center hover:bg-red-500 dark:hover:bg-red-700 hover:text-white'
        onClick={() => appWindow.close()}
      >
        <span className='icon-[ph--x-bold]' />
      </button>
    </div>
  )
}

export default Header
