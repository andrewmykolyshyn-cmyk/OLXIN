/**
 * OLXIN Format Utilities
 * money(), timeAgo(), and other formatting helpers.
 */

/**
 * Format a price in euros.
 * @param {number} cents - Price in cents (or 0 for free)
 * @returns {string} Formatted price like "1.234,56 €" or "Gratis"
 */
export function money(cents, t) {
  if (cents === 0) return t ? t('listing.negotiable') === 'Negociable' ? 'Gratis' : 'Free' : 'Gratis';
  const euros = cents / 100;
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(euros);
}

/**
 * Format a price from integer euros (used in listing display)
 * @param {number} price - Price in euros
 * @returns {string}
 */
export function formatPrice(price, t) {
  if (price === 0) return 'Gratis';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

/**
 * Relative time string (e.g., "hace 2 dias")
 * @param {string|Date} date
 * @returns {string}
 */
export function timeAgo(date, lang = 'es') {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  const labels = {
    es: { s: 'hace %ds', m: 'hace %dm', h: 'hace %dh', d: 'hace %dd', mo: 'hace %d meses', y: 'hace %da' },
    en: { s: '%ds ago', m: '%dm ago', h: '%dh ago', d: '%dd ago', mo: '%d months ago', y: '%dy ago' },
    ca: { s: 'fa %ds', m: 'fa %dm', h: 'fa %dh', d: 'fa %dd', mo: 'fa %d mesos', y: 'fa %da' },
    uk: { s: '%d s tomu', m: '%d hv tomu', h: '%d hod tomu', d: '%d dniv tomu', mo: '%d misjaci tomu', y: '%d rokiv tomu' },
    ru: { s: '%d s nazad', m: '%d min nazad', h: '%d ch nazad', d: '%d dney nazad', mo: '%d mesyacev nazad', y: '%d let nazad' },
  };

  const l = labels[lang] || labels['es'];

  if (seconds < 60) return l.s.replace('%d', seconds);
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return l.m.replace('%d', mins);
  const hours = Math.floor(mins / 60);
  if (hours < 24) return l.h.replace('%d', hours);
  const days = Math.floor(hours / 24);
  if (days < 30) return l.d.replace('%d', days);
  const months = Math.floor(days / 30);
  if (months < 12) return l.mo.replace('%d', months);
  const years = Math.floor(months / 12);
  return l.y.replace('%d', years);
}

/**
 * Get year from date string
 * @param {string|Date} date
 * @returns {number}
 */
export function getYear(date) {
  return new Date(date).getFullYear();
}

/**
 * Compress/resize an image before upload.
 * Returns a Promise that resolves to a File.
 */
export function compressImage(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas toBlob failed'));
          const compressed = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressed);
        },
        'image/jpeg',
        quality
      );
    };
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}
