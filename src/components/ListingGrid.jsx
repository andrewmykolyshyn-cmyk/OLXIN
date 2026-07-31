/**
 * Listing Grid Component
 * Renders a responsive grid of ListingCards.
 */
import React from 'react';
import ListingCard from './ListingCard';

export default function ListingGrid({ listings, favorites, onToggleFavorite }) {
  if (!listings?.length) return null;

  return (
    <div className="listing-grid">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          isFavorite={favorites?.has(listing.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
