import { useState, useMemo } from 'react';
import type { IBanner } from '../../../types';

export const useBannerFilters = (banners: IBanner[]) => {
  const [search, setSearch] = useState('');
  const [positionFilter, setPositionFilter] = useState('');

  const filteredBanners = useMemo(() => banners.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      (b.subtitle || '').toLowerCase().includes(search.toLowerCase());
    const matchesPosition = !positionFilter || b.position === positionFilter;
    return matchesSearch && matchesPosition;
  }), [banners, search, positionFilter]);

  return { search, setSearch, positionFilter, setPositionFilter, filteredBanners };
};
