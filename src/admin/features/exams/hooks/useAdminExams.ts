import { useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminExams, createAdminExam, updateAdminExam, deleteAdminExam } from '../store/exams.slice';
import type { IAdminExam } from '../../../types';
import { useToast } from '../../../utils/ToastContext';

export const useAdminExams = () => {
  const dispatch = useAdminDispatch();
  const { items, loading, error } = useAdminSelector((s: any) => s.adminExams);
  const { showToast } = useToast();

  const fetchAll = useCallback((params?: any) => dispatch(fetchAdminExams(params)), [dispatch]);

  const create = useCallback(async (form: Partial<IAdminExam>) => {
    const res = await dispatch(createAdminExam(form));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Exam created', 'success');
    } else {
      showToast(res.payload as string, 'error');
    }
    return res;
  }, [dispatch, showToast]);

  const update = useCallback(async (id: string, form: Partial<IAdminExam>) => {
    const res = await dispatch(updateAdminExam({ id, form }));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Exam updated', 'success');
    } else {
      showToast(res.payload as string, 'error');
    }
    return res;
  }, [dispatch, showToast]);

  const remove = useCallback(async (id: string) => {
    const res = await dispatch(deleteAdminExam(id));
    if (res.meta.requestStatus === 'fulfilled') {
      showToast('Exam deleted', 'success');
    } else {
      showToast(res.payload as string, 'error');
    }
    return res;
  }, [dispatch, showToast]);

  return { items, loading, error, fetchAll, create, update, remove };
};

export default useAdminExams;
