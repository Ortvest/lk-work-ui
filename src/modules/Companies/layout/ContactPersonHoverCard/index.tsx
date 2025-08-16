import React from 'react';
import { useTranslation } from 'react-i18next';

import './styles.css';

interface ContactPersonHoverCardProps {
  position: string;
  email: string;
  tel: string;
}

export const ContactPersonHoverCard = ({ position, email, tel }: ContactPersonHoverCardProps): React.ReactNode => {
  const { t } = useTranslation('companies');

  return (
    <div className="contact-hover-card">
      <div className="contact-hover-row">
        <span className="label">{t('cardContactPersonPosition')}:</span>
        <span className="value">{position}</span>
      </div>
      <div className="contact-hover-row">
        <span className="label">{t('cardContactPersonTel')}:</span>
        <span className="value">{tel}</span>
      </div>
      <div className="contact-hover-row">
        <span className="label">{t('cardContactPersonEmail')}:</span>
        <span className="value">{email}</span>
      </div>
    </div>
  );
};
