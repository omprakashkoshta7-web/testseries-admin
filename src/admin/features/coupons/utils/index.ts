export const matchesCouponsSearch = (values: Array<string | number | null | undefined>, search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch));
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};