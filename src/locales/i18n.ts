import i18n, { changeLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'
import yaml from 'js-yaml'
import configState from '../config'

export const setupLanguage = () => {
  const language = configState.get().language
  changeLanguage(language)
}

const locales = Object.fromEntries(
  Object.entries(import.meta.glob('./*.yml', { as: 'raw', eager: true }))
    .map(([path, value]) => [
      path.match(/([\w-]*)\.yml$/)?.[1],
      { translation: yaml.load(value) },
    ]),
)

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ...locales,
    },
    // lng: 'zh',
    fallbackLng: 'zh',
  })
