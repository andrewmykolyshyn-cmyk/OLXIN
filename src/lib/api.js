/**
 * OLXIN API Layer
 * All data access functions. Uses Supabase client.
 * Assumption: RLS policies enforce read/write permissions server-side.
 */
import { supabase } from './supabase';

// ============================================================
// Site Settings
// ============================================================

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
// Categories (from site_settings.categories JSONB)
// ============================================================

export async function getCategories() {
  const settings = await getSiteSettings();
  return settings?.categories || [];
}

export async function updateCategories(categories) {
  return updateSiteSettings({ categories });
}

// ============================================================
// Listings
// ============================================================

/**
 * Fetch active listings with optional filters.
 * @param {Object} filters - cat, q (search), envio, is_pro, sort, limit, offset
 */
export async function getListings(filters = {}) {
  let query = supabase
    .from('listings')
    .select('*, seller:seller_id(name, is_pro, created_at)')
    .eq('status', 'active');

  if (filters.cat) {
    query = query.eq('cat', filters.cat);
  }

  if (filters.q) {
    query = query.ilike('title', `%${filters.q}%`);
  }

  if (filters.envio) {
    query = query.eq('envio', true);
  }

  if (filters.seller_id) {
    query = query.eq('seller_id', filters.seller_id);
  }

  // Sort
  const sort = filters.sort || 'recommended';
  if (sort === 'recommended') {
    query = query.order('badge', { ascending: false }); // vip, destacado, then ''
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'newest') {
    query = query.order('created_at', { ascending: false });
  } else if (sort === 'price_asc') {
    query = query.order('price', { ascending: true });
  } else if (sort === 'price_desc') {
    query = query.order('price', { ascending: false });
  }

  const limit = filters.limit || 20;
  const offset = filters.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/**
 * Get a single listing by ID.
 * Also bumps the view count via RPC.
 */
export async function getListing(id) {
  const { data, error } = await supabase
    .from('listings')
    .select('*, seller:seller_id(name, is_pro, created_at)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Bump view count (fire-and-forget).
 */
export async function bumpViews(id) {
  await supabase.rpc('bump_views', { p_id: id });
}

/**
 * Get listings for a specific seller.
 */
export async function getSellerListings(sellerId, limit = 20) {
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('seller_id', sellerId)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

/**
 * Get current user's listings (any status).
 */
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

/**
 * Create a listing (client-side, used for pending drafts).
 * Real active listings are created by the webhook after payment.
 */
export async function createListing(listing) {
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Update a listing.
 */
export async function updateListing(id, updates) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Delete a listing.
 */
export async function deleteListing(id) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ============================================================
// Ratings
// ============================================================

/**
 * Get ratings for a seller.
 */
export async function getRatings(sellerId) {
  const { data, error } = await supabase
    .from('ratings')
    .select('*, rater:rater_id(name)')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Upsert a rating (insert or update).
 */
export async function upsertRating(sellerId, raterId, stars, comment = '') {
  const { data, error } = await supabase
    .from('ratings')
    .upsert(
      { seller_id: sellerId, rater_id: raterId, stars, comment },
      { onConflict: ['seller_id', 'rater_id'] }
    )
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Profiles
// ============================================================

/**
 * Get a profile by ID.
 */
export async function getProfile(id) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Get current user's profile.
 */
export async function getMyProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return getProfile(user.id);
}

/**
 * Update current user's profile.
 */
export async function updateProfile(updates) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ============================================================
// Storage (Photo Upload)
// ============================================================

/**
 * Upload a photo to Supabase Storage.
 * @param {File} file
 * @returns {string} Public URL of the uploaded file
 */
export async function uploadPhoto(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${fileExt}`;
  const filePath = `public/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('listing-photos')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('listing-photos')
    .getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Delete a photo from Supabase Storage.
 */
export async function deletePhoto(url) {
  // Extract path from public URL
  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split('/');
  const bucketIndex = pathParts.indexOf('listing-photos');
  if (bucketIndex === -1) return;
  const filePath = pathParts.slice(bucketIndex + 1).join('/');

  await supabase.storage
    .from('listing-photos')
    .remove([filePath]);
}

// ============================================================
// Admin
// ============================================================

/**
 * Get all listings (admin only; RLS enforces).
 */
export async function getAllListings() {
  const { data, error } = await supabase
    .from('listings')
    .select('*, seller:seller_id(name, is_pro)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

/**
 * Admin update any listing.
 */
export async function adminUpdateListing(id, updates) {
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Admin delete any listing.
 */
export async function adminDeleteListing(id) {
  const { error } = await supabase
    .from('listings')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// ============================================================
// Stripe (via Express server)
// ============================================================

const API_BASE = import.meta.env.VITE_API_BASE || '/api';

export async function getStripeConfig() {
  const res = await fetch(`${API_BASE}/config`);
  if (!res.ok) throw new Error('Failed to fetch Stripe config');
  return res.json();
}

export async function createPaymentIntent({ amount, currency, ad }) {
  const res = await fetch(`${API_BASE}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, currency, ad }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Payment intent failed');
  }
  return res.json();
}
