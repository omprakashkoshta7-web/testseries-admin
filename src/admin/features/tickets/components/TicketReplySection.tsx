import React from 'react';
import { Textarea, Button } from '@shared/components';
import { Send } from '@shared/icons';

interface TicketReplySectionProps {
  replyText: string;
  onChange: (value: string) => void;
  onReply: () => void;
  disabled: boolean;
}

const TicketReplySection: React.FC<TicketReplySectionProps> = ({ replyText, onChange, onReply, disabled }) => (
  <div className="border-t border-tb-gray-100 pt-4">
    <Textarea label="Reply" value={replyText} onChange={(e) => onChange(e.target.value)} fullWidth required rows={4} placeholder="Write your reply..." />
    <div className="flex justify-end mt-3">
      <Button onClick={onReply} disabled={disabled}>
        <Send className="w-4 h-4" />
        Send Reply
      </Button>
    </div>
  </div>
);

export default TicketReplySection;
