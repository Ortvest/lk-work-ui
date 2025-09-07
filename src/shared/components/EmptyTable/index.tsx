import { ReactNode } from 'react';

import { useTranslation } from "react-i18next";

import "./styles.css";

interface EmptyTableScreenProps {
  onAddClick: () => void;
}

export default function EmptyTableScreen({ onAddClick }: EmptyTableScreenProps): ReactNode {
  const { t } = useTranslation("common");

  return (
    <div className="empty-table-wrapper">
      <div className="empty-table-card">
        <h2 className="empty-table-title">{t("emptyTable.title")}</h2>
        <p className="empty-table-description">{t("emptyTable.description")}</p>
        <button className="empty-table-button" onClick={onAddClick}>
          + {t("emptyTable.addButton")}
        </button>
      </div>
    </div>
  );
}
