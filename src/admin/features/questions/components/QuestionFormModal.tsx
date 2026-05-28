import React from 'react';
import { Button, Input, Select, Modal, Textarea } from '@shared/components';
import type { IQuestion, IExamCategory, IAdminSubject, ITopic, ITest } from '../../../types';
import type { QuestionForm } from '../constants';
import { QuestionFormErrors } from './QuestionFormErrors';
import { QuestionOptionsSection } from './QuestionOptionsSection';
import { QuestionMetaSection } from './QuestionMetaSection';
import { QuestionCategorySection } from './QuestionCategorySection';
import { useQuestionForm } from './useQuestionForm';

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingQuestion: IQuestion | null;
  form: QuestionForm;
  onFormChange: (form: QuestionForm) => void;
  formErrors: string[];
  onSave: () => void;
  tests: ITest[];
  categories: IExamCategory[];
  filteredSubjectsForForm: IAdminSubject[];
  filteredTopicsForForm: ITopic[];
}

const QuestionFormModal: React.FC<QuestionFormModalProps> = ({
  isOpen, onClose, editingQuestion, form, onFormChange, formErrors, onSave,
  tests, categories, filteredSubjectsForForm, filteredTopicsForForm,
}) => {
  const { addOption, removeOption, updateOption, updateField } = useQuestionForm(form, onFormChange);
  const showOptions = form.type === 'mcq' || form.type === 'single' || form.type === 'multiple';
  const showNumberAnswer = false; // integer type not supported in current form

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingQuestion ? 'Edit Question' : 'Create Question'} size="lg"
      footer={<div className="flex gap-3"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button onClick={onSave}>{editingQuestion ? 'Update' : 'Create'}</Button></div>}
    >
      <div className="space-y-4">
        <QuestionFormErrors errors={formErrors} />

        <Textarea label="Question Text" value={form.text} onChange={(e) => updateField('text', e.target.value)} />

        <Select label="Test" value={form.testId} onChange={(e) => updateField('testId', e.target.value)}
          options={[{ value: '', label: 'Select Test' }, ...tests.map((t: ITest) => ({ value: t.id, label: `${t.title} (${t.category})` }))]} />

        {showOptions && (
          <QuestionOptionsSection options={form.options} onAddOption={addOption} onRemoveOption={removeOption} onOptionChange={updateOption} />
        )}

        <QuestionMetaSection type={form.type} difficulty={form.difficulty}
          onTypeChange={(type) => updateField('type', type)}
          onDifficultyChange={(difficulty) => updateField('difficulty', difficulty)} />

        <QuestionCategorySection category={form.category} subject={form.subject} topic={form.topic}
          categories={categories} filteredSubjects={filteredSubjectsForForm} filteredTopics={filteredTopicsForForm}
          onCategoryChange={(category) => { onFormChange({ ...form, category, subject: '', topic: '' }); }}
          onSubjectChange={(subject) => { onFormChange({ ...form, subject, topic: '' }); }}
          onTopicChange={(topic) => updateField('topic', topic)} />

        <Input label="Section / Subject Name (e.g., Physics, Chemistry)" 
          value={form.section || form.sectionName || ''} 
          onChange={(e) => updateField('section', e.target.value)}
          placeholder="Physics, Chemistry, Mathematics, etc." />

        {showNumberAnswer ? (
          <Input label="Correct Answer (number)" type="number" value={form.correctAnswer} onChange={(e) => updateField('correctAnswer', String(Number(e.currentTarget.value) || 0))} />
        ) : (
          <Input label="Correct Answer" value={form.correctAnswer} onChange={(e) => updateField('correctAnswer', e.target.value)}
            placeholder={form.type === 'multiple' ? 'Comma separated labels' : 'Option label or text'} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Marks" type="number" value={form.marks || ''} onChange={(e) => updateField('marks', Number(e.target.value))} />
          <Input label="Negative Marks" type="number" value={form.negativeMarks || ''} onChange={(e) => updateField('negativeMarks', Number(e.target.value))} />
        </div>

        <Textarea label="Explanation" value={form.explanation} onChange={(e) => updateField('explanation', e.target.value)} />

        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={form.isActive} onChange={(e) => updateField('isActive', e.target.checked)} />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-tb-blue" />
          </label>
          <span className="text-sm font-medium text-tb-navy dark:text-white">Active</span>
        </div>
      </div>
    </Modal>
  );
};

export default QuestionFormModal;
