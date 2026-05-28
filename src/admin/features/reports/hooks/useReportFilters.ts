import { useEffect, useState } from 'react';
import type { Tab } from './useReports';

export function useReportFilters() {
  const [activeTab, setActiveTab] = useState<Tab>('results');
  const [selectedTestId, setSelectedTestId] = useState('');
  const [selectedAttemptTestId, setSelectedAttemptTestId] = useState('');
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [reportType, setReportType] = useState('summary');

  useEffect(() => { setPage(1); }, [selectedTestId]);

  return {
    activeTab, setActiveTab,
    selectedTestId, setSelectedTestId,
    selectedAttemptTestId, setSelectedAttemptTestId,
    page, setPage,
    dateRange, setDateRange,
    reportType, setReportType,
  };
}
