const parseLanguage = (lang: string) => {
  switch (lang) {
    case 'zh': return {
      label: '中文',
      symbol: '🇨🇳',
    }
    case 'en': return {
      label: 'English',
      symbol: '🇺🇸',
    }
  }
}

export default parseLanguage
