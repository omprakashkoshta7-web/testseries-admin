import { useEffect, useState, useCallback } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import {
  fetchResults,
  generateRanks,
  fetchRevenueReport,
  fetchAttemptReport,
  downloadReportCsv,
} from '../store/reports.slice';
import { selectReportPeriod } from '../store/reports.selectors';
import adminApiClient from '../../../utils/apiClient';
import type { ITest } from '../../../types';
import { useToast } from '../../../utils/ToastContext';

export type Tab = 'results' | 'revenue' | 'attempts';

export function useReports(activeTab: Tab, selectedTestId: string, selectedAttemptTestId: string, page: number) {
  const dispatch = useAdminDispatch();
  const period = useAdminSelector(selectReportPeriod);
  const { showToast } = useToast();

  const [tests, setTests] = useState<ITest[]>([]);
  const [rankLoading, setRankLoading] = useState(false);

  useEffect(() => {
    adminApiClient.get('/tests?limit=100').then((res) => {
      const data = res.data.data || res.data;
      setTests(data.tests || data);
    }).catch(() => {});
  }, []);

  const loadResults = useCallback(() => {
    dispatch(fetchResults({ testId: selectedTestId || undefined, page, limit: 20 }));
  }, [dispatch, selectedTestId, page]);

  useEffect(() => { if (activeTab === 'results') loadResults(); }, [loadResults, activeTab]);

  useEffect(() => {
    if (activeTab === 'revenue') dispatch(fetchRevenueReport(period));
  }, [dispatch, activeTab, period]);

  useEffect(() => {
    if (activeTab === 'attempts') dispatch(fetchAttemptReport(selectedAttemptTestId || undefined));
  }, [dispatch, activeTab, selectedAttemptTestId]);

  const handleGenerateRanks = async () => {
    if (!selectedTestId) return;
    setRankLoading(true);
    try {
      await dispatch(generateRanks(selectedTestId)).unwrap();
      showToast('Ranks generated successfully');
    } catch {
      showToast('Failed to generate ranks', 'error');
    }
    setRankLoading(false);
  };

  const handleExportCsv = async () => {
    try {
      await dispatch(downloadReportCsv('results')).unwrap();
      showToast('CSV exported successfully');
    } catch {
      showToast('Failed to export CSV', 'error');
    }
  };

  return {
    tests,
    rankLoading,
    handleGenerateRanks,
    handleExportCsv,
  };
}
