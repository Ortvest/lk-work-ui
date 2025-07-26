import React from 'react';

import { DataWrapper } from '@modules/EmployeesTable/layout/UserPreview/layout/DataWrapper';

import './style.css';

interface InfoRow {
  label: string;
  value: string;
}

interface InfoSectionProps {
  title: string;
  rows: InfoRow[];
  iconUrl: string;
}

export const InfoSection = ({ title, rows, iconUrl }: InfoSectionProps): React.ReactNode => {
  return (
    <DataWrapper>
      <header className="user-preview-contact-header">
        <h1 className="user-preview-contact-header-icon">
          <img src={iconUrl} alt="section-icon" />
          {title}
        </h1>
      </header>
      <main className="user-preview-contact-main">
        {rows.map((row, index) => (
          <div key={index} className="contact-row">
            <span className="contact-label">{row.label}:</span>
            <span className="contact-value">{row.value || '-'}</span>
          </div>
        ))}
      </main>
    </DataWrapper>
  );
};
