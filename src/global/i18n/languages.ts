export const availableLanguagesPromise = fetch('/locales/languages.json')
  .then(res => res.json())
  .then((langs: string[]) => langs.map(code => ({ code, label: code.toUpperCase() })));