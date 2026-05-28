import React from 'react';
import { Select } from '@shared/components';
import type { IExamCategory, IAdminSubject, ITopic } from '../../../types';

interface QuestionCategorySectionProps {
  category: string;
  subject: string;
  topic: string;
  categories: IExamCategory[];
  filteredSubjects: IAdminSubject[];
  filteredTopics: ITopic[];
  onCategoryChange: (category: string) => void;
  onSubjectChange: (subject: string) => void;
  onTopicChange: (topic: string) => void;
}

export const QuestionCategorySection: React.FC<QuestionCategorySectionProps> = ({
  category, subject, topic, categories, filteredSubjects, filteredTopics,
  onCategoryChange, onSubjectChange, onTopicChange,
}) => (
  <>
    <div className="grid grid-cols-2 gap-4">
      <Select label="Category" value={category} onChange={(e) => onCategoryChange(e.target.value)}
        options={[{ value: '', label: 'Select Category' }, ...categories.map((c: IExamCategory) => ({ value: c._id, label: c.name }))]} />
      <Select label="Subject" value={subject} onChange={(e) => onSubjectChange(e.target.value)}
        options={[{ value: '', label: 'Select Subject' }, ...filteredSubjects.map((s: IAdminSubject) => ({ value: s._id, label: s.name }))]} />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <Select label="Topic" value={topic} onChange={(e) => onTopicChange(e.target.value)}
        options={[{ value: '', label: 'Select Topic' }, ...filteredTopics.map((t: ITopic) => ({ value: t._id, label: t.name }))]} />
    </div>
  </>
);

export default QuestionCategorySection;
