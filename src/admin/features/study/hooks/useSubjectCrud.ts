import { useState } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createSubject, updateSubject, deleteSubject, fetchSubjects } from '../store/study.slice';
import { useToast } from '../../../utils/ToastContext';
import type { IAdminSubject } from '../../../types';

export const useSubjectCrud = (loadSubjects: () => void) => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [subjectModal, setSubjectModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<IAdminSubject | null>(null);
  const [subjectForm, setSubjectForm] = useState({ name: '', icon: 'BookOpen', color: '#3273e6', description: '' });
  const [actionError, setActionError] = useState<string | null>(null);
  const [confirmDeleteSubject, setConfirmDeleteSubject] = useState<{ id: string; name: string } | null>(null);

  const openSubjectModal = (subject?: IAdminSubject) => {
    setActionError(null);
    if (subject) { setEditingSubject(subject); setSubjectForm({ name: subject.name, icon: subject.icon, color: subject.color, description: subject.description }); }
    else { setEditingSubject(null); setSubjectForm({ name: '', icon: 'BookOpen', color: '#3273e6', description: '' }); }
    setSubjectModal(true);
  };

  const saveSubject = async () => {
    setActionError(null);
    try {
      if (editingSubject) await dispatch(updateSubject({ id: editingSubject.id, data: subjectForm })).unwrap();
      else await dispatch(createSubject(subjectForm)).unwrap();
      showToast(editingSubject ? 'Subject updated' : 'Subject created', 'success');
      setSubjectModal(false);
      loadSubjects();
    } catch (e: any) { setActionError(typeof e === 'string' ? e : e?.message || 'Failed to save subject'); }
  };

  const handleDeleteSubject = (id: string, name: string) => {
    setConfirmDeleteSubject({ id, name });
  };

  const performDeleteSubject = async () => {
    if (!confirmDeleteSubject) return;
    await dispatch(deleteSubject(confirmDeleteSubject.id));
    showToast(`Subject "${confirmDeleteSubject.name}" deleted`, 'success');
    setConfirmDeleteSubject(null);
    loadSubjects();
  };

  return {
    subjectModal,
    setSubjectModal,
    editingSubject,
    subjectForm,
    setSubjectForm,
    actionError,
    setActionError,
    confirmDeleteSubject,
    setConfirmDeleteSubject,
    openSubjectModal,
    saveSubject,
    handleDeleteSubject,
    performDeleteSubject,
  };
};
