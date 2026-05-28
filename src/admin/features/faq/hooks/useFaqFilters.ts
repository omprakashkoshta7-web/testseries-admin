import { useState, useMemo } from 'react';
import type { IFaq } from '../../../types';

export const useFaqFilters = (faqs: IFaq[]) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredFaqs = useMemo(() => faqs.filter((f) => {
    const matchesSearch = f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !categoryFilter || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }), [faqs, search, categoryFilter]);

  return { search, setSearch, categoryFilter, setCategoryFilter, filteredFaqs };
};
