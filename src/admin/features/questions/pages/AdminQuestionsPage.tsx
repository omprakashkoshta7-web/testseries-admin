import React, { useEffect, useMemo } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchExamCategories } from '../../exam-categories/store/examCategories.slice';
import { fetchAdminSubjects } from '../../subjects/store/subjects.slice';
import { fetchTopics } from '../../topics/store/topics.slice';
import { fetchAdminTests } from '../../tests/store/tests.slice';
import { useAdminQuestionsState, useQuestionFilters, useQuestionForm } from '../hooks';
import { Button } from '@shared/components';
import ConfirmModal from '../../../components/ConfirmModal';
import DeleteAllButton from '../../../components/DeleteAllButton';
import PageHeader from '../../../components/PageHeader';
import { Plus, Upload } from '@shared/icons';
import type { IAdminSubject, ITopic } from '../../../types';
import { typeFilterOptions } from '../constants';
import { QuestionFilters, QuestionFormModal, QuestionBulkUpload, QuestionsTable } from '../components';

const AdminQuestionsPage: React.FC = () => {
  const dispatch = useAdminDispatch();
  const { questions, loading, totalPages, currentPage, totalQuestions } = useAdminQuestionsState();
  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);
  const topics = useAdminSelector((s: any) => s.topics.items);
  const tests = useAdminSelector((s: any) => s.tests.tests);

  const filters = useQuestionFilters();
  const form = useQuestionForm();

  const filteredSubjectsForForm = useMemo(() => subjects.filter((s: IAdminSubject) =>
    !form.form.category || (typeof s.categoryId === 'object' && s.categoryId?._id === form.form.category) || s.categoryId === form.form.category
  ), [subjects, form.form.category]);

  const filteredTopicsForForm = useMemo(() => topics.filter((t: ITopic) => {
    const subjectId = typeof t.subjectId === 'object' ? t.subjectId._id : t.subjectId;
    return !form.form.subject || subjectId === form.form.subject;
  }), [topics, form.form.subject]);

  useEffect(() => {
    dispatch(fetchExamCategories());
    dispatch(fetchAdminSubjects());
    dispatch(fetchTopics(undefined));
    dispatch(fetchAdminTests({ page: 1, limit: 200 }));
  }, [dispatch]);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Questions" subtitle={`${totalQuestions} total questions`}
        actions={<div className="flex gap-3"><DeleteAllButton resource="questions" displayName="Questions" /><Button variant="ghost" onClick={() => form.setBulkModalOpen(true)}><Upload className="w-4 h-4" />Bulk Upload</Button><Button onClick={form.openCreateModal}><Plus className="w-4 h-4" />Create Question</Button></div>} />

      <QuestionFilters search={filters.search} onSearchChange={filters.setSearch}
        filterTestId={filters.filterTestId} onFilterTestIdChange={filters.setFilterTestId}
        filterCategory={filters.filterCategory} onFilterCategoryChange={(value) => { filters.setFilterCategory(value); filters.setFilterSubject(''); }}
        filterSubject={filters.filterSubject} onFilterSubjectChange={filters.setFilterSubject}
        typeFilter={filters.typeFilter} onTypeFilterChange={filters.setTypeFilter}
        tests={tests} categories={categories}
        filteredSubjects={subjects.filter((s: IAdminSubject) => !filters.filterCategory || (typeof s.categoryId === 'object' && s.categoryId?._id === filters.filterCategory) || s.categoryId === filters.filterCategory)}
        typeFilterOptions={typeFilterOptions} />

      <QuestionsTable questions={questions} loading={loading} subjects={subjects}
        totalPages={totalPages} currentPage={currentPage}
        onEdit={form.openEditModal} onDelete={form.handleDelete}
        onPageChange={filters.setPage} onCreateClick={form.openCreateModal} />

      <QuestionFormModal isOpen={form.modalOpen} onClose={() => form.setModalOpen(false)}
        editingQuestion={form.editingQuestion} form={form.form} onFormChange={form.setForm}
        formErrors={form.formErrors} onSave={form.handleSave}
        tests={tests} categories={categories}
        filteredSubjectsForForm={filteredSubjectsForForm} filteredTopicsForForm={filteredTopicsForForm} />

      <QuestionBulkUpload isOpen={form.bulkModalOpen} onClose={() => form.setBulkModalOpen(false)}
        bulkJson={form.bulkJson} onBulkJsonChange={form.setBulkJson} onUpload={form.handleBulkUpload} />

      <ConfirmModal isOpen={form.confirmDelete !== null} onCancel={() => form.setConfirmDelete(null)}
        onConfirm={form.handleConfirmDelete} title="Delete Question"
        message={'Are you sure you want to delete "' + (form.confirmDelete?.name || '').slice(0, 60) + '..."? This action cannot be undone.'} />
    </div>
  );
};

export default AdminQuestionsPage;
