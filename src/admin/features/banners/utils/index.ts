export const matchesBannersSearch = (values: Array<string | number | null | undefined>, search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch));
};

export const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};