import React from 'react';

import { useTranslation } from 'react-i18next';

import { DataWrapper } from '@modules/EmployeesTable/layout/UserPreview/layout/DataWrapper';

import './style.css';

interface InfoRow {
  label?: string;
  labelKey?: string;
  value?: string;
}

interface InfoSectionProps {
  title?: string;
  titleKey?: string;
  rows: InfoRow[];
  iconUrl: string;
}

export const InfoSection = ({ title, titleKey, rows, iconUrl }: InfoSectionProps): React.ReactNode => {
  const { t } = useTranslation('employees-table');

  return (
    <DataWrapper>
      <header className="user-preview-contact-header">
        <h1 className="user-preview-contact-header-icon">
          <img src={iconUrl} alt={t('sectionIconAlt')} />
          {titleKey ? t(titleKey) : title}
        </h1>
      </header>
      <main className="user-preview-contact-main">
        {rows.map((row, index) => (
          <div key={index} className="contact-row">
            <span className="contact-label">{(row.labelKey ? t(row.labelKey) : row.label) + ':'}</span>
            <span className="contact-value">{row.value || t('notProvided')}</span>
          </div>
        ))}
      </main>
    </DataWrapper>
  );
};
