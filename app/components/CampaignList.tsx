import { useState } from 'react';
import { PlayCircle, FileText, Clock, CheckCircle2, Plus, Search } from 'lucide-react';
import { campaignData, Campaign } from './CampaignDetail';

interface CampaignListProps {
  onNavigateToCampaign: (campaignId: number) => void;
}

const STATUS_OPTIONS = ['Semua', 'Running', 'Planning', 'Reporting', 'Completed'];

export function CampaignList({ onNavigateToCampaign }: CampaignListProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');

  const allCampaigns = Object.values(campaignData) as Campaign[];

  const filtered = allCampaigns.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.client.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':   return 'bg-green-100 text-green-700';
      case 'Planning':  return 'bg-blue-100 text-blue-700';
      case 'Reporting': return 'bg-orange-100 text-orange-700';
      case 'Completed': return 'bg-slate-100 text-slate-700';
      default:          return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running':   return <PlayCircle size={14} />;
      case 'Planning':  return <FileText size={14} />;
      case 'Reporting': return <Clock size={14} />;
      case 'Completed': return <CheckCircle2 size={14} />;
      default:          return null;
    }
  };

  const getProgress = (campaign: Campaign) =>
    Math.round((campaign.spent / campaign.budget) * 100);

  const countByStatus = (status: string) =>
    allCampaigns.filter(c => c.status === status).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Semua Kampanye</h1>
          <p className="text-slate-600 mt-1">{allCampaigns.length} kampanye terdaftar</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Plus size={18} />
          Tambah Kampanye Baru
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {(['Running', 'Planning', 'Reporting', 'Completed'] as const).map(status => (
          <div
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`rounded-lg p-4 border cursor-pointer transition-all hover:shadow-md ${
              filterStatus === status ? 'ring-2 ring-blue-500' : ''
            } ${
              status === 'Running'   ? 'bg-green-50 border-green-200' :
              status === 'Planning'  ? 'bg-blue-50 border-blue-200' :
              status === 'Reporting' ? 'bg-orange-50 border-orange-200' :
                                       'bg-slate-50 border-slate-200'
            }`}
          >
            <p className={`text-sm font-medium ${
              status === 'Running'   ? 'text-green-700' :
              status === 'Planning'  ? 'text-blue-700' :
              status === 'Reporting' ? 'text-orange-700' :
                                       'text-slate-700'
            }`}>{status}</p>
            <p className={`text-2xl font-semibold mt-1 ${
              status === 'Running'   ? 'text-green-900' :
              status === 'Planning'  ? 'text-blue-900' :
              status === 'Reporting' ? 'text-orange-900' :
                                       'text-slate-900'
            }`}>{countByStatus(status)}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama kampanye atau klien..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Kampanye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Klien</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">KOL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Budget Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada kampanye yang sesuai filter.
                  </td>
                </tr>
              ) : (
                filtered.map(campaign => (
                  <tr
                    key={campaign.id}
                    onClick={() => onNavigateToCampaign(campaign.id)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{campaign.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{campaign.description.substring(0, 60)}...</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{campaign.client}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusIcon(campaign.status)}
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(campaign.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {campaign.kolCount}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 min-w-[80px]">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min(getProgress(campaign), 100)}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600 w-10 text-right">{getProgress(campaign)}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
