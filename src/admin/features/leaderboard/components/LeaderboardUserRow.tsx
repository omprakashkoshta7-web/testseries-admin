import React from 'react';
import { Trophy, Medal, Award } from '@shared/icons';
import type { ILeaderboardEntry } from '../../../types';

interface Props {
  entry: ILeaderboardEntry;
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
  return null;
};

const getRankDisplay = (entry: ILeaderboardEntry) => {
  const icon = getRankIcon(entry.rank);
  return (
    <div className="flex items-center gap-2">
      {icon ? (
        icon
      ) : (
        <span className="text-tb-gray-500 dark:text-gray-400 font-mono text-sm w-5 text-center">{entry.rank}</span>
      )}
    </div>
  );
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const LeaderboardUserRow: React.FC<Props> = ({ entry }) => {
  return (
    <tr className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
      <td className="px-4 py-3">{getRankDisplay(entry)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          {entry.avatar ? (
            <img src={entry.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-tb-blue-light text-tb-blue flex items-center justify-center text-xs font-bold">
              {entry.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-medium text-tb-navy dark:text-white">{entry.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{entry.email}</td>
      <td className="px-4 py-3 text-tb-navy dark:text-white font-medium">{entry.totalScore.toLocaleString()}</td>
      <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{entry.testsCompleted}</td>
      <td className="px-4 py-3">
        <span className="text-tb-navy dark:text-white font-medium">{entry.avgScore.toFixed(1)}%</span>
      </td>
      <td className="px-4 py-3 text-tb-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">{formatDate(entry.lastActive)}</td>
    </tr>
  );
};

export default LeaderboardUserRow;
