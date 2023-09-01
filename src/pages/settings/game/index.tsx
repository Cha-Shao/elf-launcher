import Title from '../../../components/Base/Title'
import RouteAnimate from '../../../components/RouteAnimate'
import { t } from 'i18next'
import Java from '../../../components/Settings/Game/Java'
import Ram from '~/components/Settings/Game/Ram'
import Isolate from '~/components/Settings/Game/Isolate'

const Page = () => {
  return (
    <RouteAnimate>
      <Title size="lg" className="mb-4">
        {t('settings.game.label')}
      </Title>
      <Isolate />
      <Java />
      <Ram />
    </RouteAnimate>
  )
}

export default Page
