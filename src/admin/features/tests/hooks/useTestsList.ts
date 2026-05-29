import { useCallback, useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchAdminTests, createTest, updateTest, deleteTest, duplicateTest, bulkCreateTests } from '../store/tests.slice';
import { selectAdminTests, selectAdminTestsLoading, selectTestsPagination } from '../store/tests.selectors';
import type { ITest, ITestForm } from '../../../types';
import { useToast } from '../../../utils/ToastContext';

const emptyForm: ITestForm = {
  title: '',
  description: '',
  category: '',
  subject: '',
  testType: 'subject',
  class: 'all',
  chapter: '',
  difficulty: 'medium',
  questionsCount: 0,
  duration: 60,
  passingScore: 40,
  totalPoints: 100,
  status: 'draft',
  isPremium: false,
  price: 0,
  originalPrice: 0,
  badge: { text: '', color: '' },
  sections: [],
  activeFrom: '',
  activeUntil: '',
};

export const useTestsList = (onError?: (err: string | null) => void) => {
  const dispatch = useAdminDispatch();
  const tests = useAdminSelector(selectAdminTests);
  const loading = useAdminSelector(selectAdminTestsLoading);
  const { totalPages, currentPage, totalTests } = useAdminSelector(selectTestsPagination);
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [testType, setTestType] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<ITest | null>(null);
  const [form, setForm] = useState<ITestForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; title: string } | null>(null);

  const loadTests = useCallback(() => {
    dispatch(fetchAdminTests({ search, category, testType, status: statusFilter, page, limit: 12 }));
  }, [dispatch, search, category, testType, statusFilter, page]);

  useEffect(() => { loadTests(); }, [loadTests]);
  useEffect(() => { setPage(1); }, [search, category, testType, statusFilter]);

  const openCreateModal = () => {
    setEditingTest(null);
    setForm(emptyForm);
    onError?.(null);
    setModalOpen(true);
  };

  const openEditModal = (test: ITest) => {
    setEditingTest(test);
    setForm({
      title: test.title,
      description: test.description,
      category: test.category,
      subject: test.subject || test.category,
      testType: test.testType || 'subject',
      class: test.class || 'all',
      chapter: test.chapter || '',
      difficulty: test.difficulty,
      questionsCount: test.questionsCount,
      duration: test.duration,
      passingScore: test.passingScore,
      totalPoints: test.totalPoints,
      status: test.status as 'published' | 'draft',
      isPremium: test.isPremium,
      price: test.price ?? 0,
      originalPrice: test.originalPrice ?? 0,
      badge: test.badge || { text: '', color: '' },
      sections: test.sections || [],
      scheduledAt: test.scheduledAt ? test.scheduledAt.slice(0, 16) : '',
      activeFrom: test.activeFrom ? test.activeFrom.slice(0, 16) : '',
      activeUntil: test.activeUntil ? test.activeUntil.slice(0, 16) : '',
    });
    onError?.(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    onError?.(null);
    if (!form.title.trim()) {
      onError?.('Test title is required');
      return;
    }
    if (!form.category) {
      onError?.('Please select an exam');
      return;
    }
    if (!form.subject) {
      onError?.('Please select a subject linked with this exam');
      return;
    }
    if (form.testType === 'chapter' && !form.chapter.trim()) {
      onError?.('Chapter / Topic is required for chapter-wise tests');
      return;
    }
    try {
      if (editingTest) {
        await dispatch(updateTest({ id: editingTest.id, data: form })).unwrap();
      } else {
        await dispatch(createTest(form)).unwrap();
      }
      setModalOpen(false);
      showToast(editingTest ? 'Test updated successfully' : 'Test created successfully', 'success');
      loadTests();
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Operation failed');
    }
  };

  const handleBulkCreate = async (items: ITestForm[]) => {
    onError?.(null);
    try {
      const result = await dispatch(bulkCreateTests(items)).unwrap();
      showToast(`${result.count} tests created successfully`, 'success');
      return result.count;
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Bulk create failed');
      throw err;
    }
  };

  const handleDelete = (id: string, title: string) => {
    setConfirmDelete({ id, title });
  };

  const handleDuplicate = (test: ITest) => {
    dispatch(duplicateTest(test.id));
    showToast('Test duplicated', 'success');
  };

  const handleConfirmDelete = () => {
    if (!confirmDelete) return;
    dispatch(deleteTest(confirmDelete.id));
    showToast(`Test "${confirmDelete.title}" deleted successfully`, 'success');
    setConfirmDelete(null);
  };

  return {
    tests,
    loading,
    totalPages,
    currentPage,
    totalTests,
    search,
    setSearch,
    category,
    setCategory,
    testType,
    setTestType,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    modalOpen,
    setModalOpen,
    editingTest,
    form,
    setForm,
    confirmDelete,
    setConfirmDelete,
    loadTests,
    openCreateModal,
    openEditModal,
    handleSave,
    handleBulkCreate,
    handleDelete,
    handleDuplicate,
    handleConfirmDelete,
  };
};
