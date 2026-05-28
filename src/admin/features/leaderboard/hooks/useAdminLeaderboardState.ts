import { useAdminSelector } from '../../../store/hooks';

export const useAdminLeaderboardState = () => useAdminSelector((state: any) => state.leaderboard);
