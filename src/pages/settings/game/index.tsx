import Title from '../../../components/Base/Title'
import RouteAnimate from '../../../components/RouteAnimate'
import { t } from 'i18next'

const Page = () => {

  return (
    <RouteAnimate>
      <Title size="lg" className="mb-4">
        {t('settings.game.label')}
      </Title>
    </RouteAnimate>
  )
}

export default Page
