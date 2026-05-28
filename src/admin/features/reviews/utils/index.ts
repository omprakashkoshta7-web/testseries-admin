export const formatReviewStatus = (status: string): string =>
  status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');

export const truncateId = (id: string, max = 20): string =>
  id.length > max ? `${id.slice(0, max)}...` : id;
