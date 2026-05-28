import React, { useState, useRef } from 'react';
import adminApiClient from '../../../utils/apiClient';
import { useToast } from '../../../utils/ToastContext';
import { Button, Badge } from '@shared/components';
import { Upload, FileText, AlertCircle, Loader2, Copy, Check } from '@shared/icons';
import PageHeader from '../../../components/PageHeader';

const AdminPdfImportPage: React.FC = () => {
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFile(f || null);
    setExtractedText(null);
    setError(null);
  };

  const handleExtract = async () => {
    if (!file) { showToast('Select a PDF file first', 'error'); return; }

    setLoading(true);
    setError(null);
    setExtractedText(null);

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('mode', 'preview');

    try {
      const res = await adminApiClient.post('/pdf/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 300000,
      });
      const data = res.data.data;
      setExtractedText(data.rawTextPreview || 'No text extracted');
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Extraction failed';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast('Copy failed', 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="PDF Extract"
        subtitle="Upload a PDF and extract text content via API"
      />

      <div className="admin-card-solid p-6 space-y-5">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
          <input ref={fileRef} type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
          {file ? (
            <div className="space-y-3">
              <FileText className="w-10 h-10 mx-auto text-blue-500" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => fileRef.current?.click()}>Change</Button>
                <Button onClick={handleExtract} disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {loading ? 'Extracting...' : 'Extract Text'}
                </Button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => fileRef.current?.click()} className="space-y-2 cursor-pointer w-full">
              <Upload className="w-10 h-10 mx-auto text-gray-400" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload PDF</p>
              <p className="text-xs text-gray-500">Supports math equations via scribe.js-ocr</p>
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {extractedText && (
        <div className="admin-card-solid p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Extracted Text</h2>
            <div className="flex gap-2">
              <Badge variant="success">{extractedText.length} chars</Badge>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>
          <pre className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 text-sm leading-relaxed whitespace-pre-wrap font-mono max-h-[500px] overflow-y-auto">
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AdminPdfImportPage;
