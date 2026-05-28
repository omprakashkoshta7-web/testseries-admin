import { useAdminSelector } from '../../../store/hooks';

export const useAdminStudyState = () => useAdminSelector((state: any) => state.study);

export { useFileUpload } from './useFileUpload';
export { useSubjectCrud } from './useSubjectCrud';
export { useMaterialCrud } from './useMaterialCrud';
