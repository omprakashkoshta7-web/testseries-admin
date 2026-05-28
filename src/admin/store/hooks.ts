import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import type { AdminRootState, AdminAppDispatch, adminStore } from './store';

export const useAdminDispatch = () => useDispatch<AdminAppDispatch>();
export const useAdminSelector: TypedUseSelectorHook<AdminRootState> = useSelector;
export const useAdminStore = () => useStore<typeof adminStore>();
