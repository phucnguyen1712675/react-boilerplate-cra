import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from 'types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
