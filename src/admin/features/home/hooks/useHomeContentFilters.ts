import { useMemo } from 'react';

const sectionOrder = ['hero', 'features', 'stats', 'testimonials', 'cta', 'footer', 'general'];

export const useHomeContentFilters = (items: any[], search: string) => {
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((item) =>
      item.key.toLowerCase().includes(q) ||
      item.label.toLowerCase().includes(q) ||
      item.section.toLowerCase().includes(q)
    );
  }, [items, search]);

  const grouped = useMemo(() => {
    const acc: Record<string, any[]> = {};
    filtered.forEach((item: any) => {
      if (!acc[item.section]) acc[item.section] = [];
      acc[item.section].push(item);
    });
    return acc;
  }, [filtered]);

  const sortedSections = useMemo(() => {
    return Object.keys(grouped).sort(
      (a, b) => sectionOrder.indexOf(a) - sectionOrder.indexOf(b)
    );
  }, [grouped]);

  return { filtered, grouped, sortedSections };
};
