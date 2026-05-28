import React from 'react';
import { Layers, Users } from '@shared/icons';

export type Tab = 'batches' | 'groups';

interface TabNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs = [
  { key: 'batches' as Tab, label: 'Batches', icon: Layers },
  { key: 'groups' as Tab, label: 'Groups', icon: Users },
];

const TabNav: React.FC<TabNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="inline-flex items-center gap-1 p-1 bg-tb-gray-100 rounded-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-tb-navy dark:text-white shadow-sm'
                : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabNav;
