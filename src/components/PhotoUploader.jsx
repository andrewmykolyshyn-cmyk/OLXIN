/**
 * Photo Uploader Component
 * Click zone to select images, compresses to max 1600px, uploads
 * to Supabase Storage, shows preview grid with remove.
 * Max 5 photos.
 */
import React, { useRef, useState } from 'react';
import { uploadPhoto, deletePhoto } from '@/lib/api';
import { compressImage } from '@/lib/format';
import { showToast } from './Toast';
import Spinner from './Spinner';

export default function PhotoUploader({ photos, onChange, t }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState({}); // { [fileName]: boolean }

  const handleClick = () => inputRef.current?.click();

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remainingSlots = 5 - photos.length;
    const toUpload = files.slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      showToast('Max 5 fotos', 'error');
    }

    for (const file of toUpload) {
      if (!file.type.startsWith('image/')) continue;

      setUploading((prev) => ({ ...prev, [file.name]: true }));
      try {
        const compressed = await compressImage(file, 1600, 0.85);
        const url = await uploadPhoto(compressed);
        onChange([...photos, url]);
      } catch (err) {
        console.error('Upload error:', err);
        showToast('Error al subir foto', 'error');
      } finally {
        setUploading((prev) => ({ ...prev, [file.name]: false }));
      }
    }

    // Reset input
    e.target.value = '';
  };

  const handleRemove = async (url) => {
    onChange(photos.filter((p) => p !== url));
    try {
      await deletePhoto(url);
    } catch (err) {
      console.error('Failed to delete photo:', err);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        aria-label="Upload photos"
      />

      {photos.length < 5 && (
        <div
          className="photo-upload-zone"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          📷 {t('publish.photosHint')}
        </div>
      )}

      {(photos.length > 0 || Object.keys(uploading).length > 0) && (
        <div className="photo-grid">
          {photos.map((url) => (
            <div key={url} className="photo-thumb">
              <img src={url} alt="Uploaded photo" />
              <button
                className="remove"
                onClick={() => handleRemove(url)}
                aria-label="Remove photo"
              >
                ×
              </button>
            </div>
          ))}
          {Object.entries(uploading)
            .filter(([, v]) => v)
            .map(([name]) => (
              <div key={name} className="photo-thumb" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size="small" />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
