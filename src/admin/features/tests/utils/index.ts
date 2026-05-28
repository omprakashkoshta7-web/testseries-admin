export const matchesTestsSearch = (values: Array<string | number | null | undefined>, search: string) => {
  const normalizedSearch = search.trim().toLowerCase();
  if (!normalizedSearch) return true;
  return values.some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch));
};

export * from './pdfParser';
export * from './helpers';
export * from './paragraphParser';
