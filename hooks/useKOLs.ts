// ============================================================
// src/hooks/useKOLs.ts
// Custom hook untuk KOL data per kampanye dari Firestore
// ============================================================

import { useState, useEffect } from 'react';
import { getKOLsByCampaign, upsertKOLPerformance } from '../lib/firestore';
import type { KOL } from '../types';

export function useKOLsByCampaign(campaignId: string | null) {
  const [kols, setKols]         = useState<KOL[]>([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    if (!campaignId) return;
    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        const data = await getKOLsByCampaign(campaignId);
        if (!cancelled) setKols(data);
      } catch (err) {
        if (!cancelled) setError('Gagal memuat data KOL.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [campaignId]);

  // Simpan performance data ke Firestore + update local state sekaligus
  async function savePerformance(
    kolId: string,
    performance: KOL['performance'],
    postLink?: string,
  ) {
    if (!campaignId) return;
    try {
      setSaving(true);
      await upsertKOLPerformance(campaignId, kolId, performance, postLink);
      // Optimistic update — tidak perlu re-fetch
      setKols(prev => prev.map(k =>
        String(k.id) === kolId
          ? { ...k, performance, contentStatus: 'Posted', postLink: postLink ?? k.postLink }
          : k
      ));
    } catch (err) {
      console.error('Gagal menyimpan performance:', err);
      throw err;
    } finally {
      setSaving(false);
    }
  }

  return { kols, loading, error, saving, savePerformance };
}
