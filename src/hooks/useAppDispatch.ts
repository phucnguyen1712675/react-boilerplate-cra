import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'types';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
