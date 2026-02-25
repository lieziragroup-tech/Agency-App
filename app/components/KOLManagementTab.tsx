import { useState } from 'react';
import { Edit, ExternalLink, CheckCircle } from 'lucide-react';
import { PerformanceInputModal } from './PerformanceInputModal';

export interface KOL {
  id: number;
  name: string;
  platform: string;
  niche: string;
  followers: string;
  contentStatus: 'Posted' | 'Draft' | 'Scheduled';
  postDate?: string;
  postLink?: string;
  performance?: {
    reach: number;
    impressions: number;
    engagement: number;
    clicks?: number;
  };
}

// FIX: Data KOL dikelompokkan per campaign ID
// (saat integrasi Firebase nanti, ini diganti dengan query by campaignId)
const kolDataByCampaign: Record<number, KOL[]> = {
  1: [
    { id: 1, name: 'Jessica Beauty', platform: 'Instagram', niche: 'Beauty & Skincare', followers: '450K', contentStatus: 'Posted', postDate: '2026-02-23', postLink: 'https://instagram.com/p/example1', performance: { reach: 380000, impressions: 520000, engagement: 24500, clicks: 3200 } },
    { id: 2, name: 'Sarah Glow Up', platform: 'TikTok', niche: 'Beauty & Lifestyle', followers: '890K', contentStatus: 'Posted', postDate: '2026-02-23', postLink: 'https://tiktok.com/@example2', performance: { reach: 650000, impressions: 890000, engagement: 52000 } },
    { id: 3, name: 'Beauty by Linda', platform: 'Instagram', niche: 'Skincare Expert', followers: '320K', contentStatus: 'Posted', postDate: '2026-02-24', postLink: 'https://instagram.com/p/example3' },
    { id: 4, name: 'Cantik Alami', platform: 'TikTok', niche: 'Natural Beauty', followers: '560K', contentStatus: 'Scheduled', postDate: '2026-02-27' },
    { id: 5, name: 'Skincare Junkie', platform: 'Instagram', niche: 'Skincare Reviews', followers: '280K', contentStatus: 'Scheduled', postDate: '2026-02-27' },
    { id: 6, name: 'Glow Beauty ID', platform: 'YouTube', niche: 'Beauty Tutorials', followers: '125K', contentStatus: 'Draft' },
    { id: 7, name: 'Natural Skin Care', platform: 'Instagram', niche: 'Organic Beauty', followers: '195K', contentStatus: 'Scheduled', postDate: '2026-02-28' },
    { id: 8, name: 'Beauty Expert Maya', platform: 'TikTok', niche: 'Beauty Tips', followers: '410K', contentStatus: 'Draft' },
  ],
  2: [
    { id: 1, name: 'Tech Guru Indo', platform: 'YouTube', niche: 'Technology', followers: '320K', contentStatus: 'Draft' },
    { id: 2, name: 'Gaming Master', platform: 'TikTok', niche: 'Gaming & Tech', followers: '680K', contentStatus: 'Draft' },
    { id: 3, name: 'Gadget Review ID', platform: 'Instagram', niche: 'Tech Reviews', followers: '210K', contentStatus: 'Draft' },
    { id: 4, name: 'ByteHack ID', platform: 'YouTube', niche: 'Technology', followers: '145K', contentStatus: 'Draft' },
    { id: 5, name: 'TechTalk Indonesia', platform: 'TikTok', niche: 'Tech & Lifestyle', followers: '390K', contentStatus: 'Draft' },
  ],
  3: [
    { id: 1, name: 'Foodie Adventures', platform: 'Instagram', niche: 'Food & Beverage', followers: '520K', contentStatus: 'Posted', postDate: '2026-02-20', performance: { reach: 410000, impressions: 580000, engagement: 28000 } },
    { id: 2, name: 'Dapur Nusantara', platform: 'TikTok', niche: 'Kuliner', followers: '750K', contentStatus: 'Posted', postDate: '2026-02-21', performance: { reach: 620000, impressions: 880000, engagement: 44000 } },
    { id: 3, name: 'Healthy Living', platform: 'YouTube', niche: 'Health & Wellness', followers: '280K', contentStatus: 'Scheduled', postDate: '2026-02-26' },
  ],
  4: [
    { id: 1, name: 'ShopSmart ID', platform: 'Instagram', niche: 'E-Commerce', followers: '480K', contentStatus: 'Posted', performance: { reach: 390000, impressions: 510000, engagement: 22000 } },
    { id: 2, name: 'Deal Hunter', platform: 'TikTok', niche: 'Shopping & Deals', followers: '920K', contentStatus: 'Posted', performance: { reach: 780000, impressions: 1100000, engagement: 68000 } },
  ],
  5: [
    { id: 1, name: 'Fashion Week ID', platform: 'Instagram', niche: 'Fashion', followers: '420K', contentStatus: 'Posted', performance: { reach: 350000, impressions: 480000, engagement: 21000 } },
    { id: 2, name: 'Style by Rani', platform: 'TikTok', niche: 'Fashion & Lifestyle', followers: '610K', contentStatus: 'Posted', performance: { reach: 500000, impressions: 720000, engagement: 39000 } },
  ],
};

interface KOLManagementTabProps {
  campaignId: number;
}

export function KOLManagementTab({ campaignId }: KOLManagementTabProps) {
  // FIX: State lokal untuk menyimpan data KOL per kampanye agar perubahan persist selama sesi
  const [kolList, setKolList] = useState<KOL[]>(
    kolDataByCampaign[campaignId] ?? []
  );
  const [selectedKOL, setSelectedKOL] = useState<KOL | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputPerformance = (kol: KOL) => {
    setSelectedKOL(kol);
    setIsModalOpen(true);
  };

  // FIX: handleSavePerformance sekarang benar-benar update state (sebelumnya hanya console.log)
  const handleSavePerformance = (data: {
    kolId: number;
    reach: string;
    impressions: string;
    engagement: string;
    clicks: string;
    postLink: string;
  }) => {
    setKolList(prev =>
      prev.map(kol => {
        if (kol.id !== data.kolId) return kol;
        return {
          ...kol,
          postLink: data.postLink || kol.postLink,
          contentStatus: 'Posted',
          performance: {
            reach: Number(data.reach) || 0,
            impressions: Number(data.impressions) || 0,
            engagement: Number(data.engagement) || 0,
            clicks: data.clicks ? Number(data.clicks) : undefined,
          },
        };
      })
    );
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Posted':    return 'bg-green-100 text-green-700 border-green-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Draft':     return 'bg-slate-100 text-slate-600 border-slate-200';
      default:          return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-700';
      case 'TikTok':    return 'bg-slate-900 text-white';
      case 'YouTube':   return 'bg-red-100 text-red-700';
      default:          return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">KOL Management & Performance Tracking</h3>
          <p className="text-sm text-slate-600 mt-1">Kelola influencer dan input data performa konten</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Tambah KOL
        </button>
      </div>

      {kolList.length === 0 ? (
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-500">Belum ada KOL untuk kampanye ini.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">KOL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Platform</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Niche</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Followers</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {kolList.map(kol => (
                  <tr key={kol.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {kol.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{kol.name}</p>
                          {kol.postDate && (
                            <p className="text-xs text-slate-500">
                              {new Date(kol.postDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(kol.platform)}`}>
                        {kol.platform}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{kol.niche}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{kol.followers}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-medium text-xs ${getStatusColor(kol.contentStatus)}`}>
                        {kol.contentStatus === 'Posted' && <CheckCircle size={14} />}
                        {kol.contentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {kol.performance ? (
                        <div className="space-y-1">
                          <p className="text-xs text-slate-600">Reach: <span className="font-semibold text-slate-900">{kol.performance.reach.toLocaleString()}</span></p>
                          <p className="text-xs text-slate-600">Eng: <span className="font-semibold text-slate-900">{kol.performance.engagement.toLocaleString()}</span></p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">No data</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {kol.postLink && (
                          <a href={kol.postLink} target="_blank" rel="noopener noreferrer"
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <button onClick={() => handleInputPerformance(kol)}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors flex items-center gap-1.5">
                          <Edit size={14} />
                          Input Performance
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {(['Posted', 'Scheduled', 'Draft'] as const).map(status => (
          <div key={status} className={`rounded-lg p-4 border ${
            status === 'Posted'    ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' :
            status === 'Scheduled' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' :
                                     'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
          }`}>
            <p className={`text-sm ${status === 'Posted' ? 'text-green-700' : status === 'Scheduled' ? 'text-blue-700' : 'text-slate-700'}`}>{status}</p>
            <p className={`text-2xl font-semibold mt-1 ${status === 'Posted' ? 'text-green-900' : status === 'Scheduled' ? 'text-blue-900' : 'text-slate-900'}`}>
              {kolList.filter(k => k.contentStatus === status).length}
            </p>
          </div>
        ))}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <p className="text-sm text-purple-700">Total KOL</p>
          <p className="text-2xl font-semibold text-purple-900 mt-1">{kolList.length}</p>
        </div>
      </div>

      {selectedKOL && (
        <PerformanceInputModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          kol={selectedKOL}
          onSave={handleSavePerformance}
        />
      )}
    </div>
  );
}
