import { useMemo } from 'react';

import dayjsBase from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjsBase.extend(customParseFormat);
dayjsBase.extend(localizedFormat);
dayjsBase.extend(relativeTime);
dayjsBase.extend(utc);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
export const useDayjs = () => {
  return useMemo(() => dayjsBase, []);
};
