import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import Title from '~/components/Base/Title'
import Button from '~/components/Base/Button'
import { setConfig } from '~/config'
import parseLanguage from '~/utils/parseLanguage'

const Language = () => {
  const { t, i18n: { changeLanguage, language } } = useTranslation()
  const supportedLanguages = Object.keys(i18next.services.resourceStore.data)

  return (
    <div className='mb-4'>
      <Title size="sm" className="mb-2">
        {t('settings.launcher.language.label')}
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
              await changeLanguage(lang)
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
