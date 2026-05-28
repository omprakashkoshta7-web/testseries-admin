import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@shared/components';
import {
  ArrowLeft,
  MessageSquare,
  User,
  Shield,
  AlertTriangle,
  Clock,
  Mail,
} from '@shared/icons';
import type { ITicketMessage } from '../../../types';
import { useTicketDetail } from '../hooks/useTicketDetail';
import TicketStatusActions from '../components/TicketStatusActions';
import TicketReplySection from '../components/TicketReplySection';
import { TICKET_STATUS_BADGE_COLORS, TICKET_PRIORITY_BADGE_COLORS } from '../constants';

const messageIcons: Record<string, React.FC<{ className?: string }>> = {
  user: User,
  admin: Shield,
};

const AdminTicketDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { ticket, loading, replyText, setReplyText, handleStatusChange, handlePriorityChange, handleReply } = useTicketDetail();

  if (loading || !ticket) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/admin/tickets')}
        className="flex items-center gap-2 text-tb-gray-500 dark:text-gray-400 hover:text-tb-navy dark:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Back to Tickets</span>
      </button>

      <div className="admin-card-solid p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-3">
              <h1 className="text-xl sm:text-2xl font-bold text-tb-navy dark:text-white truncate">{ticket.subject}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${TICKET_STATUS_BADGE_COLORS[ticket.status] || 'bg-gray-100 text-gray-600'}`}>
                {ticket.status.replace('_', ' ')}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${TICKET_PRIORITY_BADGE_COLORS[ticket.priority] || 'bg-gray-100 text-gray-700'}`}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {ticket.priority}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-tb-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {ticket.userId?.name ?? ticket.userName}
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                {ticket.userId?.email ?? ticket.userEmail}
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4" />
                {ticket.category}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Created {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <p className="mt-4 text-sm text-tb-gray-700 bg-tb-gray-50 rounded-xl p-4">{ticket.description}</p>
          </div>
          <TicketStatusActions
            status={ticket.status}
            priority={ticket.priority}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
          />
        </div>
      </div>

      <div className="admin-card-solid p-6 sm:p-8">
        <h2 className="text-lg font-bold text-tb-navy dark:text-white mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-tb-blue" />
          Messages ({ticket.messages?.length ?? 0})
        </h2>

        {ticket.messages && ticket.messages.length > 0 ? (
          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pr-2">
            {ticket.messages.map((msg: ITicketMessage, i: number) => {
              const isAdmin = msg.sender === 'admin';
              const Icon = messageIcons[msg.sender] || User;
              return (
                <div
                  key={i}
                  className={`flex gap-3 ${isAdmin ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-tb-blue-light/30 text-tb-blue'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={`flex-1 max-w-[80%] ${isAdmin ? 'mr-12' : 'ml-12'}`}>
                    <div className={`rounded-xl p-4 ${
                      isAdmin ? 'bg-purple-50 border border-purple-100' : 'bg-tb-blue-light/20 border border-tb-blue-light/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-semibold ${isAdmin ? 'text-purple-700' : 'text-tb-blue'}`}>
                          {isAdmin ? 'Admin' : ticket.userId?.name ?? ticket.userName}
                        </span>
                        <span className="text-xs text-tb-gray-400">
                          {new Date(msg.createdAt).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-tb-gray-700 whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-tb-gray-400">
            <MessageSquare className="w-8 h-8 mb-2" />
            <p className="text-sm">No messages yet</p>
          </div>
        )}

        <TicketReplySection
          replyText={replyText}
          onChange={setReplyText}
          onReply={handleReply}
          disabled={!replyText.trim()}
        />
      </div>
    </div>
  );
};

export default AdminTicketDetailPage;
