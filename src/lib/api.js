// ============================================================
// Chat
// ============================================================

export async function getConversations() {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, listing:listing_id(id, title), buyer:buyer_id(name), seller:seller_id(name)')
    .order('last_message_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getConversation(id) {
  const { data, error } = await supabase
    .from('conversations')
    .select('*, listing:listing_id(id, title), buyer:buyer_id(name), seller:seller_id(name)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function getOrCreateListingConversation(listingId, sellerId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  if (user.id === sellerId) throw new Error('Cannot message yourself');

  const { data: existing, error: findErr } = await supabase
    .from('conversations')
    .select('id')
    .eq('listing_id', listingId)
    .eq('buyer_id', user.id)
    .maybeSingle();
  if (findErr) throw findErr;
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from('conversations')
    .insert({ listing_id: listingId, buyer_id: user.id, seller_id: sellerId, is_support: false })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function getOrCreateSupportConversation() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data: existing, error: findErr } = await supabase
    .from('conversations')
    .select('id')
    .eq('buyer_id', user.id)
    .eq('is_support', true)
    .maybeSingle();
  if (findErr) throw findErr;
  if (existing) return existing.id;

  const { data, error } = await supabase
    .from('conversations')
    .insert({ buyer_id: user.id, is_support: true })
    .select('id')
    .single();
  if (error) throw error;
  return data.id;
}

export async function getMessages(conversationId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function sendMessage(conversationId, content) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, sender_id: user.id, content })
    .select()
    .single();
  if (error) throw error;

  await supabase
    .from('conversations')
    .update({ last_message: content.slice(0, 200), last_message_at: new Date().toISOString() })
    .eq('id', conversationId);

  return data;
}

export function subscribeToMessages(conversationId, onInsert) {
  const channel = supabase
    .channel('messages-' + conversationId)
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: 'conversation_id=eq.' + conversationId,
    }, (payload) => onInsert(payload.new))
    .subscribe();

  return () => supabase.removeChannel(channel);
}
