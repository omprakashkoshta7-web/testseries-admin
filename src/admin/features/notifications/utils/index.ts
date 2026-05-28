export const getTypeBadge = (type: string) => {
  const map: Record<string, string> = {
    test_launch: 'bg-purple-100 text-purple-700',
    result: 'bg-green-100 text-green-700',
    promotional: 'bg-orange-100 text-orange-700',
    system: 'bg-blue-100 text-blue-700',
    reminder: 'bg-yellow-100 text-yellow-700',
  };
  return map[type] || 'bg-gray-100 text-gray-700';
};

export const getStatusBadge = (status: string) => {
  if (status === 'draft') return 'warning';
  if (status === 'sent') return 'success';
  if (status === 'failed') return 'error';
  return 'warning';
};

export const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};
