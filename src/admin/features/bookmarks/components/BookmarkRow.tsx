import React from 'react';
import { Bookmark, Users } from '@shared/icons';

interface BookmarkRowProps {
  user: {
    _id: string;
    name: string;
    email: string;
    bookmarkedCount: number;
  };
}

const BookmarkRow: React.FC<BookmarkRowProps> = ({ user }) => (
  <tr key={user._id} className="hover:bg-tb-gray-50/50 dark:hover:bg-gray-700/50 transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-tb-gray-400" />
        <span className="font-medium text-tb-navy dark:text-white">{user.name}</span>
      </div>
    </td>
    <td className="px-4 py-3 text-tb-gray-600 dark:text-gray-300">{user.email}</td>
    <td className="px-4 py-3">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tb-blue-light text-tb-blue">
        <Bookmark className="w-3.5 h-3.5" />
        {user.bookmarkedCount}
      </span>
    </td>
  </tr>
);

export default BookmarkRow;
