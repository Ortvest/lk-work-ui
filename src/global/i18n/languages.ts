export const availableLanguages = await fetch('/locales/languages.json')
  .then((res) => res.json())
  .then((langs) => langs.map((code: string) => ({ code, label: code.toUpperCase() })));
