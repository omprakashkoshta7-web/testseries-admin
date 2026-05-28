import React from 'react';
import PageHeader from '../../../components/PageHeader';
import { useSettings } from '../hooks/useSettings';
import SettingsForm from '../components/SettingsForm';

const AdminSettingsPage: React.FC = () => {
  const { activeTab, setActiveTab, form, setForm, loading, saving, saved, handleSave } = useSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Configure platform settings"
      />
      <SettingsForm
        activeTab={activeTab}
        onTabChange={setActiveTab}
        form={form}
        onFormChange={setForm}
        loading={loading}
        saving={saving}
        saved={saved}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminSettingsPage;
