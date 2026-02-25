import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, Users } from 'lucide-react';

const platformPerformance = [
  { platform: 'Instagram', reach: 1250000, engagement: 68500, posts: 12 },
  { platform: 'TikTok', reach: 2890000, engagement: 142000, posts: 8 },
  { platform: 'YouTube', reach: 680000, engagement: 31200, posts: 5 },
];

const weeklyEngagement = [
  { week: 'Week 1', engagement: 24500, reach: 380000 },
  { week: 'Week 2', reach: 520000, engagement: 31200 },
  { week: 'Week 3', reach: 680000, engagement: 45800 },
  { week: 'Week 4', reach: 890000, engagement: 52000 },
];

const contentTypeDistribution = [
  { type: 'Photo Post', value: 45, count: 12 },
  { type: 'Video', value: 30, count: 8 },
  { type: 'Reels/Shorts', value: 20, count: 5 },
  { type: 'Stories', value: 5, count: 15 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];

export function Reports() {
  const totalReach = platformPerformance.reduce((sum, p) => sum + p.reach, 0);
  const totalEngagement = platformPerformance.reduce((sum, p) => sum + p.engagement, 0);
  const avgEngagementRate = ((totalEngagement / totalReach) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">Analisis performa kampanye dan generate laporan</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2">
            <FileText size={20} />
            Generate Dashboard
          </button>
          <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <Download size={20} />
            Export to PDF
          </button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <p className="text-sm text-blue-700">Total Reach</p>
          </div>
          <p className="text-3xl font-semibold text-blue-900">
            {(totalReach / 1000000).toFixed(1)}M
          </p>
          <p className="text-xs text-blue-600 mt-1">Across all platforms</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <p className="text-sm text-purple-700">Total Engagement</p>
          </div>
          <p className="text-3xl font-semibold text-purple-900">
            {(totalEngagement / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-purple-600 mt-1">Likes, comments, shares</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <BarChart size={20} className="text-white" />
            </div>
            <p className="text-sm text-green-700">Avg Engagement Rate</p>
          </div>
          <p className="text-3xl font-semibold text-green-900">{avgEngagementRate}%</p>
          <p className="text-xs text-green-600 mt-1">Above industry avg (3.5%)</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={20} />
            </div>
            <p className="text-sm text-orange-700">Total Posts</p>
          </div>
          <p className="text-3xl font-semibold text-orange-900">
            {platformPerformance.reduce((sum, p) => sum + p.posts, 0)}
          </p>
          <p className="text-xs text-orange-600 mt-1">Published content</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Platform Performance Bar Chart */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance by Platform</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={platformPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="platform" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="reach" fill="#3b82f6" name="Reach" />
              <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Engagement Trend */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyEngagement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="reach" stroke="#3b82f6" strokeWidth={3} name="Reach" />
              <Line type="monotone" dataKey="engagement" stroke="#ec4899" strokeWidth={3} name="Engagement" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Type Distribution */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Content Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contentTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {contentTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Platform Stats */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Statistics</h3>
          <div className="space-y-4">
            {platformPerformance.map((platform, index) => {
              const engagementRate = ((platform.engagement / platform.reach) * 100).toFixed(2);
              return (
                <div key={index} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{platform.platform}</h4>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                      {platform.posts} posts
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Reach</p>
                      <p className="font-semibold text-slate-900">{(platform.reach / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Engagement</p>
                      <p className="font-semibold text-slate-900">{(platform.engagement / 1000).toFixed(1)}K</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Eng. Rate</p>
                      <p className="font-semibold text-green-600">{engagementRate}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Export Options</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <FileText className="text-red-600" size={20} />
              </div>
              <h4 className="font-semibold text-slate-900">PDF Report</h4>
            </div>
            <p className="text-sm text-slate-600">Laporan lengkap dengan grafik dan analisis</p>
          </button>

          <button className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FileText className="text-green-600" size={20} />
              </div>
              <h4 className="font-semibold text-slate-900">Excel Data</h4>
            </div>
            <p className="text-sm text-slate-600">Raw data dalam format spreadsheet</p>
          </button>

          <button className="p-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <FileText className="text-blue-600" size={20} />
              </div>
              <h4 className="font-semibold text-slate-900">Client Dashboard</h4>
            </div>
            <p className="text-sm text-slate-600">Interactive dashboard untuk klien</p>
          </button>
        </div>
      </div>
    </div>
  );
}
