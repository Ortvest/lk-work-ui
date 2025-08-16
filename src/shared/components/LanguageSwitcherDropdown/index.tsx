import React from 'react';

import { useTranslation } from 'react-i18next';

import { availableLanguages } from '@global/i18n/languages';

export const LanguageSwitcherDropdown = (): React.ReactNode => {
  const { i18n } = useTranslation();

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
