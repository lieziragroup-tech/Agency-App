// ============================================================
// src/hooks/useInvoices.ts
// ============================================================

import { useState, useEffect } from 'react';
import { getInvoicesByCampaign, createInvoice, markInvoicePaid } from '../lib/firestore';
import type { Invoice } from '../types';

export function useInvoices(campaignId: string | null) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!campaignId) return;
    let cancelled = false;

    getInvoicesByCampaign(campaignId)
      .then(data => { if (!cancelled) setInvoices(data); })
      .catch(console.error);

    return () => { cancelled = true; };
  }, [campaignId]);

  async function addInvoice(data: Omit<Invoice, 'id' | 'campaignId'>) {
    if (!campaignId) return;
    const newId = await createInvoice(campaignId, data);
    setInvoices(prev => [...prev, { id: newId as any, campaignId: campaignId as any, ...data }]);
  }

  async function payInvoice(invoiceId: string) {
    if (!campaignId) return;
    await markInvoicePaid(campaignId, invoiceId);
    setInvoices(prev => prev.map(inv =>
      String(inv.id) === invoiceId
        ? { ...inv, status: 'Paid', paidDate: new Date().toISOString().split('T')[0] }
        : inv
    ));
  }

  return { invoices, loading, addInvoice, payInvoice };
}
