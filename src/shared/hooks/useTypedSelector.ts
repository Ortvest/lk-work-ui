import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '@global/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
