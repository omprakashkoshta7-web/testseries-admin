import { useCallback } from 'react';
import type { QuestionForm } from '../constants';

export function useQuestionForm(form: QuestionForm, onFormChange: (form: QuestionForm) => void) {
  const addOption = useCallback(() => {
    const label = String.fromCharCode(65 + form.options.length);
    onFormChange({ ...form, options: [...form.options, { label, text: '' }] });
  }, [form, onFormChange]);

  const removeOption = useCallback((index: number) => {
    if (form.options.length <= 1) return;
    const newOptions = form.options.filter((_, i) => i !== index).map((opt, i) => ({
      ...opt,
      label: String.fromCharCode(65 + i),
    }));
    onFormChange({ ...form, options: newOptions });
  }, [form, onFormChange]);

  const updateOption = useCallback((index: number, text: string) => {
    const newOptions = [...form.options];
    newOptions[index] = { ...newOptions[index], text };
    onFormChange({ ...form, options: newOptions });
  }, [form, onFormChange]);

  const updateField = useCallback(<K extends keyof QuestionForm>(field: K, value: QuestionForm[K]) => {
    onFormChange({ ...form, [field]: value });
  }, [form, onFormChange]);

  return { addOption, removeOption, updateOption, updateField };
}
