import React from 'react';
import { Button } from '@shared/components';
import { FileText, Plus } from '@shared/icons';

interface HomeContentEmptyStateProps {
  search: string;
  onCreateClick: () => void;
}

const HomeContentEmptyState: React.FC<HomeContentEmptyStateProps> = ({ search, onCreateClick }) => (
  <div className="admin-card-solid">
    <div className="flex flex-col items-center justify-center py-16">
      <FileText className="w-12 h-12 text-tb-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-tb-navy dark:text-white mb-1">No content found</h3>
      <p className="text-tb-gray-500 dark:text-gray-400 text-sm mb-4">{search ? 'No content matches your search' : 'Create your first home content to get started'}</p>
      {!search && <Button onClick={onCreateClick}><Plus className="w-4 h-4" />Create Content</Button>}
    </div>
  </div>
);

export default HomeContentEmptyState;
