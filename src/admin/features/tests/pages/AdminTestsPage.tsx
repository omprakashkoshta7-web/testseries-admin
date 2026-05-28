import React, { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from '@shared/components';
import { Plus, Upload, Layers } from '@shared/icons';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { TestList, TestFormModal, TestContentPanel, TestFilters, TestBulkCreateModal } from '../components';
import { useTestsList, useTestContent, useSubjectCrud, useTopicCrud, useQuestionCrud } from '../hooks';
import ConfirmModal from '../../../components/ConfirmModal';
import { fetchAdminExams } from '../../exams/store/exams.slice';
import { fetchAdminSubjects } from '../../subjects/store/subjects.slice';
import { updateTest } from '../store/tests.slice';
import { ITest } from '../../../types';

const AdminTestsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const navigate = useNavigate();
  const [actionError, setActionError] = useState<string | null>(null);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const exams = useAdminSelector((s: any) => s.adminExams.items);
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);

  useEffect(() => {
    dispatch(fetchAdminExams(undefined));
    dispatch(fetchAdminSubjects());
  }, [dispatch]);

  const {
    tests, loading, totalPages, currentPage, totalTests,
    search, setSearch, category, setCategory, testType, setTestType, statusFilter, setStatusFilter,
    page, setPage, modalOpen, setModalOpen, editingTest, form, setForm,
    confirmDelete, setConfirmDelete, openCreateModal, openEditModal,
    handleSave, handleBulkCreate, handleDelete, handleDuplicate, handleConfirmDelete, loadTests,
  } = useTestsList(setActionError);

  const testContent = useTestContent();
  const subjectCrud = useSubjectCrud(setActionError, testContent.selectedCategoryId);
  const topicCrud = useTopicCrud(setActionError);
  const questionCrud = useQuestionCrud(setActionError, testContent.contentTest, testContent.selectedCategoryId, loadTests);

  const openContentModal = (test: any) => {
    testContent.openContentModal(test);
    subjectCrud.resetSubjectForms();
    topicCrud.resetTopicForms();
    questionCrud.resetQuestionForms();
    setActionError(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Tests"
        subtitle={`${totalTests} total tests`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => navigate('/admin/exams')}><Layers className="w-4 h-4" />Exams</Button>
            <DeleteAllButton resource="tests" displayName="Tests" />
            <Button variant="secondary" onClick={() => setBulkModalOpen(true)}><Upload className="w-4 h-4" />Bulk Create</Button>
            <Button onClick={openCreateModal}><Plus className="w-4 h-4" />Create Test</Button>
          </div>
        }
      />
      <TestFilters search={search} onSearchChange={setSearch} category={category} onCategoryChange={setCategory} testType={testType} onTestTypeChange={setTestType} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} exams={exams} />
      <TestList tests={tests} loading={loading} totalPages={totalPages} currentPage={currentPage} onPageChange={setPage} onEdit={openEditModal} onDelete={(test) => handleDelete(test.id, test.title)} onContent={openContentModal} onDuplicate={handleDuplicate} emptyCreateHandler={openCreateModal} />
      <TestFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} editingTest={editingTest} form={form} onSubmit={handleSave} onFormChange={setForm} exams={exams} subjects={subjects} actionError={actionError} />
      <TestBulkCreateModal isOpen={bulkModalOpen} onClose={() => setBulkModalOpen(false)} onSubmit={handleBulkCreate} />
      <Modal isOpen={!!testContent.contentTest} onClose={() => testContent.setContentTest(null)} title={testContent.contentTest ? `Manage Content: ${testContent.contentTest.title}` : 'Manage Content'} size="2xl">
        <TestContentPanel contentTest={testContent.contentTest} actionError={actionError} subjectCrud={subjectCrud} topicCrud={topicCrud} questionCrud={questionCrud} contentSubjects={testContent.contentSubjects} contentTopics={questionCrud.contentTopics} bulkQuestionTopics={questionCrud.bulkQuestionTopics} onAddSection={async (section) => {
          if (!testContent.contentTest) return;
          const testId = testContent.contentTest.id;
          const sec = { name: section.name, questionCount: section.questionCount || 0, subject: section.subject || '' };
          const currentSections = testContent.contentTest.sections || [];
          const updatedSections = [...currentSections, sec];
          await dispatch(updateTest({ id: testId, data: { sections: updatedSections } as any })).unwrap();
          testContent.setContentTest({ ...testContent.contentTest, sections: updatedSections });
        }} />
      </Modal>
      <ConfirmModal isOpen={!!confirmDelete} title="Delete Test" message={confirmDelete ? `Are you sure you want to delete test "${confirmDelete.title}"?` : ''} confirmLabel="Delete" onConfirm={handleConfirmDelete} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default AdminTestsPage;
