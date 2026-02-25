// ============================================================
// src/lib/firestore.ts
// Semua Firestore CRUD operations terpusat di sini
// Komponen tidak boleh import firebase/firestore langsung —
// selalu lewat file ini untuk memudahkan testing & swap backend
// ============================================================

import {
  collection, doc,
  getDocs, getDoc, addDoc, updateDoc, deleteDoc,
  query, where, orderBy,
  Timestamp, serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Campaign, KOL, KOLProfile, Invoice } from '../types';

// ── CAMPAIGNS ─────────────────────────────────────────────

export async function getCampaigns(): Promise<Campaign[]> {
  const snap = await getDocs(query(collection(db, 'campaigns'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Campaign));
}

export async function getCampaignById(id: string): Promise<Campaign | null> {
  const snap = await getDoc(doc(db, 'campaigns', id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as unknown as Campaign;
}

export async function createCampaign(data: Omit<Campaign, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'campaigns'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateCampaign(id: string, data: Partial<Campaign>): Promise<void> {
  await updateDoc(doc(db, 'campaigns', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteCampaign(id: string): Promise<void> {
  await deleteDoc(doc(db, 'campaigns', id));
}

// ── KOL (per kampanye, subcollection) ─────────────────────

export async function getKOLsByCampaign(campaignId: string): Promise<KOL[]> {
  const snap = await getDocs(collection(db, 'campaigns', campaignId, 'kols'));
  return snap.docs.map(d => ({ id: d.id, campaignId, ...d.data() } as unknown as KOL));
}

export async function upsertKOLPerformance(
  campaignId: string,
  kolId: string,
  performance: KOL['performance'],
  postLink?: string,
): Promise<void> {
  await updateDoc(doc(db, 'campaigns', campaignId, 'kols', kolId), {
    performance,
    ...(postLink ? { postLink } : {}),
    contentStatus: 'Posted',
    updatedAt: serverTimestamp(),
  });
}

// ── INVOICES (per kampanye, subcollection) ─────────────────

export async function getInvoicesByCampaign(campaignId: string): Promise<Invoice[]> {
  const snap = await getDocs(collection(db, 'campaigns', campaignId, 'invoices'));
  return snap.docs.map(d => ({ id: d.id, campaignId, ...d.data() } as unknown as Invoice));
}

export async function createInvoice(campaignId: string, data: Omit<Invoice, 'id' | 'campaignId'>): Promise<string> {
  const ref = await addDoc(collection(db, 'campaigns', campaignId, 'invoices'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function markInvoicePaid(campaignId: string, invoiceId: string): Promise<void> {
  await updateDoc(doc(db, 'campaigns', campaignId, 'invoices', invoiceId), {
    status: 'Paid',
    paidDate: new Date().toISOString().split('T')[0],
  });
}

// ── KOL PROFILES (global database) ────────────────────────

export async function getKOLProfiles(): Promise<KOLProfile[]> {
  const snap = await getDocs(collection(db, 'kol_profiles'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as KOLProfile));
}

export async function createKOLProfile(data: Omit<KOLProfile, 'id'>): Promise<string> {
  const ref = await addDoc(collection(db, 'kol_profiles'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ── SEED (isi data awal ke Firestore dari mock data) ───────
// Jalankan sekali saja untuk migrasi dari dummy ke Firestore:
//
// import { seedFirestore } from './firestore';
// seedFirestore();  // jalankan dari console dev tools atau script terpisah

export async function seedFirestore(): Promise<void> {
  // Import mock data — ganti path sesuai lokasi file kamu
  const { campaignData } = await import('../app/components/CampaignDetail');

  console.log('🌱 Seeding Firestore...');
  for (const campaign of Object.values(campaignData)) {
    const { id, ...rest } = campaign as any;
    const ref = await addDoc(collection(db, 'campaigns'), {
      ...rest,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`  ✅ Campaign "${campaign.name}" → ID: ${ref.id}`);
  }
  console.log('🎉 Seeding complete!');
}
