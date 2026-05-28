import { useState } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createAdminSubject, fetchAdminSubjects } from '../../subjects/store/subjects.slice';
import { useToast } from '../../../utils/ToastContext';

const emptySubjectForm = { name: '', description: '', icon: 'BookOpen', color: '#3273e6', order: 0, isActive: true };

const parseBulkLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, description = ''] = line.split('|').map((part) => part.trim());
      return { name, description };
    });

export const useSubjectCrud = (onError?: (err: string | null) => void, selectedCategoryId?: string) => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [subjectForm, setSubjectForm] = useState(emptySubjectForm);
  const [bulkSubjectsText, setBulkSubjectsText] = useState('');

  const handleCreateSubject = async () => {
    if (!subjectForm.name.trim()) { onError?.('Subject name is required'); return; }
    if (!selectedCategoryId) { onError?.('This test is not linked with an exam category'); return; }
    try {
      await dispatch(createAdminSubject({ ...subjectForm, categoryId: selectedCategoryId })).unwrap();
      await dispatch(fetchAdminSubjects()).unwrap();
      setSubjectForm(emptySubjectForm);
      onError?.(null);
      showToast('Subject added', 'success');
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add subject');
    }
  };

  const handleBulkCreateSubjects = async () => {
    if (!selectedCategoryId) { onError?.('This test is not linked with an exam category'); return; }
    const rows = parseBulkLines(bulkSubjectsText);
    if (!rows.length) { onError?.('Add at least one subject line'); return; }
    try {
      await Promise.all(rows.map((row, index) => dispatch(createAdminSubject({
        ...emptySubjectForm,
        name: row.name,
        description: row.description,
        categoryId: selectedCategoryId,
        order: index,
      })).unwrap()));
      await dispatch(fetchAdminSubjects()).unwrap();
      setBulkSubjectsText('');
      onError?.(null);
      showToast(`${rows.length} subjects added`, 'success');
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add subjects');
    }
  };

  const readTextFile = (file: File, onLoad: (text: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.onerror = () => onError?.('Could not read uploaded file');
    reader.readAsText(file);
  };

  const resetSubjectForms = () => {
    setSubjectForm(emptySubjectForm);
    setBulkSubjectsText('');
  };

  return {
    subjectForm,
    setSubjectForm,
    bulkSubjectsText,
    setBulkSubjectsText,
    handleCreateSubject,
    handleBulkCreateSubjects,
    readTextFile,
    resetSubjectForms,
  };
};
