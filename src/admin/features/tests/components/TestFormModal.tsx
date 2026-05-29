import React, { useState } from 'react';
import type { ITest, ITestForm, IAdminExam } from '../../../types';
import type { IAdminSubject } from '../../../types/adminSubjects';
import { Badge, Button, Input, Select, Modal, Textarea } from '@shared/components';
import { AlertCircle, BookOpen, Crown, FileText, Layers, Plus, Sparkles } from '@shared/icons';

const badgeColorMap: Record<string, string> = {
  red: '#ef4444', orange: '#f97316', amber: '#f59e0b', green: '#22c55e',
  emerald: '#10b981', blue: '#3b82f6', indigo: '#6366f1', purple: '#a855f7',
  pink: '#ec4899', rose: '#f43f5e',
};

interface TestFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTest: ITest | null;
  form: ITestForm;
  onSubmit: () => void;
  onFormChange: (form: ITestForm) => void;
  exams: IAdminExam[];
  subjects: IAdminSubject[];
  actionError: string | null;
}

const getExamCategoryId = (exam?: IAdminExam) => {
  if (!exam) return '';
  return typeof exam.categoryId === 'object' ? exam.categoryId?._id || '' : exam.categoryId || '';
};

const TestFormModal: React.FC<TestFormModalProps> = ({ isOpen, onClose, editingTest, form, onSubmit, onFormChange, exams, subjects, actionError }) => {
  const [secName, setSecName] = useState('');
  const [secQCount, setSecQCount] = useState('');
  const [secSubject, setSecSubject] = useState('');
  const selectedExam = exams.find((exam) => exam.name === form.category);
  const selectedCategoryId = getExamCategoryId(selectedExam);
  const examSubjects = subjects.filter((subject) => {
    const categoryId = typeof subject.categoryId === 'object' ? subject.categoryId?._id : subject.categoryId;
    return selectedCategoryId ? categoryId === selectedCategoryId : false;
  });
  const subjectOptions = (examSubjects.length > 0 ? examSubjects : subjects).map((subject) => ({ value: subject.name, label: subject.name, id: subject._id }));
  const examOptions = exams.map((exam) => ({ value: exam.name, label: exam.name }));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTest ? 'Edit Test' : 'Create Test'}
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editingTest ? 'Update' : 'Create'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        {actionError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">{actionError}</p>
          </div>
        )}
        <Input label="Test Title" value={form.title} onChange={(e) => onFormChange({ ...form, title: e.target.value })} required />
        <Textarea label="Description" value={form.description} onChange={(e) => onFormChange({ ...form, description: e.target.value })} fullWidth rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Exam"
            options={examOptions.length ? [{ value: '', label: 'Select Exam' }, ...examOptions] : [{ value: '', label: 'No exams found' }]}
            value={form.category}
              onChange={(e) => {
                const nextExam = exams.find((exam) => exam.name === e.target.value);
                const nextCategoryId = getExamCategoryId(nextExam);
                const linkedSubject = subjects.find((subject) => {
                  const categoryId = typeof subject.categoryId === 'object' ? subject.categoryId?._id : subject.categoryId;
                  return nextCategoryId ? categoryId === nextCategoryId : false;
                });
                const fallbackSubject = linkedSubject || subjects[0];
                onFormChange({ ...form, category: e.target.value, subject: fallbackSubject?.name || '' });
              }}
          />
          <Select
            label="Subject"
            options={subjectOptions.length ? [{ value: '', label: 'Select Subject' }, ...subjectOptions] : [{ value: '', label: form.category ? 'No linked subjects' : 'Select exam first' }]}
            value={form.subject}
            onChange={(e) => onFormChange({ ...form, subject: e.target.value })}
          />
        </div>
        <div className="rounded-xl border border-tb-gray-200 p-4 dark:border-gray-700">
          <p className="text-sm font-semibold text-tb-navy dark:text-white">Test Scope</p>
          <p className="mt-0.5 text-xs text-tb-gray-500 dark:text-gray-400">User side par isi basis par Subject Wise, Chapter Wise, Full Length sections banenge.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { value: 'subject', label: 'Subject Wise', icon: Layers },
              { value: 'chapter', label: 'Chapter Wise', icon: FileText },
              { value: 'full', label: 'Full Length', icon: BookOpen },
            ].map((item) => {
              const Icon = item.icon;
              const active = form.testType === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onFormChange({ ...form, testType: item.value as ITestForm['testType'], chapter: item.value === 'chapter' ? form.chapter : '' })}
                  className={`rounded-lg border px-3 py-3 text-left transition-all ${
                    active
                      ? 'border-tb-blue bg-blue-50 text-tb-blue dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-200'
                      : 'border-tb-gray-200 text-tb-gray-600 hover:border-tb-blue/40 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Icon className="mb-2 h-4 w-4" />
                  <span className="text-xs font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>
          {form.testType === 'chapter' && (
            <div className="mt-4">
              <Input label="Chapter / Topic" value={form.chapter} onChange={(e) => onFormChange({ ...form, chapter: e.target.value })} placeholder="e.g. Algebra, Indian Polity" required />
            </div>
          )}
        </div>

        <div className="rounded-xl border border-tb-gray-200 p-4 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-tb-navy dark:text-white">Sections</p>
              <p className="text-xs text-tb-gray-500 dark:text-gray-400">Add sections like Physics — 25 questions, Chemistry — 25 questions</p>
            </div>
            <Badge variant="info">{(form.sections || []).length} sections</Badge>
          </div>
          {(form.sections || []).length > 0 && (
            <div className="space-y-2 mb-3">
              {(form.sections || []).map((sec, idx) => (
                <div key={idx} className="flex items-center gap-2 rounded-lg border border-tb-gray-100 bg-tb-gray-50 p-2.5 text-xs">
                  <span className="font-bold text-tb-navy min-w-[80px]">{sec.name}</span>
                  <span className="text-tb-gray-500">{sec.questionCount} Q</span>
                  {sec.subject && <Badge variant="primary">{sec.subject}</Badge>}
                  <button type="button" onClick={() => onFormChange({ ...form, sections: (form.sections || []).filter((_, i) => i !== idx) })} className="ml-auto text-red-500 hover:text-red-700 font-bold">Remove</button>
                </div>
              ))}
              <p className="text-[11px] text-tb-gray-500">Total: {(form.sections || []).reduce((sum, s) => sum + (s.questionCount || 0), 0)} questions</p>
            </div>
          )}
          <div className="flex flex-wrap items-end gap-2">
            <Input label="Section Name" value={secName} onChange={(e) => setSecName(e.target.value)} className="min-w-[120px] flex-1" />
            <Input label="Questions" type="number" value={secQCount} onChange={(e) => setSecQCount(e.target.value)} className="w-20" />
            <Select label="Subject (optional)" value={secSubject} onChange={(e) => setSecSubject(e.target.value)} options={[{ value: '', label: 'Auto' }, ...subjectOptions]} className="min-w-[100px]" />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                const name = secName.trim();
                const qCount = parseInt(secQCount) || 0;
                if (!name) return;
                onFormChange({ ...form, sections: [...(form.sections || []), { name, questionCount: qCount, subject: secSubject || undefined }] });
                setSecName('');
                setSecQCount('');
                setSecSubject('');
              }}
            >
              <Plus className="w-4 h-4" />Add
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Difficulty"
            options={[
              { value: 'easy', label: 'Easy' },
              { value: 'medium', label: 'Medium' },
              { value: 'hard', label: 'Hard' },
            ]}
            value={form.difficulty}
            onChange={(e) => onFormChange({ ...form, difficulty: e.target.value as 'easy' | 'medium' | 'hard' })}
          />
          <div>
            <p className="text-xs font-medium text-tb-gray-500 mb-1.5">Class</p>
            <div className="flex rounded-lg border border-tb-gray-200 dark:border-gray-700 overflow-hidden">
              {[
                { value: 'all', label: 'All' },
                { value: '11', label: 'Class 11' },
                { value: '12', label: 'Class 12' },
              ].map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onFormChange({ ...form, class: c.value as '11' | '12' | 'all' })}
                  className={`flex-1 px-3 py-1.5 text-xs font-bold transition-all ${
                    form.class === c.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-tb-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Questions" type="number" value={form.questionsCount || ''} onChange={(e) => onFormChange({ ...form, questionsCount: Number(e.target.value) })} />
          <Input label="Duration (min)" type="number" value={form.duration || ''} onChange={(e) => onFormChange({ ...form, duration: Number(e.target.value) })} />
          <Input label="Passing Score (%)" type="number" value={form.passingScore || ''} onChange={(e) => onFormChange({ ...form, passingScore: Number(e.target.value) })} />
        </div>
        <Input label="Total Points" type="number" value={form.totalPoints || ''} onChange={(e) => onFormChange({ ...form, totalPoints: Number(e.target.value) })} />
        <div className="border border-tb-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-tb-navy dark:text-white">Test Type</p>
              <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">Choose whether this test is free or premium</p>
            </div>
            <div className="flex items-center bg-tb-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                type="button"
                onClick={() => onFormChange({ ...form, isPremium: false, price: 0, originalPrice: 0 })}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  !form.isPremium
                    ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-green-300 shadow-sm'
                    : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 inline mr-1" />Free
              </button>
              <button
                type="button"
                onClick={() => onFormChange({ ...form, isPremium: true })}
                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                  form.isPremium
                    ? 'bg-white dark:bg-gray-600 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy'
                }`}
              >
                <Crown className="w-3.5 h-3.5 inline mr-1" />Premium
              </button>
            </div>
          </div>
          {form.isPremium && (
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-tb-gray-100 dark:border-gray-700/50">
              <Input
                label="Price (₹)"
                type="number"
                value={form.price || ''}
                onChange={(e) => onFormChange({ ...form, price: Number(e.target.value) })}
                placeholder="e.g. 499"
              />
              <Input
                label="Original Price (₹)"
                type="number"
                value={form.originalPrice || ''}
                onChange={(e) => onFormChange({ ...form, originalPrice: Number(e.target.value) })}
                placeholder="e.g. 999"
              />
            </div>
          )}
        </div>
        <div className="border border-tb-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-tb-navy dark:text-white">Badge</p>
            <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">Card par dikhne wala badge (e.g. Popular, New, Trending)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <Input label="Badge Text" value={form.badge?.text || ''} onChange={(e) => onFormChange({ ...form, badge: { text: e.target.value, color: form.badge?.color || 'red' } })} placeholder="e.g. Popular" />
            </div>
            <div>
              <p className="text-xs font-medium text-tb-gray-500 mb-1.5">Color</p>
              <div className="flex gap-1.5">
                {[
                  { key: 'red', bg: 'bg-red-500' },
                  { key: 'orange', bg: 'bg-orange-500' },
                  { key: 'amber', bg: 'bg-amber-500' },
                  { key: 'green', bg: 'bg-green-500' },
                  { key: 'emerald', bg: 'bg-emerald-500' },
                  { key: 'blue', bg: 'bg-blue-500' },
                  { key: 'indigo', bg: 'bg-indigo-500' },
                  { key: 'purple', bg: 'bg-purple-500' },
                  { key: 'pink', bg: 'bg-pink-500' },
                  { key: 'rose', bg: 'bg-rose-500' },
                ].map((c) => (
                  <button key={c.key} type="button" onClick={() => onFormChange({ ...form, badge: { text: form.badge?.text || '', color: c.key } })}
                    className={`h-6 w-6 rounded-full ${c.bg} transition-all ${form.badge?.color === c.key ? 'ring-2 ring-offset-1 ring-tb-navy scale-110' : 'hover:scale-110'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          {form.badge?.text && (
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-tb-gray-500">Preview:</span>
              <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: badgeColorMap[form.badge.color] || '#ef4444' }}>
                {form.badge.text}
              </span>
            </div>
          )}
        </div>
        <Select
          label="Status"
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'published', label: 'Published' },
          ]}
          value={form.status}
          onChange={(e) => onFormChange({ ...form, status: e.target.value as 'published' | 'draft' })}
        />
        <div className="border border-tb-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4">
          <div>
            <p className="text-sm font-semibold text-tb-navy dark:text-white">Active Time Window</p>
            <p className="text-xs text-tb-gray-500 dark:text-gray-400 mt-0.5">
              Test user side par sirf is time window mein show hoga. End time ke baad automatically inactive ho jayega.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Active From"
              type="datetime-local"
              value={form.activeFrom || ''}
              onChange={(e) => onFormChange({ ...form, activeFrom: e.target.value, scheduledAt: e.target.value })}
            />
            <Input
              label="Active Until"
              type="datetime-local"
              value={form.activeUntil || ''}
              onChange={(e) => onFormChange({ ...form, activeUntil: e.target.value })}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TestFormModal;
