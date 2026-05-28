import { useState } from 'react';
import { useAdminDispatch } from '../../../store/hooks';
import { createTopic, fetchTopics } from '../../topics/store/topics.slice';
import { useToast } from '../../../utils/ToastContext';

const emptyTopicForm = { name: '', slug: '', subjectId: '', description: '', order: 0, isActive: true };

const parseBulkLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, description = ''] = line.split('|').map((part) => part.trim());
      return { name, description };
    });

export const useTopicCrud = (onError?: (err: string | null) => void) => {
  const dispatch = useAdminDispatch();
  const { showToast } = useToast();

  const [topicForm, setTopicForm] = useState(emptyTopicForm);
  const [bulkTopicSubjectId, setBulkTopicSubjectId] = useState('');
  const [bulkTopicsText, setBulkTopicsText] = useState('');

  const handleCreateTopic = async () => {
    if (!topicForm.name.trim() || !topicForm.subjectId) { onError?.('Topic name and subject are required'); return; }
    try {
      await dispatch(createTopic({ ...topicForm, slug: topicForm.slug || topicForm.name.toLowerCase().replace(/\s+/g, '-') })).unwrap();
      await dispatch(fetchTopics(undefined)).unwrap();
      setTopicForm(emptyTopicForm);
      onError?.(null);
      showToast('Topic added', 'success');
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add topic');
    }
  };

  const handleBulkCreateTopics = async () => {
    const rows = parseBulkLines(bulkTopicsText);
    if (!bulkTopicSubjectId || !rows.length) { onError?.('Select subject and add at least one topic line'); return; }
    try {
      await Promise.all(rows.map((row, index) => dispatch(createTopic({
        ...emptyTopicForm,
        name: row.name,
        slug: row.name.toLowerCase().replace(/\s+/g, '-'),
        subjectId: bulkTopicSubjectId,
        description: row.description,
        order: index,
      })).unwrap()));
      await dispatch(fetchTopics(undefined)).unwrap();
      setBulkTopicsText('');
      onError?.(null);
      showToast(`${rows.length} topics added`, 'success');
    } catch (err: any) {
      onError?.(typeof err === 'string' ? err : err?.message || 'Failed to add topics');
    }
  };

  const readTextFile = (file: File, onLoad: (text: string) => void) => {
    const reader = new FileReader();
    reader.onload = () => onLoad(String(reader.result || ''));
    reader.onerror = () => onError?.('Could not read uploaded file');
    reader.readAsText(file);
  };

  const resetTopicForms = () => {
    setTopicForm(emptyTopicForm);
    setBulkTopicSubjectId('');
    setBulkTopicsText('');
  };

  return {
    topicForm,
    setTopicForm,
    bulkTopicSubjectId,
    setBulkTopicSubjectId,
    bulkTopicsText,
    setBulkTopicsText,
    handleCreateTopic,
    handleBulkCreateTopics,
    readTextFile,
    resetTopicForms,
  };
};
