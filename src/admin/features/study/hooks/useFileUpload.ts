import { useState } from 'react';

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== 'string') reject(new Error('Could not read file'));
      else resolve(result);
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });

const isBinaryPdfContent = (content: string) => {
  const sample = content.slice(0, 1200);
  const replacementCount = (sample.match(/\uFFFD/g) || []).length;
  return sample.startsWith('%PDF') || sample.includes('/Type /Page') || replacementCount > 20;
};

export const useFileUpload = (
  setMaterialForm: React.Dispatch<React.SetStateAction<any>>,
  setActionError: (err: string | null) => void,
) => {
  const [pdfFileName, setPdfFileName] = useState('');
  const [notesFileName, setNotesFileName] = useState('');

  const handlePdfUpload = async (file: File | null) => {
    setActionError(null);
    if (!file) {
      setPdfFileName('');
      setMaterialForm((form: any) => ({ ...form, pdfUpload: null }));
      return;
    }
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setActionError('Please select a PDF file');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setActionError('PDF file must be 25MB or smaller');
      return;
    }
    try {
      const data = await fileToBase64(file);
      setPdfFileName(file.name);
      setMaterialForm((form: any) => ({
        ...form,
        category: form.category === 'notes' ? 'pdf' : form.category,
        content: isBinaryPdfContent(form.content) ? '' : form.content,
        pdfUpload: { name: file.name, type: file.type || 'application/pdf', data },
      }));
    } catch (e: any) {
      setActionError(e?.message || 'Failed to read PDF file');
    }
  };

  const handleNotesUpload = async (file: File | null) => {
    setActionError(null);
    if (!file) {
      setNotesFileName('');
      return;
    }
    try {
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        setActionError('Use Upload PDF for PDF files');
        return;
      }
      const content = await file.text();
      setNotesFileName(file.name);
      setMaterialForm((form: any) => ({
        ...form,
        category: form.category === 'pdf' ? 'notes' : form.category,
        content,
      }));
    } catch {
      setActionError('Failed to read notes file');
    }
  };

  return {
    pdfFileName,
    setPdfFileName,
    notesFileName,
    setNotesFileName,
    handlePdfUpload,
    handleNotesUpload,
  };
};
