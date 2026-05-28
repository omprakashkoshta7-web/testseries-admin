import React from 'react';
import { Modal, Button, Input, Select, Textarea } from '@shared/components';
import { AlertCircle } from '@shared/icons';
import { categoryOptions } from '../constants';
import type { IAdminSubject, IAdminStudyMaterial } from '../../../types';

interface PdfUploadPayload {
  name: string;
  type: string;
  data: string;
}

interface MaterialFormData {
  title: string; description: string; subject: string; category: string; chapter: string;
  duration: number; author: string; tags: string; content: string; pdfUrl: string; videoUrl: string; isActive: boolean;
  pdfUpload: PdfUploadPayload | null;
}

interface StudyMaterialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  materialForm: MaterialFormData;
  onChange: (form: MaterialFormData) => void;
  onSubmit: () => void;
  onPdfUpload: (file: File | null) => void;
  onNotesUpload: (file: File | null) => void;
  editingMaterial: IAdminStudyMaterial | null;
  subjects: IAdminSubject[];
  actionError: string | null;
  pdfFileName: string;
  notesFileName: string;
}

const StudyMaterialFormModal: React.FC<StudyMaterialFormModalProps> = ({
  isOpen, onClose, materialForm, onChange, onSubmit, onPdfUpload, onNotesUpload, editingMaterial, subjects, actionError, pdfFileName, notesFileName,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingMaterial ? 'Edit Material' : 'Add Material'} size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>{editingMaterial ? 'Update' : 'Create'}</Button>
        </div>
      }>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {actionError && <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" /><p className="text-sm text-red-600">{actionError}</p></div>}
        <Input label="Title" value={materialForm.title} onChange={(e) => onChange({ ...materialForm, title: e.target.value })} required />
        <Textarea label="Description" value={materialForm.description} onChange={(e) => onChange({ ...materialForm, description: e.target.value })} rows={2} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Subject" options={[{ value: '', label: 'Select Subject' }, ...subjects.map((s: IAdminSubject) => ({ value: s.id, label: s.name }))]} value={materialForm.subject} onChange={(e) => onChange({ ...materialForm, subject: e.target.value })} />
          <Select label="Category" options={categoryOptions} value={materialForm.category} onChange={(e) => onChange({ ...materialForm, category: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Chapter" value={materialForm.chapter} onChange={(e) => onChange({ ...materialForm, chapter: e.target.value })} />
          <Input label="Duration (min)" type="number" value={materialForm.duration} onChange={(e) => onChange({ ...materialForm, duration: Number(e.target.value) })} />
        </div>
        <Input label="Author" value={materialForm.author} onChange={(e) => onChange({ ...materialForm, author: e.target.value })} />
        <Input label="Tags (comma separated)" value={materialForm.tags} onChange={(e) => onChange({ ...materialForm, tags: e.target.value })} />
        <div>
          <Textarea label="Content / Notes" value={materialForm.content} onChange={(e) => onChange({ ...materialForm, content: e.target.value })} rows={4} className="font-mono" />
          <div className="mt-2">
            <label className="block text-sm font-medium text-secondary-700 mb-1.5">Upload Notes</label>
            <input
              type="file"
              accept=".txt,.md,.markdown,text/plain,text/markdown"
              onChange={(e) => onNotesUpload(e.target.files?.[0] || null)}
              className="block w-full text-sm text-tb-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-tb-blue-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-tb-blue hover:file:bg-blue-100"
            />
            {notesFileName && <p className="mt-1 text-xs text-tb-gray-400">Loaded: {notesFileName}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="PDF URL" value={materialForm.pdfUrl} onChange={(e) => onChange({ ...materialForm, pdfUrl: e.target.value })} />
          <Input label="Video URL" value={materialForm.videoUrl} onChange={(e) => onChange({ ...materialForm, videoUrl: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1.5">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => onPdfUpload(e.target.files?.[0] || null)}
            className="block w-full text-sm text-tb-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-tb-blue-light file:px-4 file:py-2 file:text-sm file:font-semibold file:text-tb-blue hover:file:bg-blue-100"
          />
          {pdfFileName && <p className="mt-1 text-xs text-tb-gray-400">Selected: {pdfFileName}</p>}
        </div>
        <div className="flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={materialForm.isActive} onChange={(e) => onChange({ ...materialForm, isActive: e.target.checked })} />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-tb-blue" />
          </label>
          <span className="text-sm font-medium text-tb-navy dark:text-white">Active</span>
        </div>
      </div>
    </Modal>
  );
};

export default StudyMaterialFormModal;
