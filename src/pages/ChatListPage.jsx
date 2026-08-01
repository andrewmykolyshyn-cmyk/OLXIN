/**
 * Chat List Page (Inbox)
 * Shows all conversations for the current user: listing chats + support chat.
 * Auth required.
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { getConversations, getOrCreateSupportConversation } from '@/lib/api';
import EmptyState from '@/components/EmptyState';
import { showToast } from '@/components/Toast';
import { timeAgo } from '@/lib/format';

export default function ChatListPage() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { t, lang } = useT();

  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations(data);
      } catch (err) {
        console.error(err);
        showToast(t('errors.generic'), 'error');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [t]);

  const handleSupport = async () => {
    try {
      const id = await getOrCreateSupportConversation();
      navigate('/chat/' + id);
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    }
  };

  const conversationLabel = (c) => {
    if (c.is_support) {
      if (isAdmin && c.buyer_id !== user.id) {
        return '🛟 ' + ((c.buyer && c.buyer.name) || 'Usuario');
      }
      return '🛟 ' + t('chat.support');
    }
    const otherName = c.buyer_id === user.id
      ? (c.seller && c.seller.name)
      : (c.buyer && c.buyer.name);
    return (otherName  'Usuario') + ' - ' + ((c.listing && c.listing.title)  '');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner large" role="status" />
      </div>
    );
  }

  return (
    <div className="page-section container">
      <div className="chat-inbox-header">
        <h2>{t('nav.chat')}</h2>
        <button className="btn ghost" onClick={handleSupport}>
          🛟 {t('chat.contactSupport')}
        </button>
      </div>

      {conversations.length === 0 ? (
        <EmptyState
          icon="💬"
          title={t('chat.emptyTitle')}
          message={t('chat.emptyMessage')}
          actionLabel={t('chat.contactSupport')}
          onAction={handleSupport}
        />
      ) : (
        <div className="chat-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className="chat-list-item card hoverable"
              onClick={() => navigate('/chat/' + c.id)}
            >
              <div className="chat-list-title">{conversationLabel(c)}</div>
              <div className="chat-list-preview">{c.last_message || t('chat.noMessages')}</div>
              <div className="chat-list-time">{timeAgo(c.last_message_at, lang)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
