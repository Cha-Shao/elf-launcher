import { User } from '~/types/user'
import Card from '../Base/Card'
import Title from '../Base/Title'
import { t } from 'i18next'

const PlayerCard = (user: User) => {
  return (
    <Card size="sm" className="min-w-[20rem]">
      <div className="flex items-center">
        <img
          src={`https://mineskin.eu/helm/${user.username}`}
          alt=""
          className="h-16 w-16 rounded-md mr-2 border border-border"
        />
        <div>
          <Title>
            {user.username}
          </Title>
          <p className="opacity-50">{t(`user.type.${user.type}`)}</p>
        </div>
      </div>
    </Card>
  )
}

export default PlayerCard
