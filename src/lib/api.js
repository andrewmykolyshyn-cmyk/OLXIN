import { supabase } from './supabase';

// ============================================================
// Categories & Site Settings
// ============================================================

export async function getCategories() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('categories')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data?.categories || [];
}

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single();
  if (error) throw error;
  return data;
}

export async function updateSiteSettings(updates) {
  const { data, error } = await supabase
    .from('site_settings')
    .update(updates)
    .eq('id', 1)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Listings
// ============================================================

const LISTING_SELECT = '*, seller:seller_id(name, is_pro, created_at)';

export async function getListings(filters = {}) {
  let query = supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('status', 'active');

  if (filters.cat) query = query.eq('cat', filters.cat);
  if (filters.envio) query = query.eq('envio', true);
  if (filters.q) query = query.ilike('title', `%${filters.q}%`);

  switch (filters.sort) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      // 'recommended' - featured badges first, then newest
      query = query.order('badge', { ascending: true }).order('created_at', { ascending: false });
  }

  const limit = filters.limit || 20;
  const offset = filters.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getListing(id) {
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function bumpViews(id) {
  const { error } = await supabase.rpc('bump_views', { p_id: id });
  if (error) throw error;
}

export async function getMyListings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', user.id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getSellerListings(sellerId) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', sellerId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function deleteListing(id) {
  const { error } = await supabase.from('listings').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Admin
// ============================================================

export async function getAllListings() {
  const { data, error } = await supabase
    .from('listings')
    .select(LISTING_SELECT)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function adminUpdateListing(id, updates) {
  const { error } = await supabase.from('listings').update(updates).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteListing(id) {
  const { error } = await supabase.from('listings').delete().eq('id', id);
  if (error) throw error;
}

// ============================================================
// Profiles
// ============================================================

export async function getProfile(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Ratings
// ============================================================

export async function getRatings(sellerId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('*, rater:rater_id(name)')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function upsertRating(sellerId, raterId, stars, comment = '') {
  const { data, error } = await supabase
    .from('ratings')
    .upsert(
      { seller_id: sellerId, rater_id: raterId, stars, comment },
      { onConflict: 'seller_id,rater_id' }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Photos (Supabase Storage)
// ============================================================

const PHOTOS_BUCKET = 'listing-photos';

export async function uploadPhoto(file) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const ext = (file.name && file.name.split('.').pop()) || 'jpg';
  const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(PHOTOS_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  const { data } = supabase.storage.from(PHOTOS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function deletePhoto(url) {
  const marker = `/${PHOTOS_BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);

  const { error } = await supabase.storage.from(PHOTOS_BUCKET).remove([path]);
  if (error) throw error;
}

// ============================================================
// Payments
// ============================================================

export async function createPaymentIntent({ amount, currency, ad }) {
  const apiBase = import.meta.env.VITE_API_BASE || '/api';
  const res = await fetch(`${apiBase}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, ad }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || 'Payment intent request failed');
  }
  return res.json();
}

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
