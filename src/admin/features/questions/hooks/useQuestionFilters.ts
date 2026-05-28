import { useState, useEffect, useCallback } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { fetchQuestions } from '../store/questions.slice';

export const useQuestionFilters = () => {
  const dispatch = useAdminDispatch();

  const [search, setSearch] = useState('');
  const [filterTestId, setFilterTestId] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);

  const loadQuestions = useCallback(() => {
    dispatch(fetchQuestions({ search, testId: filterTestId, category: filterCategory, subject: filterSubject, type: typeFilter, page, limit: 12 }));
  }, [dispatch, search, filterTestId, filterCategory, filterSubject, typeFilter, page]);

  useEffect(() => { loadQuestions(); }, [loadQuestions]);
  useEffect(() => { setPage(1); }, [search, filterTestId, filterCategory, filterSubject, typeFilter]);

  const resetFilters = useCallback(() => {
    setSearch('');
    setFilterTestId('');
    setFilterCategory('');
    setFilterSubject('');
    setTypeFilter('');
    setPage(1);
  }, []);

  return {
    search, setSearch,
    filterTestId, setFilterTestId,
    filterCategory, setFilterCategory,
    filterSubject, setFilterSubject,
    typeFilter, setTypeFilter,
    page, setPage,
    resetFilters,
  };
};
