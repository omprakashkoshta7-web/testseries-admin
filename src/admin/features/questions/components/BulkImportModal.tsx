import React, { useState, useRef, useMemo, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { bulkUploadQuestions, fetchQuestions } from '../store/questions.slice';
import { fetchAdminSubjects } from '../../subjects/store/subjects.slice';
import { fetchTopics } from '../../topics/store/topics.slice';
import { useToast } from '../../../utils/ToastContext';
import { Modal, Button, Select } from '@shared/components';
import { Upload, FileText, AlertTriangle, CheckCircle, X, Loader22 } from '@shared/icons';

interface QuestionItem {
  question: string;
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  difficulty?: string;
  marks?: number;
  negative_marks?: number;
  type?: string;
  [key: string]: any;
}

interface ValidationError {
  index: number;
  field: string;
  message: string;
}

interface ValidationResult {
  valid: QuestionItem[];
  errors: ValidationError[];
  total: number;
}

const LABEL_MAP: Record<string, string> = {
  question: 'question',
  options: 'options',
  correct_answer: 'correct_answer',
  explanation: 'explanation',
  difficulty: 'difficulty',
  marks: 'marks',
  negative_marks: 'negative_marks',
};

const validateQuestion = (q: any, index: number): ValidationError[] => {
  const errors: ValidationError[] = [];
  if (!q.question || !q.question.toString().trim()) {
    errors.push({ index, field: 'question', message: 'Question text is required' });
  }
  if (q.options) {
    if (!Array.isArray(q.options)) {
      errors.push({ index, field: 'options', message: 'Options must be an array' });
    } else if (q.options.length < 2) {
      errors.push({ index, field: 'options', message: `Only ${q.options.length} option(s) found, minimum 2 required` });
    } else if (q.options.length > 6) {
      errors.push({ index, field: 'options', message: `${q.options.length} options found, maximum 6 allowed` });
    }
    if (q.correct_answer) {
      const correctStr = String(q.correct_answer).trim();
      const found = q.options.some((opt: string) => String(opt).trim() === correctStr);
      if (!found) {
        errors.push({ index, field: 'correct_answer', message: `"${correctStr}" must exist in options array` });
      }
    }
  } else if (!q.correct_answer) {
    errors.push({ index, field: 'correct_answer', message: 'Correct answer is required' });
  }
  if (q.marks !== undefined && (isNaN(Number(q.marks)) || Number(q.marks) < 0)) {
    errors.push({ index, field: 'marks', message: 'Invalid marks value' });
  }
  if (q.negative_marks !== undefined && isNaN(Number(q.negative_marks))) {
    errors.push({ index, field: 'negative_marks', message: 'Invalid negative marks value' });
  }
  if (q.difficulty && !['easy', 'medium', 'hard'].includes(q.difficulty)) {
    errors.push({ index, field: 'difficulty', message: `"${q.difficulty}" is not valid (easy/medium/hard)` });
  }
  return errors;
};

const validateBulk = (json: any): ValidationResult => {
  const errors: ValidationError[] = [];
  let questions: any[] = [];

  if (json.questions && Array.isArray(json.questions)) {
    questions = json.questions;
  } else if (Array.isArray(json)) {
    questions = json;
  } else {
    return { valid: [], errors: [{ index: -1, field: 'root', message: 'JSON must contain a "questions" array or be an array of questions' }], total: 0 };
  }

  questions.forEach((q, i) => {
    const qErrors = validateQuestion(q, i);
    errors.push(...qErrors);
  });

  const validIndices = new Set(questions.map((_, i) => i));
  errors.forEach((e) => validIndices.delete(e.index));

  return {
    valid: questions.filter((_, i) => validIndices.has(i)),
    errors,
    total: questions.length,
  };
};

const BulkImportModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = useAdminSelector((s: any) => s.examCategories.items);
  const exams = useAdminSelector((s: any) => s.adminExams.items);
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);
  const topics = useAdminSelector((s: any) => s.topics.items);
  const existingQuestions = useAdminSelector((s: any) => s.questions.questions);

  const [step, setStep] = useState<'select' | 'upload' | 'preview' | 'importing'>('select');
  const [categoryId, setCategoryId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [rawJson, setRawJson] = useState('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [importing, setImporting] = useState(false);

  const filteredExams = useMemo(() =>
    categoryId ? exams.filter((e: any) => e.categoryId === categoryId || e.categoryId?._id === categoryId) : [],
    [categoryId, exams]
  );
  const filteredSubjects = useMemo(() =>
    categoryId ? subjects.filter((s: any) => s.categoryId === categoryId || s.categoryId?._id === categoryId) : [],
    [categoryId, subjects]
  );
  const filteredChapters = useMemo(() =>
    subjectId ? topics.filter((t: any) => {
      const sid = typeof t.subjectId === 'object' ? t.subjectId._id : t.subjectId;
      return sid === subjectId;
    }) : [],
    [subjectId, topics]
  );

  const reset = useCallback(() => {
    setStep('select');
    setCategoryId('');
    setSubjectId('');
    setChapterId('');
    setRawJson('');
    setResult(null);
    setImporting(false);
  }, []);

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setRawJson(text);
    };
    reader.readAsText(file);
  }, []);

  const handleValidate = useCallback(() => {
    try {
      const parsed = JSON.parse(rawJson);
      const res = validateBulk(parsed);
      setResult(res);
      setStep('preview');
    } catch (e: any) {
      showToast('Invalid JSON format: ' + e.message, 'error');
    }
  }, [rawJson, showToast]);

  const normalizeQuestion = useCallback((q: QuestionItem) => {
    const existing = existingQuestions.find(
      (eq: any) => eq.text?.toLowerCase().trim() === q.question?.toString().toLowerCase().trim()
    );
    const options = q.options?.map((opt: string, i: number) => ({
      label: String.fromCharCode(65 + i),
      text: opt,
    })) || [];
    return {
      text: q.question,
      options,
      correctAnswer: q.correct_answer || '',
      type: q.type || (q.options ? 'single' : 'mcq'),
      category: categoryId,
      subject: subjectId || '',
      topic: chapterId || '',
      section: 'General',
      sectionName: 'General',
      difficulty: q.difficulty || 'medium',
      marks: Number(q.marks) || 1,
      negativeMarks: Number(q.negative_marks) || 0,
      explanation: q.explanation || '',
      isActive: true,
    };
  }, [categoryId, subjectId, chapterId, existingQuestions]);

  const handleImport = useCallback(async () => {
    if (!result || result.valid.length === 0) return;
    setImporting(true);
    setStep('importing');

    const normalized = result.valid.map(normalizeQuestion);
    try {
      const res = await dispatch(bulkUploadQuestions({ questions: normalized })).unwrap();
      showToast(`${res.count} questions imported successfully`, 'success');
      dispatch(fetchQuestions({ page: 1, limit: 50 }));
      reset();
      onClose();
    } catch (err: any) {
      showToast(err?.message || 'Import failed', 'error');
      setStep('preview');
    }
    setImporting(false);
  }, [result, normalizeQuestion, dispatch, showToast, reset, onClose]);

  const getFieldLabel = (field: string) => LABEL_MAP[field] || field;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Bulk Import Questions" size="lg"
      footer={step !== 'select' && step !== 'upload' ? null : undefined}
    >
      <div className="space-y-4 min-h-[300px]">
        {/* Step 1: Select */}
        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Select the exam, subject, and chapter for the questions.</p>
            <Select label="Exam Category" value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setSubjectId(''); setChapterId(''); }}
              options={[{ value: '', label: 'Select Category' }, ...categories.map((c: any) => ({ value: c._id, label: c.name }))]} />
            {filteredSubjects.length > 0 && (
              <Select label="Subject" value={subjectId} onChange={(e) => { setSubjectId(e.target.value); setChapterId(''); }}
                options={[{ value: '', label: 'Select Subject' }, ...filteredSubjects.map((s: any) => ({ value: s._id, label: s.name }))]} />
            )}
            {filteredChapters.length > 0 && (
              <Select label="Chapter (Optional)" value={chapterId} onChange={(e) => setChapterId(e.target.value)}
                options={[{ value: '', label: 'No Chapter' }, ...filteredChapters.map((t: any) => ({ value: t._id, label: t.name }))]} />
            )}
            <Button onClick={() => setStep('upload')} disabled={!categoryId} className="w-full mt-2">
              <Upload className="w-4 h-4" /> Continue to Upload
            </Button>
          </div>
        )}

        {/* Step 2: Upload */}
        {step === 'upload' && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-tb-blue transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <input ref={fileInputRef} type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
              <Upload className="w-8 h-8 mx-auto text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-600">Click to upload JSON file</p>
              <p className="text-xs text-gray-400">or paste JSON below</p>
            </div>
            <textarea className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-y" rows={10}
              value={rawJson} onChange={(e) => setRawJson(e.target.value)}
              placeholder='[{ "question": "20% of 500 = ?", "options": ["50","100","150","200"], "correct_answer": "100", "explanation": "20% of 500 = 100", "difficulty": "easy", "marks": 2, "negative_marks": 0.5 }]'
            />
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep('select')}>Back</Button>
              <Button onClick={handleValidate} disabled={!rawJson.trim()} className="flex-1">
                <CheckCircle className="w-4 h-4" /> Validate & Preview
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preview */}
        {step === 'preview' && result && (
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <CheckCircle className="w-6 h-6 mx-auto text-green-600" />
                <p className="text-2xl font-bold text-green-700 mt-1">{result.valid.length}</p>
                <p className="text-xs text-green-600">Valid</p>
              </div>
              <div className="flex-1 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                <AlertTriangle className="w-6 h-6 mx-auto text-red-600" />
                <p className="text-2xl font-bold text-red-700 mt-1">{result.errors.length}</p>
                <p className="text-xs text-red-600">Errors</p>
              </div>
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                <FileText className="w-6 h-6 mx-auto text-gray-600" />
                <p className="text-2xl font-bold text-gray-700 mt-1">{result.total}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-red-700 mb-2">Errors</h4>
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {result.errors.map((err, i) => (
                    <div key={i} className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-red-700">#{err.index + 1}</span>
                        <span className="text-red-600"> — <span className="font-medium">{getFieldLabel(err.field)}</span>: {err.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.valid.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-700">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  {result.valid.length} questions ready to import.
                  {result.valid.length > 0 && (
                    <span className="block text-xs text-blue-500 mt-1">
                      {existingQuestions.length > 0 && 'Duplicate detection is enabled.'}
                      {result.valid.length >= 100 && ' Large import detected.'}
                    </span>
                  )}
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setStep('upload')}>Back</Button>
              {result.valid.length > 0 && (
                <Button onClick={handleImport} disabled={importing} className="flex-1">
                  {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  Import {result.valid.length} Questions
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Importing */}
        {step === 'importing' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-10 h-10 animate-spin text-tb-blue" />
            <p className="mt-4 text-sm font-medium text-gray-600">Importing questions...</p>
            <p className="text-xs text-gray-400">Please wait while questions are being saved.</p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BulkImportModal;
