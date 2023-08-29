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
      </div>
    </RouteAnimate>
  )
}

export default Page
