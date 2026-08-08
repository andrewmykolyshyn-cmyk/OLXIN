-- ============================================================
-- OLXIN Chat Schema (migration)
-- Run this in the Supabase SQL Editor AFTER schema.sql.
-- Adds the conversations + messages tables that the chat UI
-- (ChatListPage / ChatThreadPage / lib/api.js) already expects
-- but that were never created in the database.
-- ============================================================

-- --------------------------------------------------------
-- 1. Conversations
-- --------------------------------------------------------
create table if not exists public.conversations (
  id bigint generated always as identity primary key,
  listing_id bigint references public.listings(id) on delete cascade,
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid references public.profiles(id) on delete cascade,
  is_support boolean not null default false,
  last_message text,
  last_message_at timestamptz default now(),
  created_at timestamptz default now()
);

-- One conversation per (listing, buyer) pair
create unique index if not exists conversations_listing_buyer_unique
  on public.conversations (listing_id, buyer_id)
  where listing_id is not null;

-- One support conversation per buyer
create unique index if not exists conversations_support_buyer_unique
  on public.conversations (buyer_id)
  where is_support = true;

create index if not exists conversations_buyer_idx on public.conversations (buyer_id);
create index if not exists conversations_seller_idx on public.conversations (seller_id);

-- --------------------------------------------------------
-- 2. Messages
-- --------------------------------------------------------
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  conversation_id bigint not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

create index if not exists messages_conversation_idx on public.messages (conversation_id, created_at);

-- --------------------------------------------------------
-- 3. RLS Policies
-- --------------------------------------------------------
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Conversations: participants can see their own; admins can see all
-- support conversations (so staff can answer any user, matching the
-- isAdmin logic already in ChatListPage/ChatThreadPage).
create policy "conversations_select_participant_or_admin"
  on public.conversations for select
  using (
    auth.uid() = buyer_id
    or auth.uid() = seller_id
    or (is_support and public.is_admin())
  );

create policy "conversations_insert_own"
  on public.conversations for insert
  with check (auth.uid() = buyer_id);

-- Needed so sendMessage() can bump last_message / last_message_at,
-- and so admins can "claim" a support conversation.
create policy "conversations_update_participant_or_admin"
  on public.conversations for update
  using (
    auth.uid() = buyer_id
    or auth.uid() = seller_id
    or (is_support and public.is_admin())
  );

-- Messages: readable/writable only by conversation participants
-- (or an admin, for support conversations).
create policy "messages_select_participant_or_admin"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (
          auth.uid() = c.buyer_id
          or auth.uid() = c.seller_id
          or (c.is_support and public.is_admin())
        )
    )
  );

create policy "messages_insert_participant_or_admin"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (
          auth.uid() = c.buyer_id
          or auth.uid() = c.seller_id
          or (c.is_support and public.is_admin())
        )
    )
  );

-- --------------------------------------------------------
-- 4. Realtime
-- --------------------------------------------------------
-- Required for subscribeToMessages() in lib/api.js to receive
-- live INSERT events. If this statement errors ("already a
-- member" or permission denied), instead enable it manually:
-- Supabase Dashboard -> Database -> Replication -> supabase_realtime
-- -> toggle "messages" table on.
alter publication supabase_realtime add table public.messages;
