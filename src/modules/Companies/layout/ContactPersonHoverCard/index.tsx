import React from 'react';

import './styles.css';

interface ContactPersonHoverCardProps {
  position: string;
  email: string;
  tel: string;
}

export const ContactPersonHoverCard = ({ position, email, tel }: ContactPersonHoverCardProps): React.ReactNode => {
  return (
    <div className="contact-hover-card">
      <div className="contact-hover-row">
        <span className="label">Position:</span>
        <span className="value">{position}</span>
      </div>
      <div className="contact-hover-row">
        <span className="label">Tel:</span>
        <span className="value">{tel}</span>
      </div>
      <div className="contact-hover-row">
        <span className="label">Email:</span>
        <span className="value">{email}</span>
      </div>
    </div>
  );
};
