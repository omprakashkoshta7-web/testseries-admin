import { useState, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createQuestion, updateQuestion, deleteQuestion, bulkUploadQuestions } from '../store/questions.slice';
import { useToast } from '../../../utils/ToastContext';
import { emptyForm } from '../constants';
import type { QuestionForm } from '../constants';
import type { IQuestion } from '../../../types';

export const useQuestionForm = () => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [bulkJson, setBulkJson] = useState('');
  const [editingQuestion, setEditingQuestion] = useState<IQuestion | null>(null);
  const [form, setForm] = useState<QuestionForm>(emptyForm);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; name: string; type: string } | null>(null);

  const openCreateModal = useCallback(() => {
    setEditingQuestion(null);
    setForm(emptyForm);
    setFormErrors([]);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((q: IQuestion) => {
    setEditingQuestion(q);
    const topicId = q.topic || '';
    setForm({
      text: q.text,
      options: q.options.length > 0 ? q.options : [{ label: 'A', text: '' }],
      correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
      type: q.type,
      testId: typeof q.testId === 'object' ? (q.testId as any)?._id || '' : q.testId || '',
      category: q.category,
      subject: q.subject,
      topic: topicId,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      explanation: q.explanation || '',
      isActive: q.isActive,
    });
    setFormErrors([]);
    setModalOpen(true);
  }, []);

  const handleSave = useCallback(async () => {
    const errors: string[] = [];
    if (!form.text.trim()) errors.push('Question text is required');
    if (!form.correctAnswer.trim() && form.type !== 'subjective' && form.type !== 'descriptive') {
      errors.push('Correct answer is required');
    }
    setFormErrors(errors);
    if (errors.length > 0) return;

    const payload: Record<string, any> = {
      text: form.text,
      options: form.type === 'mcq' || form.type === 'single' || form.type === 'multiple' ? form.options : [],
      correctAnswer: form.type === 'multiple'
        ? form.correctAnswer.split(',').map((s) => s.trim())
        : form.correctAnswer,
      type: form.type,
      testId: form.testId || undefined,
      category: form.category,
      subject: form.subject,
      topic: form.topic,
      difficulty: form.difficulty,
      marks: Number(form.marks),
      negativeMarks: Number(form.negativeMarks),
      explanation: form.explanation,
      isActive: form.isActive,
    };

    try {
      if (editingQuestion) {
        await dispatch(updateQuestion({ id: editingQuestion._id, data: payload })).unwrap();
      } else {
        await dispatch(createQuestion(payload)).unwrap();
      }
      showToast('Question ' + (editingQuestion ? 'updated' : 'created') + ' successfully', 'success');
      setModalOpen(false);
    } catch (err: any) {
      showToast(err?.message || 'Failed to save question', 'error');
    }
  }, [dispatch, editingQuestion, form, showToast]);

  const handleDelete = useCallback((id: string, text: string) => {
    setConfirmDelete({ id, name: text, type: 'question' });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!confirmDelete) return;
    try {
      await dispatch(deleteQuestion(confirmDelete.id)).unwrap();
      showToast('Question "' + confirmDelete.name.slice(0, 60) + '..." deleted successfully', 'success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete question', 'error');
    }
    setConfirmDelete(null);
  }, [confirmDelete, dispatch, showToast]);

  const handleBulkUpload = useCallback(async () => {
    try {
      const parsed = JSON.parse(bulkJson);
      if (!Array.isArray(parsed)) throw new Error('Payload must be a JSON array');
      await dispatch(bulkUploadQuestions({ questions: parsed })).unwrap();
      showToast('Questions uploaded successfully', 'success');
      setBulkModalOpen(false);
      setBulkJson('');
    } catch (e: any) {
      showToast(e?.message || 'Invalid JSON format', 'error');
    }
  }, [bulkJson, dispatch, showToast]);

  return {
    modalOpen, setModalOpen,
    bulkModalOpen, setBulkModalOpen,
    bulkJson, setBulkJson,
    editingQuestion,
    form, setForm,
    formErrors,
    confirmDelete, setConfirmDelete,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
    handleConfirmDelete,
    handleBulkUpload,
  };
};
