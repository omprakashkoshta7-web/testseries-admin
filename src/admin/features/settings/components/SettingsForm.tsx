import React from 'react';
import { Button, Card, Input, Textarea, Loader } from '@shared/components';
import { Check, Mail, Shield, Globe, CheckCircle } from '@shared/icons';

interface Props {
  activeTab: 'general' | 'email' | 'security';
  onTabChange: (tab: 'general' | 'email' | 'security') => void;
  form: Record<string, any>;
  onFormChange: (form: Record<string, any>) => void;
  loading: boolean;
  saving: boolean;
  saved: boolean;
  onSave: () => void;
}

const tabs = [
  { key: 'general' as const, label: 'General', icon: Globe },
  { key: 'email' as const, label: 'Email', icon: Mail },
  { key: 'security' as const, label: 'Security', icon: Shield },
];

const SettingsForm: React.FC<Props> = ({ activeTab, onTabChange, form, onFormChange, loading, saving, saved, onSave }) => {
  const setForm = onFormChange;

  if (loading) return <div className="flex justify-center py-12"><Loader size="lg" /></div>;

  return (
    <>
      <div className="inline-flex items-center gap-1 p-1 bg-tb-gray-100 dark:bg-gray-700/50 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-800 text-tb-navy dark:text-white shadow-sm'
                  : 'text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'general' && (
        <Card title="General Settings" subtitle="Configure your platform's basic information">
          <div className="space-y-5 max-w-2xl">
            <Input label="Site Name" value={form.siteName || ''} onChange={(e) => setForm({ ...form, siteName: e.target.value })} />
            <Textarea label="Site Description" value={form.siteDescription || ''} onChange={(e) => setForm({ ...form, siteDescription: e.target.value })} fullWidth />
            <Input label="Logo URL" value={form.logoUrl || ''} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} placeholder="https://..." />
            <Input label="Support Email" type="email" value={form.supportEmail || ''} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
          </div>
        </Card>
      )}

      {activeTab === 'email' && (
        <Card title="Email Settings" subtitle="Configure SMTP settings for transactional emails">
          <div className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <Input label="SMTP Host" value={form.smtpHost || ''} onChange={(e) => setForm({ ...form, smtpHost: e.target.value })} />
              <Input label="SMTP Port" value={String(form.smtpPort || '')} onChange={(e) => setForm({ ...form, smtpPort: e.target.value })} />
            </div>
            <Input label="SMTP Username" value={form.smtpUser || ''} onChange={(e) => setForm({ ...form, smtpUser: e.target.value })} />
            <Input label="SMTP Password" type="password" value={form.smtpPass || ''} onChange={(e) => setForm({ ...form, smtpPass: e.target.value })} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="From Email" type="email" value={form.fromEmail || ''} onChange={(e) => setForm({ ...form, fromEmail: e.target.value })} />
              <Input label="From Name" value={form.fromName || ''} onChange={(e) => setForm({ ...form, fromName: e.target.value })} />
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card title="Security Settings" subtitle="Configure platform security parameters">
          <div className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input label="Min Password Length" type="number" value={String(form.minPasswordLength || 8)} onChange={(e) => setForm({ ...form, minPasswordLength: Number(e.target.value) })} />
              <Input label="Max Login Attempts" type="number" value={String(form.maxLoginAttempts || 5)} onChange={(e) => setForm({ ...form, maxLoginAttempts: Number(e.target.value) })} />
              <Input label="Session Timeout (min)" type="number" value={String(form.sessionTimeout || 60)} onChange={(e) => setForm({ ...form, sessionTimeout: Number(e.target.value) })} />
            </div>
            <div className="flex items-center justify-between p-4 bg-tb-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div>
                <p className="font-medium text-tb-navy dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-tb-gray-500 dark:text-gray-400">Require 2FA for all admin accounts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={form.twoFactorEnabled || false} onChange={(e) => setForm({ ...form, twoFactorEnabled: e.target.checked })} className="sr-only peer" />
                <div className="w-11 h-6 bg-tb-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-tb-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tb-blue" />
              </label>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        <Button onClick={onSave} isLoading={saving}>
          {saved ? <CheckCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
          {saved ? 'Saved' : 'Save Settings'}
        </Button>
      </div>
    </>
  );
};

export default SettingsForm;
