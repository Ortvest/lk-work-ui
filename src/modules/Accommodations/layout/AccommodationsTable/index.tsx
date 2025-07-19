import { ReactNode } from 'react';

import { AccommodationTableContent } from '@modules/Accommodations/layout/TableContent';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { useGetAllAccommodationsQuery } from '@global/api/accommodations/accommodation.api';

export const AccommodationsTable = (): ReactNode => {
  // eslint-disable-next-line no-empty-pattern
  const {} = useGetAllAccommodationsQuery(undefined);

  const accommodations = useTypedSelector((state) => state.accommodationReducer.accommodations);
  return <AccommodationTableContent accommodations={accommodations} />;
};
