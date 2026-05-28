import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAdminDispatch, useAdminSelector } from '../../../store/hooks';
import { fetchTicketDetail, updateTicket, replyTicket, clearTicketDetail } from '../store/tickets.slice';
import { selectAdminTicketDetail, selectAdminTicketsLoading } from '../store/tickets.selectors';
import { useToast } from '../../../utils/ToastContext';

export const useTicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAdminDispatch();
  const ticket = useAdminSelector(selectAdminTicketDetail);
  const loading = useAdminSelector(selectAdminTicketsLoading);
  const [replyText, setReplyText] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    if (id && id !== 'undefined') dispatch(fetchTicketDetail(id));
    return () => { dispatch(clearTicketDetail()); };
  }, [dispatch, id]);

  const ticketId = ticket?.id || ticket?._id || id;

  const handleStatusChange = (status: string) => {
    if (ticket && ticketId) { dispatch(updateTicket({ id: ticketId, data: { status } })); showToast('Status updated'); }
  };

  const handlePriorityChange = (priority: string) => {
    if (ticket && ticketId) { dispatch(updateTicket({ id: ticketId, data: { priority } })); showToast('Priority updated'); }
  };

  const handleReply = () => {
    if (!ticket || !ticketId || ticketId === 'undefined' || !replyText.trim()) return;
    dispatch(replyTicket({ id: ticketId, message: replyText }));
    setReplyText('');
    showToast('Reply sent');
  };

  return { ticket, loading, replyText, setReplyText, handleStatusChange, handlePriorityChange, handleReply };
};
