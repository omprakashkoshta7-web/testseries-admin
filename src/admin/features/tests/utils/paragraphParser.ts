export const parseParagraphJson = (jsonStr: string): { questions: string; error?: string } => {
  let paragraphs: any[];
  try {
    paragraphs = JSON.parse(jsonStr);
  } catch {
    return { questions: '', error: 'Invalid JSON format' };
  }

  if (!Array.isArray(paragraphs) || paragraphs.length === 0) {
    return { questions: '', error: 'JSON must be a non-empty array' };
  }

  const sorted = [...paragraphs].sort((a, b) => {
    const pageA = a.page_id ?? 0;
    const pageB = b.page_id ?? 0;
    if (pageA !== pageB) return pageA - pageB;
    const yA = Array.isArray(a.position) ? a.position[1] ?? 0 : 0;
    const yB = Array.isArray(b.position) ? b.position[1] ?? 0 : 0;
    if (yA !== yB) return yA - yB;
    const xA = Array.isArray(a.position) ? a.position[0] ?? 0 : 0;
    const xB = Array.isArray(b.position) ? b.position[0] ?? 0 : 0;
    return xA - xB;
  });

  const combined = sorted.map((p) => (p.text || '')).join('\n');

  return { questions: combined };
};
