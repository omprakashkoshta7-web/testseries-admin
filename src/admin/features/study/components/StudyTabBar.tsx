import React from 'react';

interface StudyTabBarProps {
  activeTab: 'subjects' | 'materials';
  subjectsCount: number;
  materialsCount: number;
  onChange: (tab: 'subjects' | 'materials') => void;
}

const StudyTabBar: React.FC<StudyTabBarProps> = ({ activeTab, subjectsCount, materialsCount, onChange }) => (
  <div className="flex gap-1 bg-tb-gray-50 rounded-xl p-1 w-fit">
    <button onClick={() => onChange('subjects')}
      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'subjects' ? 'bg-white text-tb-navy dark:text-white shadow-sm' : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white'}`}>
      Subjects ({subjectsCount})
    </button>
    <button onClick={() => onChange('materials')}
      className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'materials' ? 'bg-white text-tb-navy dark:text-white shadow-sm' : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white'}`}>
      Materials ({materialsCount})
    </button>
  </div>
);

export default StudyTabBar;
