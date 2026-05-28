import { useEffect, useMemo, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { createQuestion, bulkUploadQuestions, deleteQuestion, deleteQuestionsByTest, fetchQuestions, updateQuestion } from '../../questions/store/questions.slice';
import { useToast } from '../../../utils/ToastContext';
import { parseQuestionsFromPdfText, defaultQuestionOptions, resolveSubjectId, resolveTopicId, normalizeOptions, extractPdfText } from '../utils';
import { checkExtractionQuality, mapPuaToSymbols, hasPuaChars } from '../utils/pdfQualityChecker';
import { parseParagraphJson } from '../utils/paragraphParser';
import adminApiClient from '../../../utils/apiClient';
import type { ITopic } from '../../../types';
import type { PdfExtractionResult } from '../utils/pdfParser';

const emptyQuestionForm = {
  text: '',
  type: 'mcq',
  difficulty: 'medium',
  subject: '',
  topic: '',
  options: defaultQuestionOptions,
  correctAnswer: 'A',
  marks: 1,
  negativeMarks: 0,
  explanation: '',
  image: '',
  attachmentUrl: '',
  attachmentType: '',
  isActive: true,
  section: '',
  sectionName: '',
};

export const useQuestionCrud = (
  onError?: (err: string | null) => void,
  contentTest?: { id: string; title: string; category: string } | null,
  selectedCategoryId?: string,
  loadTests?: () => void,
) => {
  const dispatch = useAdminDispatch();
  const subjects = useAdminSelector((s: any) => s.adminSubjects.items);
  const topics = useAdminSelector((s: any) => s.topics.items);
  const { showToast } = useToast();

  const [questionForm, setQuestionForm] = useState<any>(emptyQuestionForm);
  const [bulkQuestionSubject, setBulkQuestionSubject] = useState('');
  const [bulkQuestionTopic, setBulkQuestionTopic] = useState('');
  const [bulkQuestionSection, setBulkQuestionSection] = useState('');
  const [bulkQuestionsJson, setBulkQuestionsJson] = useState('');
  const [pdfImportFileName, setPdfImportFileName] = useState('');
  const [pdfImportStatus, setPdfImportStatus] = useState('');
  const [pdfImportLoading, setPdfImportLoading] = useState(false);
  const [pdfExtractionResult, setPdfExtractionResult] = useState<PdfExtractionResult | null>(null);
  const [pdfOcrInProgress, setPdfOcrInProgress] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [paragraphJson, setParagraphJson] = useState('');
  const [contentQuestions, setContentQuestions] = useState<any[]>([]);
  const [contentQuestionsLoading, setContentQuestionsLoading] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState('');
  const [deletingAllQuestions, setDeletingAllQuestions] = useState(false);

  const contentTopics = useMemo(() => topics.filter((t: ITopic) => {
    if (!t || !t.subjectId) return false;
    const subjectId = typeof t.subjectId === 'object' && t.subjectId !== null ? t.subjectId._id : t.subjectId;
    return !questionForm.subject || subjectId === questionForm.subject;
  }), [topics, questionForm.subject]);

  const bulkQuestionTopics = useMemo(() => topics.filter((t: ITopic) => {
    if (!t || !t.subjectId) return false;
    const subjectId = typeof t.subjectId === 'object' && t.subjectId !== null ? t.subjectId._id : t.subjectId;
    return !bulkQuestionSubject || subjectId === bulkQuestionSubject;
  }), [topics, bulkQuestionSubject]);

  const loadContentQuestions = async () => {
    if (!contentTest?.id) {
      setContentQuestions([]);
      return;
    }
    setContentQuestionsLoading(true);
    try {
      const result = await dispatch(fetchQuestions({ testId: contentTest.id, page: 1, limit: 200 })).unwrap();
      setContentQuestions(result.questions || []);
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to load questions');
    } finally {
      setContentQuestionsLoading(false);
    }
  };

  useEffect(() => {
    loadContentQuestions();
  }, [contentTest?.id]);

  const handleCreateQuestion = async () => {
    if (!contentTest) return;
    if (!questionForm.text.trim() || !questionForm.subject || !questionForm.topic) {
      onError?.('Question text, subject, and topic are required');
      return;
    }
    if ((contentTest as any)?.sections?.length > 0 && !questionForm.section) {
      onError?.('Please select a section for this question');
      return;
    }
    const subjectName = subjects.find((s: any) => s._id === questionForm.subject)?.name || questionForm.subject;
    const topicName = topics.find((t: any) => t._id === questionForm.topic)?.name || questionForm.topic;
    try {
      await dispatch(createQuestion({
        testId: contentTest.id,
        text: questionForm.text,
        type: questionForm.type,
        category: selectedCategoryId || contentTest.category,
        subject: subjectName,
        topic: topicName,
        options: questionForm.type === 'integer' ? [] : questionForm.options,
        correctAnswer: questionForm.correctAnswer,
        difficulty: questionForm.difficulty,
        marks: Number(questionForm.marks) || 1,
        negativeMarks: Number(questionForm.negativeMarks) || 0,
        explanation: questionForm.explanation,
        image: questionForm.image,
        attachmentUrl: questionForm.attachmentUrl,
        attachmentType: questionForm.attachmentType,
        section: questionForm.section || 'General',
        sectionName: questionForm.sectionName || questionForm.section || 'General',
        isActive: questionForm.isActive,
      })).unwrap();
      setQuestionForm(emptyQuestionForm);
      onError?.(null);
      showToast('Question added to test', 'success');
      loadTests?.();
      loadContentQuestions();
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add question');
    }
  };

  const readTextFile = (file: File, onLoad: (text: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.onerror = () => onError?.('Could not read uploaded file');
    reader.readAsText(file);
  };

  const readDataFile = (file: File, onLoad: (dataUrl: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.onerror = () => onError?.('Could not read uploaded file');
    reader.readAsDataURL(file);
  };

  const appendBulkQuestions = (questions: Array<Record<string, any>>) => {
    setBulkQuestionsJson((current: string) => {
      let existing: any[] = [];
      if (current.trim()) {
        try {
          const parsed = JSON.parse(current);
          existing = Array.isArray(parsed) ? parsed : [];
        } catch {
          existing = [];
        }
      }
      return JSON.stringify([...existing, ...questions], null, 2);
    });
  };

  const appendBulkQuestion = (question: Record<string, any>) => {
    appendBulkQuestions([question]);
  };

  const handlePdfImportUpload = async (file: File) => {
    setPdfImportFileName(file.name);
    setPdfImportStatus('Reading PDF text...');
    setPdfImportLoading(true);
    setPdfExtractionResult(null);
    setPdfFile(file);
    try {
      const result: PdfExtractionResult = await extractPdfText(file);
      setPdfExtractionResult(result);

      if (result.requiresOCR) {
        setPdfImportStatus(`Extraction score: ${result.quality.score}% — symbols corrupted. OCR recommended.`);
        onError?.(null);
        return;
      }

      const questions = parseQuestionsFromPdfText(result.fullText);
      if (questions.length) {
        appendBulkQuestions(questions);
        setPdfImportStatus(`${questions.length} questions extracted (score: ${result.quality.score}%). Preview/edit JSON below, then import.`);
        onError?.(null);
        showToast(`${questions.length} questions extracted from PDF`, 'success');
        return;
      }
      setPdfImportStatus('No numbered MCQ blocks found. Use format: 1. Question A. option B. option ... Answer: A');
      onError?.('PDF me clear numbered MCQ format nahi mila. Format: 1. Question A. option B. option ... Answer: A');
    } catch {
      setPdfExtractionResult({
        pages: [], fullText: '', pageCount: 0, requiresOCR: true, isMathContent: false, html: '', latex: '',
        quality: { quality: 'critical', score: 0, brokenSymbols: [], issues: ['PDF text extraction failed — OCR required'], needsOCR: true, recommendedAction: 'reject', confidence: 0 },
      });
      setPdfImportStatus('Scanned/image PDF detected. "Retry with OCR" se Nougat OCR attempt hoga (Nougat service URL check karein).');
      onError?.('PDF text read nahi ho paya. "Retry with OCR" button se server-side Nougat OCR try karein.');
    } finally {
      setPdfImportLoading(false);
    }
  };

  const handleRetryWithOCR = async () => {
    if (!pdfExtractionResult) return;
    setPdfOcrInProgress(true);

    try {
      let ocrText = '';
      let usedBackend = false;

      if (pdfFile) {
        setPdfImportStatus('Calling Nougat OCR backend...');
        try {
          const formData = new FormData();
          formData.append('pdf', pdfFile);
          if (pdfExtractionResult.isMathContent) {
            formData.append('isMathContent', 'true');
          }
          const response = await adminApiClient.post('/ocr/extract', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            timeout: 300000,
          });
          if (response.data?.success && response.data?.data?.text) {
            ocrText = response.data.data.text;
            usedBackend = true;
            setPdfImportStatus(`Nougat OCR done (${Math.round(response.data.data.confidence * 100)}% confidence, ${response.data.data.provider}).`);
          }
        } catch (apiErr: any) {
          const apiMsg = apiErr?.response?.data?.error || apiErr?.message || 'API error';
          setPdfImportStatus(`Backend OCR unavailable (${apiMsg}). Falling back to client-side normalization...`);
        }
      }

      if (!usedBackend) {
        setPdfImportStatus('Running client-side OCR normalization...');
        const hasPua = hasPuaChars(pdfExtractionResult.fullText);
        const puaStatus = hasPua ? ' (PUA symbols detected -> mapping applied)' : '';

        const cleanedText = pdfExtractionResult.fullText
          .normalize('NFKC')
          .replace(/\uFFFD/g, '')
          .replace(/[\u25a1\u25a0\u25ab\u25ad\u2610]/g, '');

        const puaMapped = mapPuaToSymbols(cleanedText);

        ocrText = puaMapped
          .replace(/\bintegral\b/gi, '\u222b')
          .replace(/\bsqrt\b/gi, '\u221a')
          .replace(/\binfinity\b/gi, '\u221e')
          .replace(/\bpi\b/gi, '\u03c0')
          .replace(/\balpha\b/gi, '\u03b1')
          .replace(/\bbeta\b/gi, '\u03b2')
          .replace(/\bgamma\b/gi, '\u03b3')
          .replace(/\btheta\b/gi, '\u03b8')
          .replace(/\bdelta\b/gi, '\u0394')
          .replace(/\bsigma\b/gi, '\u03a3')
          .replace(/\blambda\b/gi, '\u03bb')
          .replace(/\bomega\b/gi, '\u03c9')
          .replace(/\bphi\b/gi, '\u03c6')
          .replace(/\bmu\b/gi, '\u03bc')
          .replace(/\bepsilon\b/gi, '\u03b5')
          .replace(/\bperpendicular\b/gi, '\u22a5')
          .replace(/\bparallel\b/gi, '\u2225')
          .replace(/\bangle\b/gi, '\u2220')
          .replace(/\btherefore\b/gi, '\u2234')
          .replace(/\bbecause\b/gi, '\u2235')
          .replace(/\bdegrees?\b/gi, '\u00b0')
          .replace(/\ble\b/gi, '\u2264')
          .replace(/\bge\b/gi, '\u2265')
          .replace(/\bne\b/gi, '\u2260')
          .replace(/\bpm\b/gi, '\u00b1');

        const recheck = checkExtractionQuality(ocrText);
        setPdfExtractionResult(prev => prev ? { ...prev, fullText: ocrText, quality: recheck, requiresOCR: recheck.needsOCR } : prev);

        const questions = parseQuestionsFromPdfText(ocrText);
        if (questions.length) {
          appendBulkQuestions(questions);
          setPdfImportStatus(`OCR normalized${puaStatus}: ${questions.length} questions extracted (score: ${recheck.score}%).`);
          onError?.(null);
          showToast(`${questions.length} questions extracted after OCR normalization`, 'success');
        } else {
          setPdfImportStatus('OCR complete but no MCQ blocks detected. Manual JSON entry required.');
          onError?.('OCR ke baad bhi MCQ format nahi mila. JSON manually edit karein.');
        }
        return;
      }

      const recheck = checkExtractionQuality(ocrText);
      setPdfExtractionResult(prev => prev ? { ...prev, fullText: ocrText, quality: recheck, requiresOCR: recheck.needsOCR } : prev);

      const questions = parseQuestionsFromPdfText(ocrText);
      if (questions.length) {
        appendBulkQuestions(questions);
        setPdfImportStatus(`Mathpix OCR: ${questions.length} questions extracted (score: ${recheck.score}%).`);
        onError?.(null);
        showToast(`${questions.length} questions extracted via Mathpix OCR`, 'success');
      } else {
        setPdfImportStatus('Mathpix OCR complete but no MCQ blocks detected. Manual JSON entry required.');
        onError?.('OCR ke baad bhi MCQ format nahi mila. JSON manually edit karein.');
      }
    } catch (err: any) {
      setPdfImportStatus(`OCR failed: ${err?.message || 'Unknown error'}. Try a different PDF or enter manually.`);
      onError?.('OCR processing failed.');
    } finally {
      setPdfOcrInProgress(false);
    }
  };

  const bulkQuestionPreview = useMemo(() => {
    if (!bulkQuestionsJson.trim()) return [];
    try {
      const parsed = JSON.parse(bulkQuestionsJson);
      return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
    } catch {
      return [];
    }
  }, [bulkQuestionsJson]);

  const bulkQuestionCount = useMemo(() => {
    if (!bulkQuestionsJson.trim()) return 0;
    try {
      const parsed = JSON.parse(bulkQuestionsJson);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  }, [bulkQuestionsJson]);

  const handleQuestionFileUpload = async (file: File) => {
    const lowerName = file.name.toLowerCase();
    if (file.type === 'application/json' || lowerName.endsWith('.json')) {
      readTextFile(file, setBulkQuestionsJson);
      return;
    }
    if (file.type.startsWith('text/') || lowerName.endsWith('.txt')) {
      readTextFile(file, (text) => appendBulkQuestion({
        text: text.trim() || file.name,
        options: emptyQuestionForm.options,
        correctAnswer: 'A',
        difficulty: 'medium',
        marks: 1,
        negativeMarks: 0,
      }));
      return;
    }
    if (file.type.startsWith('image/')) {
      readDataFile(file, (dataUrl) => appendBulkQuestion({
        text: file.name.replace(/\.[^.]+$/, ''),
        image: dataUrl,
        attachmentUrl: dataUrl,
        attachmentType: 'image',
        options: emptyQuestionForm.options,
        correctAnswer: 'A',
        difficulty: 'medium',
        marks: 1,
        negativeMarks: 0,
      }));
      return;
    }
    if (file.type === 'application/pdf' || lowerName.endsWith('.pdf')) {
      await handlePdfImportUpload(file);
      return;
    }
    onError?.('Unsupported file type. Upload JSON, TXT, image, or PDF.');
  };

  const handleParagraphJsonConvert = () => {
    const { questions: combinedText, error } = parseParagraphJson(paragraphJson);
    if (error) {
      onError?.(error);
      return;
    }
    const questions = parseQuestionsFromPdfText(combinedText);
    if (questions.length) {
      appendBulkQuestions(questions);
      setParagraphJson('');
      showToast(`${questions.length} questions extracted from paragraph JSON`, 'success');
      onError?.(null);
    } else {
      onError?.('No numbered MCQ blocks found. Format: 1. Question A. option B. option ... Answer: A');
    }
  };

  const handleBulkCreateQuestions = async () => {
    if (!contentTest) return;
    let rows: any[];
    try {
      rows = JSON.parse(bulkQuestionsJson);
    } catch {
      onError?.('Questions JSON is invalid');
      return;
    }
    if (!Array.isArray(rows) || !rows.length) { onError?.('Questions JSON must be a non-empty array'); return; }
    if (rows.some((row) => !String(row.text || '').trim())) {
      onError?.('Every question must have text. For file uploads, edit the generated JSON if needed.');
      return;
    }
    try {
      const questions = rows.map((row) => {
        const subjectId = resolveSubjectId(row.subject || bulkQuestionSubject, subjects, selectedCategoryId || '');
        if (!subjectId) {
          throw new Error('Select a default subject or include subject in every JSON question.');
        }
        const topicId = resolveTopicId(row.topic || bulkQuestionTopic, subjectId, topics);
        const subjectName = subjects.find((s: any) => s._id === subjectId || s.name === subjectId)?.name || subjectId;
        const topicName = topicId ? (topics.find((t: any) => t._id === topicId || t.name === topicId)?.name || topicId) : '';
        return {
          testId: contentTest.id,
          text: String(row.text).trim(),
          type: row.type || 'mcq',
          category: selectedCategoryId || contentTest.category,
          subject: subjectName,
          topic: topicName,
          options: row.type === 'integer' ? [] : normalizeOptions(row.options),
          correctAnswer: row.correctAnswer || 'A',
          difficulty: row.difficulty || 'medium',
          marks: Number(row.marks) || 1,
          negativeMarks: Number(row.negativeMarks) || 0,
          explanation: row.explanation || '',
          image: row.image || '',
          attachmentUrl: row.attachmentUrl || row.image || '',
          attachmentType: row.attachmentType || (row.image ? 'image' : ''),
          section: row.section || bulkQuestionSection || 'General',
          sectionName: row.sectionName || row.section || bulkQuestionSection || 'General',
          isActive: row.isActive ?? true,
        };
      });

      await dispatch(bulkUploadQuestions({ questions })).unwrap();
      setBulkQuestionsJson('');
      onError?.(null);
      showToast(`${rows.length} questions added to test`, 'success');
      loadTests?.();
      loadContentQuestions();
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add questions');
    }
  };

  const handleDeleteContentQuestion = async (questionId: string) => {
    if (!questionId) return;
    const ok = window.confirm('Delete this question from selected test?');
    if (!ok) return;
    setDeletingQuestionId(questionId);
    try {
      await dispatch(deleteQuestion(questionId)).unwrap();
      setContentQuestions((current) => current.filter((question) => question._id !== questionId));
      onError?.(null);
      showToast('Question deleted', 'success');
      loadTests?.();
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to delete question');
    } finally {
      setDeletingQuestionId('');
    }
  };

  const handleDeleteAllContentQuestions = async () => {
    if (!contentTest?.id || contentQuestions.length === 0) return;
    const ok = window.confirm(`Delete all ${contentQuestions.length} questions from "${contentTest.title}"? This cannot be undone.`);
    if (!ok) return;
    setDeletingAllQuestions(true);
    try {
      const result = await dispatch(deleteQuestionsByTest(contentTest.id)).unwrap();
      setContentQuestions([]);
      onError?.(null);
      showToast(`${result.count} questions deleted`, 'success');
      loadTests?.();
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to delete all questions');
    } finally {
      setDeletingAllQuestions(false);
    }
  };

  const handleUpdateQuestionSection = async (questionId: string, section: string) => {
    if (!questionId || !section) return;
    try {
      await dispatch(updateQuestion({ id: questionId, data: { section, sectionName: section } })).unwrap();
      setContentQuestions((current) =>
        current.map((q) => (q._id === questionId ? { ...q, section, sectionName: section } : q)),
      );
      showToast('Section updated', 'success');
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to update question section');
    }
  };

  const resetQuestionForms = () => {
    setQuestionForm(emptyQuestionForm);
    setBulkQuestionSubject('');
    setBulkQuestionTopic('');
    setBulkQuestionSection('');
    setBulkQuestionsJson('');
    setPdfImportFileName('');
    setPdfImportStatus('');
    setPdfImportLoading(false);
    setPdfExtractionResult(null);
    setPdfOcrInProgress(false);
    setPdfFile(null);
    setParagraphJson('');
    setContentQuestions([]);
    setContentQuestionsLoading(false);
    setDeletingQuestionId('');
    setDeletingAllQuestions(false);
  };

  return {
    questionForm,
    setQuestionForm,
    bulkQuestionSubject,
    setBulkQuestionSubject,
    bulkQuestionTopic,
    setBulkQuestionTopic,
    bulkQuestionSection,
    setBulkQuestionSection,
    bulkQuestionsJson,
    setBulkQuestionsJson,
    pdfImportFileName,
    pdfImportStatus,
    pdfImportLoading,
    pdfExtractionResult,
    pdfOcrInProgress,
    bulkQuestionPreview,
    bulkQuestionCount,
    contentQuestions,
    contentQuestionsLoading,
    deletingQuestionId,
    deletingAllQuestions,
    contentTopics,
    bulkQuestionTopics,
    loadContentQuestions,
    handleDeleteContentQuestion,
    handleDeleteAllContentQuestions,
    handleCreateQuestion,
    handleUpdateQuestionSection,
    handleBulkCreateQuestions,
    readTextFile,
    readDataFile,
    handlePdfImportUpload,
    handleRetryWithOCR,
    handleQuestionFileUpload,
    paragraphJson,
    setParagraphJson,
    handleParagraphJsonConvert,
    resetQuestionForms,
  };
};
