import { ReactNode } from 'react';

import { CompanyTableContent } from '@modules/Companies/layout/TableContent';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { useGetAllWorkCompaniesQuery } from '@global/api/work-company/work-company.api';
import { OpenedPopupType } from '@pages/Accommodations';

interface AccommodationsTableProps {
  setOpenedPopupType: (type: OpenedPopupType) => void;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const CompaniesTable = ({ setOpenedPopupType, setIsOpenedModal }: AccommodationsTableProps): ReactNode => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useGetAllWorkCompaniesQuery(undefined);

  const companies = useTypedSelector((state) => state.workCompanyReducer.workCompanies);
  return (
    <CompanyTableContent
      setIsOpenedModal={setIsOpenedModal}
      setOpenedPopupType={setOpenedPopupType}
      companies={companies}
    />
  );
};
