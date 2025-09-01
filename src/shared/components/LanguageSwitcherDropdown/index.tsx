import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import './style.css';

import { availableLanguagesPromise } from '@global/i18n/languages';

export const LanguageSwitcherDropdown = (): React.ReactNode => {
  const { i18n } = useTranslation();
  const [availableLanguages, setAvailableLanguages] = useState<{ code: string; label: string }[]>([]);

  // @ts-ignore
  useEffect(() => {
    let alive = true;
    availableLanguagesPromise.then((langs) => alive && setAvailableLanguages(langs));
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      alive = false;
    };
  }, []);
  const changeLanguage = async (code: string): Promise<void> => {
    await i18n.changeLanguage(code);
  };

  return (
    <div className="lang-switch-dropdown">
      <select value={i18n.language} onChange={(e) => changeLanguage(e.target.value)} className="lang-switch-select">
        {availableLanguages.map((lang: { code: string; label: string }) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
