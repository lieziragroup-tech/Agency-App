// ============================================================
// src/types/index.ts
// Central type definitions — dipakai di seluruh aplikasi
// Saat integrasi Firebase, tambahkan field `id: string` (Firestore doc ID)
// ============================================================

export type CampaignStatus = 'Planning' | 'Running' | 'Reporting' | 'Completed';
export type Platform       = 'Instagram' | 'TikTok' | 'YouTube';
export type ContentStatus  = 'Draft' | 'Scheduled' | 'Posted';
export type InvoiceStatus  = 'Paid' | 'Pending' | 'Overdue';

// ----- Campaign -----
export interface Campaign {
  id: number;          // akan jadi string (Firestore doc ID) setelah migrasi
  name: string;
  client: string;
  status: CampaignStatus;
  startDate: string;   // ISO date string
  endDate: string;
  budget: number;      // dalam Rupiah
  spent: number;
  kolCount: number;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// ----- KOL (Key Opinion Leader) -----
export interface KOLPerformance {
  reach: number;
  impressions: number;
  engagement: number;
  clicks?: number;
}

export interface KOL {
  id: number;
  campaignId: number;  // FK ke Campaign
  name: string;
  platform: Platform;
  niche: string;
  followers: string;
  contentStatus: ContentStatus;
  postDate?: string;
  postLink?: string;
  performance?: KOLPerformance;
}

// KOL di database global (tanpa relasi ke kampanye)
export interface KOLProfile {
  id: number;
  name: string;
  niche: string;
  platform: Platform;
  followers: string;
  engagementRate: number;
  rateCard: number;    // dalam Rupiah
  rating: number;
  verified: boolean;
}

// ----- Budget / Invoice -----
export interface Invoice {
  id: number;
  campaignId: number;  // FK ke Campaign
  vendor: string;
  type: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate?: string;
}

export interface BudgetCategory {
  category: string;
  allocated: number;
  spent: number;
}

// ----- Reports -----
export interface PlatformPerformance {
  platform: Platform;
  reach: number;
  engagement: number;
  posts: number;
}

export interface WeeklyEngagement {
  week: string;
  reach: number;
  engagement: number;
}
