import { useState } from 'react';
import { ArrowLeft, Calendar, DollarSign, Users, BarChart3 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { KOLManagementTab } from './KOLManagementTab';
import { TimelineTab } from './TimelineTab';
import { BudgetTab } from './BudgetTab';

interface CampaignDetailProps {
  campaignId: number;
  onBack: () => void;
}

export interface Campaign {
  id: number;
  name: string;
  client: string;
  status: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  kolCount: number;
  description: string;
}

// FIX: Data lengkap untuk semua 5 kampanye (sebelumnya hanya ada ID 1)
export const campaignData: Record<number, Campaign> = {
  1: {
    id: 1,
    name: 'Peluncuran Produk Skincare XYZ',
    client: 'PT Beauty Indonesia',
    status: 'Running',
    startDate: '2026-02-10',
    endDate: '2026-03-05',
    budget: 350000000,
    spent: 245000000,
    kolCount: 8,
    description: 'Kampanye peluncuran produk skincare baru dengan fokus pada audience wanita usia 25-35 tahun. Target awareness 5 juta reach.',
  },
  2: {
    id: 2,
    name: 'Campaign Brand Awareness Gadget Tech',
    client: 'Tech Solutions Co',
    status: 'Planning',
    startDate: '2026-03-01',
    endDate: '2026-03-15',
    budget: 200000000,
    spent: 40000000,
    kolCount: 5,
    description: 'Kampanye brand awareness untuk lini produk gadget terbaru. Target segmen tech-savvy usia 18-30 tahun.',
  },
  3: {
    id: 3,
    name: 'Promo Ramadan Food & Beverage',
    client: 'F&B Group',
    status: 'Running',
    startDate: '2026-02-15',
    endDate: '2026-02-28',
    budget: 180000000,
    spent: 153000000,
    kolCount: 10,
    description: 'Kampanye promosi produk F&B menjelang Ramadan. Fokus pada konten resep, sahur, dan buka puasa.',
  },
  4: {
    id: 4,
    name: 'Launch E-Commerce Platform',
    client: 'Digital Marketplace',
    status: 'Reporting',
    startDate: '2026-02-01',
    endDate: '2026-02-27',
    budget: 500000000,
    spent: 475000000,
    kolCount: 15,
    description: 'Kampanye peluncuran platform e-commerce baru. Target 1 juta app download dalam 30 hari pertama.',
  },
  5: {
    id: 5,
    name: 'Fashion Week Campaign',
    client: 'Fashion Brands Ltd',
    status: 'Completed',
    startDate: '2026-02-01',
    endDate: '2026-02-20',
    budget: 300000000,
    spent: 298000000,
    kolCount: 12,
    description: 'Kampanye fashion week dengan KOL fashion influencer. Coverage di 3 kota: Jakarta, Surabaya, Bali.',
  },
};

export function CampaignDetail({ campaignId, onBack }: CampaignDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const campaign = campaignData[campaignId];

  // FIX: Not-found state yang proper
  if (!campaign) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Kampanye tidak ditemukan</h2>
          <p className="text-slate-600 mt-2">ID kampanye #{campaignId} tidak ada.</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':   return 'bg-green-100 text-green-700 border-green-200';
      case 'Planning':  return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Reporting': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default:          return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4 transition-colors">
            <ArrowLeft size={20} />
            <span>Kembali ke Dashboard</span>
          </button>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-slate-900">{campaign.name}</h1>
              <p className="text-slate-600 mt-2">{campaign.client}</p>
              <p className="text-sm text-slate-500 mt-1">{campaign.description}</p>
            </div>
            <span className={`px-4 py-2 rounded-lg border font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Durasi Kampanye</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(campaign.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} -{' '}
                    {new Date(campaign.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Budget Terpakai</p>
                  <p className="font-semibold text-slate-900">
                    {Math.round((campaign.spent / campaign.budget) * 100)}% dari IDR {(campaign.budget / 1000000).toFixed(0)}M
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-600">Total KOL</p>
                  <p className="font-semibold text-slate-900">{campaign.kolCount} Influencers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex gap-1 border-b border-slate-200 bg-white rounded-t-lg">
          <Tabs.Trigger value="overview" className="px-6 py-3 font-medium text-slate-600 hover:text-slate-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors">
            <div className="flex items-center gap-2"><BarChart3 size={18} />Overview & Timeline</div>
          </Tabs.Trigger>
          <Tabs.Trigger value="kol" className="px-6 py-3 font-medium text-slate-600 hover:text-slate-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors">
            <div className="flex items-center gap-2"><Users size={18} />KOL Management</div>
          </Tabs.Trigger>
          <Tabs.Trigger value="budget" className="px-6 py-3 font-medium text-slate-600 hover:text-slate-900 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-colors">
            <div className="flex items-center gap-2"><DollarSign size={18} />Budget & Admin</div>
          </Tabs.Trigger>
        </Tabs.List>
        <div className="bg-white rounded-b-lg border border-slate-200 border-t-0">
          <Tabs.Content value="overview" className="p-6"><TimelineTab campaign={campaign} /></Tabs.Content>
          <Tabs.Content value="kol" className="p-6"><KOLManagementTab campaignId={campaign.id} /></Tabs.Content>
          <Tabs.Content value="budget" className="p-6"><BudgetTab campaign={campaign} /></Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
