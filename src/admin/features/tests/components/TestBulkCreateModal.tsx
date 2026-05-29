import React, { useMemo, useState } from 'react';
import type { ITestForm } from '../../../types';
import { Button, Modal, Textarea } from '@shared/components';
import { AlertCircle, Upload } from '@shared/icons';

interface TestBulkCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tests: ITestForm[]) => Promise<number>;
}

const emptyFormDefaults = {
  description: '',
  difficulty: 'medium' as const,
  class: 'all' as const,
  questionsCount: 0,
  duration: 60,
  passingScore: 40,
  totalPoints: 100,
  status: 'draft' as const,
  isPremium: false,
  price: 0,
  originalPrice: 0,
  sections: [],
  scheduledAt: '',
  activeFrom: '',
  activeUntil: '',
};

const splitCsvLine = (line: string) => {
  const cells: string[] = [];
  let current = '';
  let quoted = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && line[i + 1] === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      cells.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  cells.push(current.trim());
  return cells;
};

const normalizeType = (value: string): ITestForm['testType'] => {
  if (value === 'chapter' || value === 'full') return value;
  return 'subject';
};

const toBool = (value: unknown) => String(value || '').toLowerCase() === 'true';
const toNumber = (value: unknown, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseSections = (value: unknown): ITestForm['sections'] => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((s: any) => ({ name: String(s.name || ''), questionCount: toNumber(s.questionCount, 0), subject: s.subject ? String(s.subject) : undefined }));
  const str = String(value).trim();
  if (!str) return [];
  return str.split('|').map((part) => {
    const [name, qCount] = part.split(':');
    return { name: name.trim(), questionCount: toNumber(qCount, 0), subject: undefined };
  });
};

const normalizeRow = (row: Record<string, any>): ITestForm => ({
  ...emptyFormDefaults,
  title: String(row.title || row.name || '').trim(),
  description: String(row.description || '').trim(),
  category: String(row.category || '').trim(),
  subject: String(row.subject || row.category || '').trim(),
  testType: normalizeType(String(row.testType || row.type || 'subject').trim()),
  class: ['11', '12', 'all'].includes(row.class) ? row.class : 'all',
  chapter: String(row.chapter || row.topic || '').trim(),
  difficulty: ['easy', 'medium', 'hard'].includes(row.difficulty) ? row.difficulty : 'medium',
  questionsCount: toNumber(row.questionsCount || row.totalQuestions, 0),
  duration: toNumber(row.duration, 60),
  passingScore: toNumber(row.passingScore || row.passingMarks, 40),
  totalPoints: toNumber(row.totalPoints || row.totalMarks, 100),
  status: row.status === 'published' ? 'published' : 'draft',
  isPremium: toBool(row.isPremium),
  price: toNumber(row.price, 0),
  originalPrice: toNumber(row.originalPrice, 0),
  sections: parseSections(row.sections),
  scheduledAt: row.scheduledAt || '',
  activeFrom: row.activeFrom || '',
  activeUntil: row.activeUntil || '',
});

const parseBulkInput = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith('[')) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) throw new Error('JSON must be an array of tests.');
    return parsed.map(normalizeRow);
  }

  const [headerLine, ...rows] = trimmed.split(/\r?\n/).filter(Boolean);
  const headers = splitCsvLine(headerLine).map((header) => header.trim());
  return rows.map((line) => {
    const values = splitCsvLine(line);
    const row = headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header] = values[index] || '';
      return acc;
    }, {});
    return normalizeRow(row);
  });
};

const validateTests = (tests: ITestForm[]) => {
  if (!tests.length) return 'Add at least one test row.';
  const invalidIndex = tests.findIndex((test) => !test.title || !test.category || !test.subject || (test.testType === 'chapter' && !test.chapter));
  if (invalidIndex !== -1) return `Row ${invalidIndex + 1}: title, category, subject and chapter for chapter-wise tests are required.`;
  return '';
};

const TestBulkCreateModal: React.FC<TestBulkCreateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [raw, setRaw] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const preview = useMemo(() => {
    try {
      return parseBulkInput(raw);
    } catch {
      return [];
    }
  }, [raw]);

  const handleSubmit = async () => {
    setError('');
    try {
      const tests = parseBulkInput(raw);
      const validation = validateTests(tests);
      if (validation) {
        setError(validation);
        return;
      }
      setSaving(true);
      await onSubmit(tests);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Could not parse bulk tests.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Create Tests"
      size="xl"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={saving}>
            <Upload className="h-4 w-4" /> Create {preview.length || ''} Tests
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-tb-navy dark:text-white">Paste CSV or JSON</p>
          <p className="mt-1 text-xs text-tb-gray-500 dark:text-gray-400">
            testType must be subject, chapter, or full. Chapter is required only for chapter-wise tests. For sections use JSON array or CSV pipe format: `sections: "Physics:25|Chemistry:25"`.
          </p>
        </div>
        <Textarea value={raw} onChange={(event) => setRaw(event.target.value)} rows={12} fullWidth />
        <div className="rounded-xl border border-tb-gray-100 bg-tb-gray-50 p-3 text-xs text-tb-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          Preview: {preview.length} valid-looking row{preview.length === 1 ? '' : 's'}
        </div>
      </div>
    </Modal>
  );
};

export default TestBulkCreateModal;
