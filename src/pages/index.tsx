import { changeLanguage, t } from 'i18next'
import Button from '../components/Base/Button'
import PlayerCard from '../components/Index/PlayerCard'
import RouteAnimate from '../components/RouteAnimate'
import { User } from '../types/user'

const userData: User = {
  username: 'Cha_Shao',
  type: 'offline',
}

const Page = () => {
  return (
    <RouteAnimate className="flex-grow h-full flex flex-col gap-2">
      <div className="flex-grow">
        content
      </div>
      <div className="shrink-0 flex justify-between mb-4">
        <PlayerCard {...userData} />
        <Button
          size='xl'
          variant='primary'
          className='w-64'
          onClick={() => changeLanguage('en')}
        >
          {t('start_game')}
        </Button>
      </div>
    </RouteAnimate>
  )
}

export default Page
