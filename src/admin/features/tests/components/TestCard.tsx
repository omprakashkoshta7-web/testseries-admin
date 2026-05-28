import React from 'react';
import type { ITest } from '../../../types';
import { Badge } from '@shared/components';
import {
  FileText, Crown, Sparkles, BookOpen, Clock, Target, BarChart3,
  Edit, Copy, Trash2, Layers, Calendar,
} from '@shared/icons';
import { getDifficultyColor } from '../utils';

const badgeColorMap: Record<string, string> = {
  red: '#ef4444', orange: '#f97316', amber: '#f59e0b', green: '#22c55e',
  emerald: '#10b981', blue: '#3b82f6', indigo: '#6366f1', purple: '#a855f7',
  pink: '#ec4899', rose: '#f43f5e',
};

interface TestCardProps {
  test: ITest;
  onEdit: (test: ITest) => void;
  onDelete: (test: ITest) => void;
  onContent: (test: ITest) => void;
  onDuplicate: (test: ITest) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onEdit, onDelete, onContent, onDuplicate }) => {
  const now = new Date();
  const activeFrom = test.activeFrom ? new Date(test.activeFrom) : null;
  const activeUntil = test.activeUntil ? new Date(test.activeUntil) : null;
  const isExpired = !!activeUntil && activeUntil <= now;
  const isUpcoming = !!activeFrom && activeFrom > now;
  const formatWindowDate = (date: Date) => date.toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const windowLabel = isExpired
    ? 'Expired'
    : isUpcoming && activeFrom
      ? `Starts ${formatWindowDate(activeFrom)}`
      : activeUntil
        ? `Ends ${formatWindowDate(activeUntil)}`
        : 'Always active';
  const scopeLabel = test.testType === 'full' ? 'Full Length' : test.testType === 'chapter' ? 'Chapter Wise' : 'Subject Wise';

  return (
    <div className="group overflow-hidden rounded-xl border border-tb-gray-100 bg-white shadow-tb transition-all duration-300 hover:-translate-y-0.5 hover:shadow-tb-lg dark:border-gray-700 dark:bg-gray-800">
      <div className={`h-1 ${isExpired ? 'bg-gray-300' : isUpcoming ? 'bg-amber-400' : test.isPremium ? 'bg-orange-400' : 'bg-green-400'}`} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-tb-blue-light">
              <FileText className="h-5 w-5 text-tb-blue" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold leading-tight text-tb-navy transition-colors group-hover:text-tb-blue dark:text-white">
                {test.title}
              </h3>
              <p className="mt-1 truncate text-sm text-tb-gray-500 dark:text-gray-400">
                {test.category} / {test.subject || 'General'}
              </p>
            </div>
          </div>
          <Badge variant={test.status === 'published' && !isExpired ? 'success' : 'warning'}>
            {isExpired ? 'expired' : test.status}
          </Badge>
        </div>

        <p className="mt-4 min-h-[2.5rem] text-sm text-tb-gray-600 line-clamp-2 dark:text-gray-300">
          {test.description || 'No description added.'}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {test.badge?.text ? (
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: badgeColorMap[test.badge.color] || '#ef4444' }}>
              {test.badge.text}
            </span>
          ) : test.isPremium ? (
            <span className="inline-flex items-center gap-1 rounded-lg border border-amber-200/50 bg-gradient-to-r from-amber-50 to-orange-50 px-2 py-1 text-[10px] font-bold text-amber-700 dark:border-amber-700/30 dark:from-amber-900/30 dark:to-orange-900/30 dark:text-amber-300">
              <Crown className="h-3 w-3" /> PREMIUM
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-lg border border-green-200/50 bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 dark:border-green-700/30 dark:bg-green-900/30 dark:text-green-300">
              <Sparkles className="h-3 w-3" /> FREE
            </span>
          )}
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getDifficultyColor(test.difficulty)}`}>
            {test.difficulty}
          </span>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-tb-blue dark:bg-blue-900/30 dark:text-blue-200">
            {scopeLabel}
          </span>
          {test.chapter && (
            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-200">
              {test.chapter}
            </span>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-tb-gray-600 dark:text-gray-300">
          <span className="flex items-center gap-1.5 rounded-lg bg-tb-gray-50 px-2.5 py-2 dark:bg-gray-700/50">
            <BookOpen className="h-3.5 w-3.5" /> {test.questionsCount} Q
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-tb-gray-50 px-2.5 py-2 dark:bg-gray-700/50">
            <Clock className="h-3.5 w-3.5" /> {test.duration} min
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-tb-gray-50 px-2.5 py-2 dark:bg-gray-700/50">
            <Target className="h-3.5 w-3.5" /> {test.passingScore}%
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-tb-gray-50 px-3 py-2 dark:bg-gray-700/40">
          <span className={`flex min-w-0 items-center gap-1.5 text-xs font-semibold ${isExpired ? 'text-gray-500' : isUpcoming ? 'text-amber-700' : 'text-green-700'}`}>
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{windowLabel}</span>
          </span>
          <span className="flex flex-shrink-0 items-center gap-1 text-xs text-tb-gray-400">
            <BarChart3 className="h-3.5 w-3.5" /> {test.attemptedCount ?? 0} attempts
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-tb-gray-100 pt-4 dark:border-gray-700/50">
          <div className="text-sm font-bold">
            {test.isPremium ? (
              <span className="text-amber-600 dark:text-amber-400">
                Rs {test.price ?? 0}
                {(test.originalPrice ?? 0) > (test.price ?? 0) && (
                  <span className="ml-1 font-normal text-tb-gray-400 line-through dark:text-gray-500">Rs {test.originalPrice}</span>
                )}
              </span>
            ) : (
              <span className="text-green-600 dark:text-green-400">Free</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); onContent(test); }} className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1.5 text-purple-700 transition-all hover:bg-purple-100" title="Add subject, topic, question">
              <Layers className="h-4 w-4" /><span className="text-[11px] font-bold">Content</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onEdit(test); }} className="rounded-lg p-1.5 text-tb-gray-400 transition-all hover:bg-tb-blue-light hover:text-tb-blue" title="Edit"><Edit className="h-4 w-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); onDuplicate(test); }} className="rounded-lg p-1.5 text-tb-gray-400 transition-all hover:bg-tb-blue-light hover:text-tb-blue" title="Duplicate"><Copy className="h-4 w-4" /></button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(test); }} className="rounded-lg p-1.5 text-tb-gray-400 transition-all hover:bg-red-50 hover:text-tb-red" title="Delete"><Trash2 className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestCard;
