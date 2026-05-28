import React, { useState } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, XCircle, Download, RotateCcw } from '@shared/icons';
import { Button, Badge } from '@shared/components';
import { formatQualityDisplay, getOCRRecommendation, getRecommendedOCRProvider, type QualityCheckResult } from '../utils/pdfQualityChecker';

interface PdfExtractionQualityProps {
  quality: QualityCheckResult;
  fileName: string;
  extractedText: string;
  onRetryWithOCR?: () => void;
  onProceed?: () => void;
  isProcessing?: boolean;
  ocrInProgress?: boolean;
}

const statusIcons = {
  excellent: <CheckCircle className="w-5 h-5 text-green-600" />,
  good: <CheckCircle className="w-5 h-5 text-blue-600" />,
  poor: <AlertTriangle className="w-5 h-5 text-amber-600" />,
  critical: <XCircle className="w-5 h-5 text-red-600" />,
};

const statusBgColor = {
  excellent: 'bg-green-50 border-green-200',
  good: 'bg-blue-50 border-blue-200',
  poor: 'bg-amber-50 border-amber-200',
  critical: 'bg-red-50 border-red-200',
};

const statusBadgeVariant = {
  excellent: 'success' as const,
  good: 'info' as const,
  poor: 'warning' as const,
  critical: 'error' as const,
};

const PdfExtractionQuality: React.FC<PdfExtractionQualityProps> = ({
  quality,
  fileName,
  extractedText,
  onRetryWithOCR,
  onProceed,
  isProcessing = false,
  ocrInProgress = false,
}) => {
  const [showDetails, setShowDetails] = useState(quality.quality === 'poor' || quality.quality === 'critical');
  const display = formatQualityDisplay(quality);
  const ocrRecommendation = getOCRRecommendation(quality);
  const recommendedProvider = quality.needsOCR ? getRecommendedOCRProvider(extractedText) : null;

  const canProceed = quality.quality === 'excellent' || quality.quality === 'good';
  const shouldShowOCROption = quality.needsOCR && onRetryWithOCR;

  return (
    <div className="space-y-4">
      {/* Quality Summary Card */}
      <div className={`border rounded-lg p-4 ${statusBgColor[quality.quality]}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1">{statusIcons[quality.quality]}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-tb-navy">Extraction Quality: {display.label}</h3>
                <Badge variant={statusBadgeVariant[quality.quality]}>
                  {quality.score}%
                </Badge>
              </div>
              <p className="text-sm text-tb-gray-600 mt-1">{display.message}</p>

              {/* Issues List */}
              {quality.issues.length > 0 && (
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-tb-blue hover:underline mt-2 font-medium"
                >
                  {showDetails ? '▼' : '▶'} Details ({quality.issues.length} {quality.issues.length === 1 ? 'issue' : 'issues'})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Issues */}
        {showDetails && quality.issues.length > 0 && (
          <div className="mt-4 pt-4 border-t border-current border-opacity-10">
            <ul className="space-y-1 text-xs text-tb-gray-700">
              {quality.issues.map((issue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-current opacity-50 mt-0.5">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* File Info */}
        <div className="mt-3 text-xs text-tb-gray-600">
          <span className="inline-block">📄 {fileName}</span>
          <span className="mx-2">•</span>
          <span className="inline-block">{extractedText.length} characters</span>
        </div>
      </div>

      {/* OCR Recommendation */}
      {shouldShowOCROption && ocrRecommendation && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm text-amber-900">{ocrRecommendation}</p>
              {recommendedProvider && (
                <p className="text-xs text-amber-700 mt-1">
                  Recommended: <strong>{recommendedProvider === 'mathpix' ? 'Mathpix' : recommendedProvider === 'pix2text' ? 'Pix2Text' : 'Tesseract'}</strong> for better math symbol recognition
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {shouldShowOCROption && (
          <Button
            onClick={onRetryWithOCR}
            disabled={isProcessing || ocrInProgress}
            isLoading={ocrInProgress}
            variant="orange"
            size="sm"
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            {ocrInProgress ? 'Processing with OCR...' : 'Retry with OCR'}
          </Button>
        )}

        {canProceed && onProceed && (
          <Button
            onClick={onProceed}
            disabled={isProcessing}
            variant="primary"
            size="sm"
            className={shouldShowOCROption ? '' : 'flex-1'}
          >
            <CheckCircle className="w-4 h-4" />
            Proceed
          </Button>
        )}

        {!canProceed && !shouldShowOCROption && (
          <div className="flex-1 text-center text-sm text-tb-gray-600 py-2">
            PDF extraction failed. Please try uploading a different file.
          </div>
        )}
      </div>

      {/* Preview Section */}
      <details className="border border-tb-gray-200 rounded-lg">
        <summary className="cursor-pointer p-3 font-medium text-sm text-tb-navy hover:bg-tb-gray-50 select-none">
          👁 Preview Extracted Text
        </summary>
        <div className="max-h-48 overflow-y-auto bg-tb-gray-50 p-4 border-t border-tb-gray-200">
          <pre className="text-xs text-tb-gray-600 whitespace-pre-wrap break-words font-mono">
            {extractedText.slice(0, 500)}
            {extractedText.length > 500 && '...'}
          </pre>
        </div>
      </details>
    </div>
  );
};

export default PdfExtractionQuality;
