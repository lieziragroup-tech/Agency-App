import { useState } from 'react';
import { Search, Filter, Star, Instagram, Youtube } from 'lucide-react';

interface KOLProfile {
  id: number;
  name: string;
  niche: string;
  platform: string;
  followers: string;
  engagementRate: number;
  rateCard: number;
  rating: number;
  verified: boolean;
}

const kolDatabase: KOLProfile[] = [
  {
    id: 1,
    name: 'Jessica Beauty',
    niche: 'Beauty & Skincare',
    platform: 'Instagram',
    followers: '450K',
    engagementRate: 5.2,
    rateCard: 25000000,
    rating: 4.8,
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Glow Up',
    niche: 'Beauty & Lifestyle',
    platform: 'TikTok',
    followers: '890K',
    engagementRate: 6.8,
    rateCard: 35000000,
    rating: 4.9,
    verified: true,
  },
  {
    id: 3,
    name: 'Tech Guru Indo',
    niche: 'Technology',
    platform: 'YouTube',
    followers: '320K',
    engagementRate: 4.5,
    rateCard: 28000000,
    rating: 4.7,
    verified: true,
  },
  {
    id: 4,
    name: 'Foodie Adventures',
    niche: 'Food & Beverage',
    platform: 'Instagram',
    followers: '520K',
    engagementRate: 5.9,
    rateCard: 30000000,
    rating: 4.6,
    verified: false,
  },
  {
    id: 5,
    name: 'Beauty by Linda',
    niche: 'Skincare Expert',
    platform: 'Instagram',
    followers: '320K',
    engagementRate: 4.8,
    rateCard: 20000000,
    rating: 4.5,
    verified: true,
  },
  {
    id: 6,
    name: 'Gaming Master',
    niche: 'Gaming & Tech',
    platform: 'TikTok',
    followers: '680K',
    engagementRate: 7.2,
    rateCard: 32000000,
    rating: 4.8,
    verified: true,
  },
  {
    id: 7,
    name: 'Cantik Alami',
    niche: 'Natural Beauty',
    platform: 'TikTok',
    followers: '560K',
    engagementRate: 6.1,
    rateCard: 27000000,
    rating: 4.7,
    verified: false,
  },
  {
    id: 8,
    name: 'Fashion Week ID',
    niche: 'Fashion',
    platform: 'Instagram',
    followers: '420K',
    engagementRate: 5.4,
    rateCard: 26000000,
    rating: 4.6,
    verified: true,
  },
  {
    id: 9,
    name: 'Healthy Living',
    niche: 'Health & Wellness',
    platform: 'YouTube',
    followers: '280K',
    engagementRate: 4.2,
    rateCard: 22000000,
    rating: 4.4,
    verified: false,
  },
  {
    id: 10,
    name: 'Travel Indo',
    niche: 'Travel & Lifestyle',
    platform: 'Instagram',
    followers: '380K',
    engagementRate: 5.0,
    rateCard: 24000000,
    rating: 4.5,
    verified: true,
  },
];

export function KOLDatabase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const niches = ['all', 'Beauty & Skincare', 'Technology', 'Food & Beverage', 'Fashion', 'Gaming & Tech', 'Health & Wellness', 'Travel & Lifestyle'];
  const platforms = ['all', 'Instagram', 'TikTok', 'YouTube'];

  const filteredKOLs = kolDatabase.filter(kol => {
    const matchesSearch = kol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kol.niche.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || kol.niche === selectedNiche;
    const matchesPlatform = selectedPlatform === 'all' || kol.platform === selectedPlatform;
    
    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = kol.rateCard < 25000000;
    else if (priceRange === 'medium') matchesPrice = kol.rateCard >= 25000000 && kol.rateCard < 30000000;
    else if (priceRange === 'high') matchesPrice = kol.rateCard >= 30000000;

    return matchesSearch && matchesNiche && matchesPlatform && matchesPrice;
  });

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram size={16} />;
      case 'YouTube':
        return <Youtube size={16} />;
      default:
        return null;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return 'bg-pink-100 text-pink-700';
      case 'TikTok':
        return 'bg-slate-900 text-white';
      case 'YouTube':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">KOL Database</h1>
          <p className="text-slate-600 mt-1">Manajemen database influencer dan KOL</p>
        </div>
        <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          + Tambah KOL Baru
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama KOL atau niche..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Niche Filter */}
          <div className="w-64">
            <select
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {niches.map(niche => (
                <option key={niche} value={niche}>
                  {niche === 'all' ? 'Semua Niche' : niche}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div className="w-48">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform === 'all' ? 'Semua Platform' : platform}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="w-48">
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Semua Harga</option>
              <option value="low">&lt; IDR 25M</option>
              <option value="medium">IDR 25M - 30M</option>
              <option value="high">&gt; IDR 30M</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Menampilkan <span className="font-semibold text-slate-900">{filteredKOLs.length}</span> dari {kolDatabase.length} KOL
          </p>
        </div>
      </div>

      {/* KOL Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  KOL Profile
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Niche
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Followers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Avg Engagement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Rate Card
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredKOLs.map((kol) => (
                <tr key={kol.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {kol.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 flex items-center gap-2">
                          {kol.name}
                          {kol.verified && (
                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {kol.niche}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(kol.platform)}`}>
                      {getPlatformIcon(kol.platform)}
                      {kol.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {kol.followers}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                      kol.engagementRate >= 6 ? 'bg-green-100 text-green-700' :
                      kol.engagementRate >= 5 ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {kol.engagementRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    IDR {(kol.rateCard / 1000000).toFixed(0)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-medium text-slate-900">{kol.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700">Total KOL</p>
          <p className="text-2xl font-semibold text-blue-900 mt-1">{kolDatabase.length}</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
          <p className="text-sm text-pink-700">Instagram</p>
          <p className="text-2xl font-semibold text-pink-900 mt-1">
            {kolDatabase.filter(k => k.platform === 'Instagram').length}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-300">
          <p className="text-sm text-slate-700">TikTok</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">
            {kolDatabase.filter(k => k.platform === 'TikTok').length}
          </p>
        </div>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <p className="text-sm text-red-700">YouTube</p>
          <p className="text-2xl font-semibold text-red-900 mt-1">
            {kolDatabase.filter(k => k.platform === 'YouTube').length}
          </p>
        </div>
      </div>
    </div>
  );
}
