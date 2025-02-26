import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@global/store';

export const useTypedDispatch: () => AppDispatch = useDispatch;
