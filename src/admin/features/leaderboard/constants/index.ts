export const LEADERBOARD_PAGE_LIMIT = 20;

export const TIME_FILTERS = ['all', 'daily', 'weekly', 'monthly'] as const;

export const TIME_FILTER_LABELS: Record<string, string> = {
  all: 'All Time',
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
};
