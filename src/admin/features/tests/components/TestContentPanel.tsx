import React, { useState } from 'react';
import { Badge, Button, Input, Select, Textarea } from '@shared/components';
import { AlertCircle, CheckCircle, FileText, Plus, Trash2, Upload } from '@shared/icons';
import type { IAdminSubject, ITopic } from '../../../types';

interface TestContentPanelProps {
  contentTest: any;
  actionError: string | null;
  subjectCrud: any;
  topicCrud: any;
  questionCrud: any;
  contentSubjects: IAdminSubject[];
  contentTopics: ITopic[];
  bulkQuestionTopics: ITopic[];
  onAddSection?: (section: { name: string; questionCount?: number; subject?: string }) => void;
}

const TestContentPanel: React.FC<TestContentPanelProps> = ({
  contentTest, actionError, subjectCrud, topicCrud, questionCrud,
  contentSubjects, contentTopics, bulkQuestionTopics, onAddSection,
}) => {
  const [showNewSection, setShowNewSection] = useState(false);
  const [newSecName, setNewSecName] = useState('');
  return (
  <div className="space-y-5">
    {actionError && (
      <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
        <p className="text-sm text-red-600">{actionError}</p>
      </div>
    )}

    <div className="rounded-xl border border-tb-gray-200 bg-tb-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-tb-gray-500">Selected Test</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-tb-navy">{contentTest?.title}</span>
        <Badge variant="info">{contentTest?.category}</Badge>
        <Badge variant={contentTest?.status === 'published' ? 'success' : 'warning'}>{contentTest?.status}</Badge>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="space-y-5">
        <div className="rounded-xl border border-tb-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-tb-navy">Add Subject</h3>
            <span className="text-[11px] text-tb-gray-400">Exam category linked</span>
          </div>
          <div className="space-y-3">
            <Input label="Subject Name" value={subjectCrud.subjectForm.name} onChange={(e) => subjectCrud.setSubjectForm({ ...subjectCrud.subjectForm, name: e.target.value })} placeholder="Reasoning, English, Math" />
            <Input label="Description" value={subjectCrud.subjectForm.description} onChange={(e) => subjectCrud.setSubjectForm({ ...subjectCrud.subjectForm, description: e.target.value })} />
            <Button onClick={subjectCrud.handleCreateSubject} className="w-full"><Plus className="w-4 h-4" />Add Subject</Button>
          </div>
        </div>

        <div className="rounded-xl border border-tb-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-tb-navy">Add Topic</h3>
            <span className="text-[11px] text-tb-gray-400">{contentSubjects.length} subjects</span>
          </div>
          <div className="space-y-3">
            <Select label="Subject" value={topicCrud.topicForm.subjectId} onChange={(e) => topicCrud.setTopicForm({ ...topicCrud.topicForm, subjectId: e.target.value })} options={[{ value: '', label: 'Select Subject' }, ...contentSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
            <Input label="Topic Name" value={topicCrud.topicForm.name} onChange={(e) => topicCrud.setTopicForm({ ...topicCrud.topicForm, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })} placeholder="Algebra, Grammar, Coding-Decoding" />
            <Input label="Description" value={topicCrud.topicForm.description} onChange={(e) => topicCrud.setTopicForm({ ...topicCrud.topicForm, description: e.target.value })} />
            <Button onClick={topicCrud.handleCreateTopic} className="w-full"><Plus className="w-4 h-4" />Add Topic</Button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-tb-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-tb-navy">Add Question</h3>
          <span className="text-[11px] text-tb-gray-400">Attached to this test</span>
        </div>
        <div className="space-y-3">
          <Textarea label="Question Text" value={questionCrud.questionForm.text} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, text: e.target.value })} rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Subject" value={questionCrud.questionForm.subject} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, subject: e.target.value, topic: '' })} options={[{ value: '', label: 'Select Subject' }, ...contentSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
            <Select label="Topic" value={questionCrud.questionForm.topic} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, topic: e.target.value })} options={[{ value: '', label: 'Select Topic' }, ...contentTopics.map((t: ITopic) => ({ value: t._id, label: t.name }))]} />
          </div>
          <div className="flex items-end gap-2">
            <Select label="Section" value={questionCrud.questionForm.section} onChange={(e) => {
              if (e.target.value === '__new__') { setShowNewSection(true); return; }
              questionCrud.setQuestionForm({ ...questionCrud.questionForm, section: e.target.value, sectionName: e.target.value });
            }} options={(contentTest?.sections || []).length > 0 ? [{ value: '', label: '-- Select Section --' }, ...(contentTest?.sections || []).map((sec: any) => ({ value: sec.name, label: `${sec.name}${sec.subject ? ` (${sec.subject})` : ''}` })), { value: '__new__', label: '+ Add New Section' }] : [{ value: '', label: '-- Select Section --' }]} className="flex-1" />
            <Button variant="secondary" size="sm" onClick={() => setShowNewSection(true)} title="Add new section"><Plus className="w-4 h-4" /></Button>
          </div>
          {showNewSection && (
            <div className="flex items-end gap-2 mt-2">
              <Input label="New Section Name" value={newSecName} onChange={(e) => setNewSecName(e.target.value)} className="min-w-[160px]" />
              <Button size="sm" onClick={() => {
                const name = newSecName.trim();
                if (name) {
                  onAddSection?.({ name });
                  questionCrud.setQuestionForm({ ...questionCrud.questionForm, section: name, sectionName: name });
                  setNewSecName('');
                  setShowNewSection(false);
                }
              }}>Add</Button>
              <Button variant="secondary" size="sm" onClick={() => { setNewSecName(''); setShowNewSection(false); }}>Cancel</Button>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <Select label="Type" value={questionCrud.questionForm.type} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, type: e.target.value })} options={[{ value: 'mcq', label: 'MCQ' }, { value: 'single', label: 'Single Correct' }, { value: 'multiple', label: 'Multiple Correct' }, { value: 'integer', label: 'Integer' }]} />
            <Select label="Difficulty" value={questionCrud.questionForm.difficulty} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, difficulty: e.target.value })} options={[{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {questionCrud.questionForm.options.map((option: { label: string; text: string }, index: number) => (
              <Input key={option.label} label={`Option ${option.label}`} value={option.text} onChange={(e) => {
                const options = [...questionCrud.questionForm.options];
                options[index] = { ...option, text: e.target.value };
                questionCrud.setQuestionForm({ ...questionCrud.questionForm, options });
              }} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Select label="Correct" value={questionCrud.questionForm.correctAnswer} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, correctAnswer: e.target.value })} options={questionCrud.questionForm.options.map((option: { label: string }) => ({ value: option.label, label: option.label }))} />
            <Input label="Marks" type="number" value={String(questionCrud.questionForm.marks)} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, marks: Number(e.target.value) })} />
            <Input label="Negative" type="number" value={String(questionCrud.questionForm.negativeMarks)} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, negativeMarks: Number(e.target.value) })} />
          </div>
          <div className="rounded-xl border border-dashed border-tb-gray-200 bg-tb-gray-50 p-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold text-tb-navy">Attachment</p>
                <p className="text-[11px] text-tb-gray-500">Upload image or PDF for this question.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-white border border-tb-gray-200 px-3 py-2 text-xs font-bold text-tb-gray-600 hover:border-tb-blue hover:text-tb-blue">
                <Upload className="w-4 h-4" />Upload
                <input type="file" accept=".pdf,application/pdf,image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.type.startsWith('image/')) {
                    questionCrud.readDataFile(file, (dataUrl: string) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, image: dataUrl, attachmentUrl: dataUrl, attachmentType: 'image' }));
                  } else if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                    questionCrud.readDataFile(file, (dataUrl: string) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, attachmentUrl: dataUrl, attachmentType: 'pdf' }));
                  }
                  e.currentTarget.value = '';
                }} />
              </label>
            </div>
            {questionCrud.questionForm.attachmentUrl && (
              <div className="mt-3 overflow-hidden rounded-lg border border-tb-gray-200 bg-white">
                {questionCrud.questionForm.attachmentType === 'image' ? (
                  <img src={questionCrud.questionForm.attachmentUrl} alt="Question attachment" className="max-h-40 w-full object-contain p-2" />
                ) : (
                  <div className="flex items-center justify-between gap-3 p-3 text-xs text-tb-gray-600">
                    <span>PDF attached</span>
                    <a href={questionCrud.questionForm.attachmentUrl} target="_blank" rel="noreferrer" className="font-bold text-tb-blue">Preview</a>
                  </div>
                )}
              </div>
            )}
          </div>
          <Textarea label="Explanation" value={questionCrud.questionForm.explanation} onChange={(e) => questionCrud.setQuestionForm({ ...questionCrud.questionForm, explanation: e.target.value })} rows={2} />
          <Button onClick={questionCrud.handleCreateQuestion} className="w-full"><Plus className="w-4 h-4" />Add Question</Button>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-tb-navy">Bulk Add Content</h3>
          <p className="text-xs text-tb-gray-500">Use one line per subject/topic, or paste a JSON array for questions.</p>
        </div>
        <Badge variant="info">Bulk tools</Badge>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-tb-gray-500">Subjects</h4>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-tb-gray-200 px-2.5 py-1.5 text-[11px] font-bold text-tb-gray-600 hover:border-tb-blue hover:text-tb-blue">
              <Upload className="w-3.5 h-3.5" />Upload .txt
              <input type="file" accept=".txt,text/plain" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) subjectCrud.readTextFile(file, subjectCrud.setBulkSubjectsText); e.currentTarget.value = ''; }} />
            </label>
          </div>
          <Textarea label="One per line" value={subjectCrud.bulkSubjectsText} onChange={(e) => subjectCrud.setBulkSubjectsText(e.target.value)} rows={7} placeholder={'SubjectName | Description'} />
          <Button onClick={subjectCrud.handleBulkCreateSubjects} className="w-full mt-3"><Plus className="w-4 h-4" />Add Subjects</Button>
        </div>

        <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-tb-gray-500">Topics</h4>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-tb-gray-200 px-2.5 py-1.5 text-[11px] font-bold text-tb-gray-600 hover:border-tb-blue hover:text-tb-blue">
              <Upload className="w-3.5 h-3.5" />Upload .txt
              <input type="file" accept=".txt,text/plain" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) topicCrud.readTextFile(file, topicCrud.setBulkTopicsText); e.currentTarget.value = ''; }} />
            </label>
          </div>
          <Select label="Subject" value={topicCrud.bulkTopicSubjectId} onChange={(e) => topicCrud.setBulkTopicSubjectId(e.target.value)} options={[{ value: '', label: 'Select Subject' }, ...contentSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
          <div className="mt-3">
            <Textarea label="One per line" value={topicCrud.bulkTopicsText} onChange={(e) => topicCrud.setBulkTopicsText(e.target.value)} rows={5} placeholder={'TopicName | Description'} />
          </div>
          <Button onClick={topicCrud.handleBulkCreateTopics} className="w-full mt-3"><Plus className="w-4 h-4" />Add Topics</Button>
        </div>

        <div className="rounded-xl border border-white bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wide text-tb-gray-500">Questions</h4>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-tb-gray-200 px-2.5 py-1.5 text-[11px] font-bold text-tb-gray-600 hover:border-tb-blue hover:text-tb-blue">
              <Upload className="w-3.5 h-3.5" />Upload File
              <input type="file" accept=".json,.txt,.pdf,application/json,application/pdf,text/plain,image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) questionCrud.handleQuestionFileUpload(file); e.currentTarget.value = ''; }} />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Select label="Default Subject" value={questionCrud.bulkQuestionSubject} onChange={(e) => { questionCrud.setBulkQuestionSubject(e.target.value); questionCrud.setBulkQuestionTopic(''); }} options={[{ value: '', label: 'In JSON' }, ...contentSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
            <Select label="Default Topic" value={questionCrud.bulkQuestionTopic} onChange={(e) => questionCrud.setBulkQuestionTopic(e.target.value)} options={[{ value: '', label: 'In JSON' }, ...bulkQuestionTopics.map((t: ITopic) => ({ value: t._id, label: t.name }))]} />
            <Select label="Default Section" value={questionCrud.bulkQuestionSection} onChange={(e) => questionCrud.setBulkQuestionSection(e.target.value)} options={[{ value: '', label: 'General' }, ...(contentTest?.sections || []).map((sec: any) => ({ value: sec.name, label: sec.name }))]} />
          </div>
          <div className="mt-3 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-tb-blue" />
                  <p className="text-xs font-bold text-tb-navy">PDF Upload + Auto Extraction</p>
                </div>
                <p className="mt-1 text-[11px] text-tb-gray-500">Text PDF se questions parse honge. Scanned PDF ke liye OCR backend/API key chahiye.</p>
              </div>
              <label className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-tb-blue px-3 py-2 text-xs font-bold text-white hover:bg-blue-700">
                <Upload className="w-4 h-4" />Upload PDF
                <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) questionCrud.handlePdfImportUpload(file); e.currentTarget.value = ''; }} />
              </label>
            </div>
            {(questionCrud.pdfImportFileName || questionCrud.pdfImportStatus) && (
              <div className="mt-3 rounded-lg border border-blue-100 bg-white p-3 text-xs text-tb-gray-600">
                {questionCrud.pdfImportFileName && <p className="font-semibold text-tb-navy">{questionCrud.pdfImportFileName}</p>}
                <p className="mt-1">{questionCrud.pdfImportLoading ? 'Extracting...' : questionCrud.pdfImportStatus}</p>
              </div>
            )}

            {questionCrud.pdfExtractionResult && questionCrud.pdfExtractionResult.requiresOCR && (
              <div className="mt-3 space-y-2">
                <div className={`rounded-lg border p-3 text-xs ${
                  questionCrud.pdfExtractionResult.quality.score >= 40
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`font-bold ${
                      questionCrud.pdfExtractionResult.quality.score >= 40
                        ? 'text-amber-700' : 'text-red-700'
                    }`}>
                      {questionCrud.pdfExtractionResult.isMathContent ? 'Math content detected' : 'Extraction quality low'}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                      questionCrud.pdfExtractionResult.quality.score >= 40
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      Score: {questionCrud.pdfExtractionResult.quality.score}%
                    </span>
                  </div>
                  {questionCrud.pdfExtractionResult.quality.issues.map((issue: string, i: number) => (
                    <p key={i} className="text-tb-gray-600 mt-0.5">{issue}</p>
                  ))}
                  <div className="flex gap-2 mt-3">
                    <Button
                      onClick={questionCrud.handleRetryWithOCR}
                      disabled={questionCrud.pdfOcrInProgress}
                      isLoading={questionCrud.pdfOcrInProgress}
                      variant="orange"
                      size="sm"
                    >
                      {questionCrud.pdfOcrInProgress ? 'Normalizing...' : 'Retry with OCR Normalization'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-3 rounded-xl border border-dashed border-emerald-200 bg-emerald-50/60 p-3">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-emerald-600" />
              <p className="text-xs font-bold text-tb-navy">Paragraph JSON → Questions</p>
            </div>
            <p className="text-[11px] text-tb-gray-500 mb-2">PDF extraction se aaya paragraph JSON paste karo. Position ke hisaab se sort hoga aur MCQ format mein convert ho jayega.</p>
            <Textarea value={questionCrud.paragraphJson} onChange={(e) => questionCrud.setParagraphJson(e.target.value)} rows={4} placeholder='Paste paragraph JSON array here...' />
            <Button onClick={questionCrud.handleParagraphJsonConvert} className="w-full mt-2" size="sm"><FileText className="w-4 h-4" />Convert to Questions</Button>
          </div>
          <div className="mt-3">
            <Textarea label="JSON array / generated upload data" value={questionCrud.bulkQuestionsJson} onChange={(e) => questionCrud.setBulkQuestionsJson(e.target.value)} rows={5} placeholder='Paste JSON array here...' />
            <p className="mt-1 text-[11px] text-tb-gray-500">PDF upload / Paragraph JSON numbered MCQ format se questions extract karta hai: Q1/1. question, A)/(A)/Option A options, Answer: B.</p>
          </div>
          {questionCrud.bulkQuestionCount > 0 && (
            <div className="mt-3 rounded-xl border border-tb-gray-100 bg-tb-gray-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-tb-navy">Preview</p>
                <Badge variant="success">{questionCrud.bulkQuestionCount} ready</Badge>
              </div>
              <div className="space-y-2">
                {questionCrud.bulkQuestionPreview.map((item: any, index: number) => (
                  <div key={`${item.text}-${index}`} className="rounded-lg bg-white p-2 text-xs">
                    <p className="line-clamp-2 font-semibold text-tb-navy">{index + 1}. {item.text}</p>
                    <p className="mt-1 text-tb-gray-500">{item.subject || 'Default subject'} / {item.topic || 'Default topic'} / Section: {item.section || questionCrud.bulkQuestionSection || 'General'} / Answer: {item.correctAnswer || 'A'} {item.image ? '🖼️' : item.attachmentUrl ? '📎' : ''}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-green-700"><CheckCircle className="h-3.5 w-3.5" />Admin JSON edit karke final import kar sakta hai.</p>
            </div>
          )}
          <Button onClick={questionCrud.handleBulkCreateQuestions} className="w-full mt-3" isLoading={questionCrud.pdfImportLoading}><Plus className="w-4 h-4" />Import Questions</Button>
        </div>
      </div>
    </div>

    <div className="rounded-xl border border-tb-gray-200 bg-white p-4">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-tb-navy">Existing Questions</h3>
          <p className="text-xs text-tb-gray-500">Selected test ke questions yahan se delete kar sakte ho.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{questionCrud.contentQuestions.length} questions</Badge>
          <Button variant="secondary" size="sm" onClick={questionCrud.loadContentQuestions}>Refresh</Button>
          {questionCrud.contentQuestions.length > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={questionCrud.handleDeleteAllContentQuestions}
              isLoading={questionCrud.deletingAllQuestions}
              disabled={questionCrud.deletingAllQuestions}
            >
              <Trash2 className="h-4 w-4" />Delete All
            </Button>
          )}
        </div>
      </div>
      {questionCrud.contentQuestionsLoading ? (
        <div className="rounded-xl border border-dashed border-tb-gray-200 bg-tb-gray-50 p-4 text-sm text-tb-gray-500">Loading questions...</div>
      ) : questionCrud.contentQuestions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-tb-gray-200 bg-tb-gray-50 p-4 text-sm text-tb-gray-500">No questions added yet.</div>
      ) : (
        <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
          {questionCrud.contentQuestions.map((question: any, index: number) => {
            const sectionOpts = (contentTest?.sections || []).length > 0
              ? [{ value: 'General', label: 'General' }, ...(contentTest?.sections || []).map((sec: any) => ({ value: sec.name, label: sec.name }))]
              : [];
            return (
            <div key={question._id || index} className="rounded-xl border border-tb-gray-100 bg-tb-gray-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-tb-blue">Q{index + 1}</span>
                    <Badge variant="info">{question.difficulty || 'medium'}</Badge>
                    <span className="text-[11px] text-tb-gray-500">Answer: {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer || 'A'}{question.negativeMarks ? ` | -${question.negativeMarks}` : ''}</span>
                    {question.image ? <span title="Has image">🖼️</span> : question.attachmentUrl ? <span title="Has attachment">📎</span> : null}
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold text-tb-navy">{question.text || 'Untitled question'}</p>
                  {Array.isArray(question.options) && question.options.length > 0 && (
                    <p className="mt-1 line-clamp-1 text-xs text-tb-gray-500">
                      {question.options.map((option: any) => `${option.label || ''}. ${option.text || option}`).join(' | ')}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <Select
                      value={question.section || 'General'}
                      onChange={(e) => questionCrud.handleUpdateQuestionSection(question._id, e.target.value)}
                      options={sectionOpts.length ? sectionOpts : [{ value: question.section || 'General', label: question.section || 'General' }]}
                      className="w-40"
                    />
                    <span className="text-xs text-tb-gray-400">Section</span>
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => questionCrud.handleDeleteContentQuestion(question._id)}
                  isLoading={questionCrud.deletingQuestionId === question._id}
                  disabled={questionCrud.deletingQuestionId === question._id}
                >
                  <Trash2 className="h-4 w-4" />Delete
                </Button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  </div>
  );
};

export default TestContentPanel;
