// ============================================================
// src/hooks/useCampaigns.ts
// Custom hook untuk fetch & manage campaigns dari Firestore
// Komponen cukup panggil useCampaigns() — tidak perlu tahu
// detail Firestore sama sekali
// ============================================================

import { useState, useEffect } from 'react';
import { getCampaigns, getCampaignById } from '../lib/firestore';
import type { Campaign } from '../types';

// Hook untuk semua kampanye (dipakai di Dashboard & CampaignList)
export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCampaigns();
        if (!cancelled) setCampaigns(data);
      } catch (err) {
        if (!cancelled) setError('Gagal memuat data kampanye.');
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, []);

  return { campaigns, loading, error };
}

// Hook untuk satu kampanye by ID (dipakai di CampaignDetail)
export function useCampaignById(id: string | null) {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCampaignById(id);
        if (!cancelled) setCampaign(data);
      } catch (err) {
        if (!cancelled) setError('Kampanye tidak ditemukan.');
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [id]);

  return { campaign, loading, error };
}
