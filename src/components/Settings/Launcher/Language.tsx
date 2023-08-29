import { useTranslation } from 'react-i18next'
import parseLanguage from '../../../utils/parseLanguage'
import Button from '../../Base/Button'
import Title from '../../Base/Title'
import i18next from 'i18next'
import { setConfig } from '../../../config'

const Language = () => {
  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const supportedLanguages = Object.keys(i18next.services.resourceStore.data)

  return (
    <div className='mb-4'>
      <Title size="sm" className="mb-2">
        {t('settings.launcher.language')}
      </Title>
      <div className="grid gap-2">
        {supportedLanguages.map((lang, i) => (
          <Button
            key={i}
            variant={lang === language ? 'primary' : undefined}
            onClick={async () => {
              await setConfig(prevConfig => ({
                ...prevConfig,
                language: lang,
              }))
              changeLanguage(lang)
              window.location.reload()
            }}
          >
            <div className='py-2 flex justify-between items-center'>
              <div>
                <span className='mr-2'>{parseLanguage(lang)?.symbol}</span>
                <span>{parseLanguage(lang)?.label}</span>
              </div>
              {lang === language && <span className="icon-[ph--check-bold]" />}
            </div>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Language
