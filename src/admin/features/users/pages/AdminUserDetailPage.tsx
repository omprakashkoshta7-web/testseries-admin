import React from 'react';
import { useUserDetail } from '../hooks';
import { Loader, Card, Button, Badge } from '@shared/components';
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Shield,
  Trophy,
  Target,
  Flame,
  TrendingUp,
  BookOpen,
  Award,
} from '@shared/icons';

const AdminUserDetailPage: React.FC = () => {
  const { user, loading, handleStatusToggle, navigate } = useUserDetail();

  if (loading || !user) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  const statCards = [
    { label: 'Tests Completed', value: user.testsCompleted, icon: BookOpen, color: 'bg-blue-500' },
    { label: 'Avg Score', value: `${user.avgScore}%`, icon: Target, color: 'bg-green-500' },
    { label: 'Total Points', value: user.totalPoints.toLocaleString(), icon: Trophy, color: 'bg-purple-500' },
    { label: 'Day Streak', value: `${user.streak} days`, icon: Flame, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/admin/users')}
        className="flex items-center gap-2 text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Users</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-tb p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-admin-primary to-violet-600 rounded-2xl flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-tb-navy dark:text-white">{user.name}</h1>
              {user.role === 'admin' && <Badge variant="primary">Admin</Badge>}
              {['active', 'inactive', 'disabled'].includes(user.status) && (
                <Badge variant={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'warning' : 'danger'}>
                  {user.status}
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-tb-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Role: {user.role}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
              <Button
                  variant={user.status === 'disabled' ? 'primary' : 'danger'}
                  size="sm"
                  onClick={handleStatusToggle}
                >
              {user.status === 'disabled' ? 'Enable User' : user.status === 'inactive' ? 'Activate' : 'Disable'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-tb p-5">
              <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xl font-bold text-tb-navy dark:text-white mt-3">{stat.value}</p>
              <p className="text-sm text-tb-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Exams">
          {user.exams && user.exams.length > 0 ? (
            <div className="space-y-2">
              {user.exams.map((exam: any, i: number) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-tb-gray-50 dark:hover:bg-gray-700/50">
                  <BookOpen className="w-4 h-4 text-tb-blue" />
                  <span className="text-sm text-tb-navy dark:text-white">{exam}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-tb-gray-400 text-sm py-4 text-center">No exams enrolled</p>
          )}
        </Card>

        <Card title="Test History">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-tb-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Target className="w-4 h-4 text-tb-blue" />
                <span className="text-sm text-tb-navy dark:text-white font-medium">Average Score</span>
              </div>
              <span className="text-lg font-bold text-tb-blue">{user.avgScore}%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-tb-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-tb-navy dark:text-white font-medium">Total Points</span>
              </div>
              <span className="text-lg font-bold text-green-500">{user.totalPoints.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-tb-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-tb-navy dark:text-white font-medium">Tests Completed</span>
              </div>
              <span className="text-lg font-bold text-purple-500">{user.testsCompleted}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
