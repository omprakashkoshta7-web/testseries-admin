import { useEffect, useState } from 'react';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchSettings, updateSettings, clearSaved } from '../store/settings.slice';
import { useToast } from '../../../utils/ToastContext';

export const useSettings = () => {
  const dispatch = useAdminDispatch();
  const { settings, loading, saving, saved } = useAdminSelector((s: any) => s.settings);
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'security'>('general');
  const [form, setForm] = useState<Record<string, any>>({});
  const { showToast } = useToast();

  useEffect(() => { dispatch(fetchSettings()); }, [dispatch]);

  useEffect(() => { if (settings && Object.keys(settings).length) setForm({ ...settings }); }, [settings]);

  useEffect(() => { if (saved) { const t = setTimeout(() => dispatch(clearSaved()), 3000); return () => clearTimeout(t); } }, [saved, dispatch]);

  const handleSave = () => {
    try {
      dispatch(updateSettings(form));
      showToast('Settings saved successfully!');
    } catch {
      showToast('Failed to save settings', 'error');
    }
  };

  return { activeTab, setActiveTab, form, setForm, loading, saving, saved, handleSave };
};
