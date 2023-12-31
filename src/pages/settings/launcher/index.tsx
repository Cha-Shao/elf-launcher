import { t } from 'i18next'
import Title from '../../../components/Base/Title'
import RouteAnimate from '../../../components/RouteAnimate'
import Language from '../../../components/Settings/Launcher/Language'
import ColorTheme from '../../../components/Settings/Launcher/ColorTheme'
import CustomHome from '~/components/Settings/Launcher/CustomHome'

const Page = () => {

  return (
    <RouteAnimate>
      <Title size="lg" className="mb-4">
        {t('settings.launcher.label')}
      </Title>
      <Language />
      <ColorTheme />
      <CustomHome />
    </RouteAnimate>
  )
}

export default Page
