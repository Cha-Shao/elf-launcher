import { t } from 'i18next'
import Button from '../Base/Button'

const StartGame = () => {
  return (
    <div className='flex gap-1'>
      <Button
        variant='primary'
        className='rounded-r-none'
        onClick={() => { }}
      >
        <div className='flex justify-center items-center'>
          <span className="icon-[ph--caret-up-fill] text-lg" />
        </div>
      </Button>
      <Button
        size='xl'
        variant='primary'
        className='w-64 rounded-l-none'
        onClick={() => { }}
      >
        {t('start_game')}
      </Button>
    </div>
  )
}

export default StartGame
