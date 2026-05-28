import React from 'react';
import { Button, Modal } from '@shared/components';
import { Upload } from '@shared/icons';

interface QuestionBulkUploadProps {
  isOpen: boolean;
  onClose: () => void;
  bulkJson: string;
  onBulkJsonChange: (value: string) => void;
  onUpload: () => void;
}

const QuestionBulkUpload: React.FC<QuestionBulkUploadProps> = ({
  isOpen,
  onClose,
  bulkJson,
  onBulkJsonChange,
  onUpload,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Bulk Upload Questions"
      size="lg"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onUpload}>
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1.5">Paste JSON Array</label>
          <textarea
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-y"
            rows={12}
            value={bulkJson}
            onChange={(e) => onBulkJsonChange(e.target.value)}
            placeholder='Paste JSON array here...'
          />
          <p className="text-xs text-tb-gray-500 dark:text-gray-400">
              Each question object must have: text, type, section, category, subject, difficulty, marks. For MCQ types include options and correctAnswer. For integer types include correctAnswer (number).
            </p>
      </div>
      </div>
    </Modal>
  );
};

export default QuestionBulkUpload;
