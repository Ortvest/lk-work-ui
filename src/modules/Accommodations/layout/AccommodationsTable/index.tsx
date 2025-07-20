import { ReactNode } from 'react';

import { AccommodationTableContent } from '@modules/Accommodations/layout/TableContent';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { useGetAllAccommodationsQuery } from '@global/api/accommodations/accommodation.api';
import { OpenedPopupType } from "@pages/Accommodations";

interface AccommodationsTableProps {
  setOpenedPopupType: (type: OpenedPopupType) => void;
  setIsOpenedModal: (isOpen: boolean) => void;
}
export const AccommodationsTable = ({setOpenedPopupType, setIsOpenedModal}: AccommodationsTableProps): ReactNode => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useGetAllAccommodationsQuery(undefined);

  const accommodations = useTypedSelector((state) => state.accommodationReducer.accommodations);
  return <AccommodationTableContent  setIsOpenedModal={setIsOpenedModal} setOpenedPopupType={setOpenedPopupType} accommodations={accommodations} />;
};
