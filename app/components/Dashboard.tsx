import { MetricCard } from './MetricCard';
import { 
  Megaphone, 
  Calendar, 
  Wallet, 
  TrendingUp,
  Clock,
  CheckCircle2,
  PlayCircle,
  FileText
} from 'lucide-react';

const currentCampaigns = [
  {
    id: 1,
    name: 'Peluncuran Produk Skincare XYZ',
    client: 'PT Beauty Indonesia',
    status: 'Running',
    deadline: '2026-03-05',
    progress: 65,
  },
  {
    id: 2,
    name: 'Campaign Brand Awareness Gadget Tech',
    client: 'Tech Solutions Co',
    status: 'Planning',
    deadline: '2026-03-15',
    progress: 30,
  },
  {
    id: 3,
    name: 'Promo Ramadan Food & Beverage',
    client: 'F&B Group',
    status: 'Running',
    deadline: '2026-02-28',
    progress: 85,
  },
  {
    id: 4,
    name: 'Launch E-Commerce Platform',
    client: 'Digital Marketplace',
    status: 'Reporting',
    deadline: '2026-02-27',
    progress: 95,
  },
  {
    id: 5,
    name: 'Fashion Week Campaign',
    client: 'Fashion Brands Ltd',
    status: 'Completed',
    deadline: '2026-02-20',
    progress: 100,
  },
];

const upcomingEvents = [
  { time: '10:00', title: 'Client Meeting - Beauty Indonesia', type: 'meeting' },
  { time: '14:00', title: 'Content Review - Gadget Tech', type: 'review' },
  { time: '16:30', title: 'Deadline: Submit Performance Report', type: 'deadline' },
];

interface DashboardProps {
  onNavigateToCampaign?: (campaignId: number) => void;
}

export function Dashboard({ onNavigateToCampaign }: DashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-green-100 text-green-700';
      case 'Planning':
        return 'bg-blue-100 text-blue-700';
      case 'Reporting':
        return 'bg-orange-100 text-orange-700';
      case 'Completed':
        return 'bg-slate-100 text-slate-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running':
        return <PlayCircle size={16} />;
      case 'Planning':
        return <FileText size={16} />;
      case 'Reporting':
        return <Clock size={16} />;
      case 'Completed':
        return <CheckCircle2 size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">Selamat Pagi, Admin</h1>
        <p className="text-slate-600 mt-1">Rabu, 25 Februari 2026</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <MetricCard
          title="Total Kampanye Aktif"
          value={12}
          icon={Megaphone}
          trend="+2 dari bulan lalu"
          trendColor="text-green-600"
        />
        <MetricCard
          title="Timeline Kritis Minggu Ini"
          value={3}
          icon={Calendar}
          trend="3 deadline mendekat"
          trendColor="text-orange-600"
        />
        <MetricCard
          title="Budget Terpakai Bulan Ini"
          value="IDR 450M"
          icon={Wallet}
          trend="75% dari total budget"
          trendColor="text-blue-600"
        />
        <MetricCard
          title="Rata-rata Engagement Rate"
          value="4.8%"
          icon={TrendingUp}
          trend="+0.5% dari bulan lalu"
          trendColor="text-green-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Campaigns Table */}
        <div className="col-span-2 bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Kampanye Terbaru</h2>
            <p className="text-sm text-slate-600 mt-1">5 kampanye yang baru diupdate</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Kampanye
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Klien
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                    Progress
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {currentCampaigns.map((campaign) => (
                  <tr 
                    key={campaign.id} 
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                    onClick={() => onNavigateToCampaign?.(campaign.id)}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{campaign.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {campaign.client}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(campaign.deadline).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${campaign.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600 w-12 text-right">{campaign.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Agenda Hari Ini</h2>
            <p className="text-sm text-slate-600 mt-1">Rabu, 25 Februari 2026</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-xs text-blue-600 font-medium">
                        {event.time.split(':')[0]}
                      </span>
                      <span className="text-lg font-semibold text-blue-600">
                        {event.time.split(':')[1]}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-medium text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500 mt-1 capitalize">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                + Tambah Kampanye Baru
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
