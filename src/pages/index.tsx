import { Suspense } from 'react'
import PlayerCard from '../components/Index/PlayerCard'
import RouteAnimate from '../components/RouteAnimate'
import { User } from '../types/user'
import Home from '~/components/Index/Home'
import StartGame from '~/components/Index/StartGame'

const userData: User = {
  username: 'Cha_Shao',
  type: 'offline',
}

const Page = () => {
  return (
    <RouteAnimate className="grow h-full flex flex-col gap-2">
      <div className="grow pt-8 -mr-4 overflow-y-scroll overflow-x-hidden">
        <RouteAnimate className='pr-4'>
          <Suspense fallback={<></>}>
            <Home />
          </Suspense>
        </RouteAnimate>
      </div>
      <div className="shrink-0 flex justify-between mb-4">
        <PlayerCard {...userData} />
        <StartGame />
      </div>
    </RouteAnimate>
  )
}

export default Page
