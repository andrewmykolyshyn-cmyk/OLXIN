/**
 * Chat Thread Page
 * Shows messages for one conversation, with realtime updates.
 * Auth required.
 */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useT } from '@/i18n/i18n';
import { getConversation, getMessages, sendMessage, subscribeToMessages } from '@/lib/api';
import { showToast } from '@/components/Toast';

export default function ChatThreadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { t } = useT();

  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    let unsubscribe = () => {};

    async function load() {
      try {
        setLoading(true);
        const conv = await getConversation(id);
        const msgs = await getMessages(id);
        setConversation(conv);
        setMessages(msgs);
        unsubscribe = subscribeToMessages(id, (newMsg) => {
          setMessages((prev) => [...prev, newMsg]);
        });
      } catch (err) {
        console.error(err);
        showToast(t('errors.generic'), 'error');
        navigate('/chat');
      } finally {
        setLoading(false);
      }
    }
    load();

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const content = text.trim();
    if (!content || sending) return;

    setSending(true);
    setText('');
    try {
      await sendMessage(id, content);
    } catch (err) {
      showToast(t('errors.generic'), 'error');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
        <span className="spinner large" role="status" />
      </div>
    );
  }

  if (!conversation) return null;

  let title;
  if (conversation.is_support) {
    if (isAdmin && conversation.buyer_id !== user.id) {
      title = (conversation.buyer && conversation.buyer.name) || 'Usuario';
    } else {
      title = t('chat.support');
    }
  } else {
    const otherName = conversation.buyer_id === user.id
      ? (conversation.seller && conversation.seller.name)
      : (conversation.buyer && conversation.buyer.name);
    title = (otherName || 'Usuario') + (conversation.listing ? ' - ' + conversation.listing.title : '');
  }

  const headerTitle = conversation.is_support ? ('🛟 ' + title) : title;

  return (
    <div className="container chat-thread-page">
      <div className="chat-thread-header">
        <button className="btn ghost" onClick={() => navigate('/chat')}>←</button>
        <strong>{headerTitle}</strong>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginTop: 40 }}>
            {t('chat.noMessages')}
          </p>
        )}
        {messages.map((m) => {
          const bubbleClass = 'chat-bubble ' + (m
