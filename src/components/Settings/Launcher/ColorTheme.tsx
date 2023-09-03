import { t } from 'i18next'
import { ChangeEvent } from 'react'
import { useStore } from '@nanostores/react'
import { configState } from '~/main'
import { setConfig } from '~/config'
import Title from '~/components/Base/Title'

const colors = [
  '#F53F3F',
  '#F77234',
  '#FF8729',
  '#F7BA1E',
  '#FADC19',
  '#9FDB1D',
  '#00B42A',
  '#14C9C9',
  '#3491FA',
  '#165DFF',
  '#722ED1',
  '#D91AD9',
  '#F5319D',
  '#86909c',
  '#000000',
  '#45F5A9',
]

const ColorTheme = () => {
  const config = useStore(configState)

  async function handleChangeColor(e: ChangeEvent<HTMLInputElement>) {
    const color = e.target.value
    const hexRegex = /^[0-9a-fA-F]+$/
    if (hexRegex.test(color) && color.length === 6) {
      await setConfig(prevConfig => ({
        ...prevConfig,
        colorTheme: `#${color}`,
      }))
      document.getElementById('root')?.style.setProperty('--primary', `#${color}`)
    }
  }

  return (
    <div className='mb-4'>
      <Title size="sm" className="mb-2">
        {t('settings.launcher.theme.label')}
      </Title>
      <div className='grid grid-cols-10 gap-2'>
        {colors.map((color, i) => (
          <div
            key={i}
            className='w-12 h-12 rounded-md cursor-pointer active:scale-95 duration-200'
            style={{
              backgroundColor: color,
              ...(color === config.colorTheme && { boxShadow: `0 4px 6px -1px ${color}40, 0 2px 4px -2px ${color}40` }),
            }}
            onClick={async () => {
              await setConfig(prevConfig => ({
                ...prevConfig,
                colorTheme: color,
              }))
              document.getElementById('root')?.style.setProperty('--primary', color)
            }}
          />
        ))}
        <div className='col-span-4 rounded-md border-2 border-border overflow-hidden flex'>
          <div className='h-full bg-border px-4 flex justify-center items-center'>
            <p className='text-2xl font-bold opacity-30'>#</p>
          </div>
          <input
            key={config.colorTheme}
            type="text"
            className='bg-transparent outline-none w-full px-4 text-2xl font-bold'
            defaultValue={config.colorTheme.slice(1, 7)}
            maxLength={6}
            onChange={handleChangeColor}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorTheme
