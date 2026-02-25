import { useState } from 'react';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import { Campaign } from './CampaignDetail';

interface BudgetTabProps {
  campaign: Campaign;
}

// FIX: Budget breakdown dihitung dari campaign.budget agar selalu konsisten
function getBudgetBreakdown(budget: number, spent: number) {
  // Proporsi alokasi yang realistis per kategori
  const allocations = [
    { category: 'KOL Fees',          allocPct: 0.57 },
    { category: 'Content Production', allocPct: 0.23 },
    { category: 'Ads Boost',          allocPct: 0.14 },
    { category: 'Tools & Platform',   allocPct: 0.06 },
  ];

  // Spent dibagi proporsional mengikuti alokasi
  return allocations.map(({ category, allocPct }) => {
    const allocated = Math.round(budget * allocPct);
    const categorySpent = Math.round(spent * allocPct);
    return { category, allocated, spent: categorySpent };
  });
}

// Invoice data per campaign — nanti diganti Firestore query
const invoicesByCampaign: Record<number, Invoice[]> = {
  1: [
    { id: 1, vendor: 'Jessica Beauty',    type: 'KOL Fee',            amount: 25000000, status: 'Paid',    dueDate: '2026-02-20', paidDate: '2026-02-18' },
    { id: 2, vendor: 'Sarah Glow Up',     type: 'KOL Fee',            amount: 35000000, status: 'Paid',    dueDate: '2026-02-20', paidDate: '2026-02-19' },
    { id: 3, vendor: 'Creative Studio',   type: 'Content Production', amount: 45000000, status: 'Pending', dueDate: '2026-02-28' },
    { id: 4, vendor: 'Beauty by Linda',   type: 'KOL Fee',            amount: 20000000, status: 'Pending', dueDate: '2026-03-01' },
    { id: 5, vendor: 'Meta Ads Platform', type: 'Ads Boost',          amount: 30000000, status: 'Paid',    dueDate: '2026-02-25', paidDate: '2026-02-24' },
  ],
  2: [
    { id: 1, vendor: 'Tech Guru Indo',  type: 'KOL Fee',   amount: 28000000, status: 'Pending', dueDate: '2026-03-10' },
    { id: 2, vendor: 'Gaming Master',   type: 'KOL Fee',   amount: 32000000, status: 'Pending', dueDate: '2026-03-10' },
  ],
  3: [
    { id: 1, vendor: 'Foodie Adventures', type: 'KOL Fee',   amount: 30000000, status: 'Paid',    dueDate: '2026-02-18', paidDate: '2026-02-17' },
    { id: 2, vendor: 'Dapur Nusantara',   type: 'KOL Fee',   amount: 38000000, status: 'Paid',    dueDate: '2026-02-19', paidDate: '2026-02-19' },
    { id: 3, vendor: 'Studio Kreasi',     type: 'Content Production', amount: 25000000, status: 'Pending', dueDate: '2026-02-27' },
  ],
  4: [
    { id: 1, vendor: 'ShopSmart ID',    type: 'KOL Fee',   amount: 45000000, status: 'Paid',    dueDate: '2026-02-10', paidDate: '2026-02-09' },
    { id: 2, vendor: 'Deal Hunter',     type: 'KOL Fee',   amount: 60000000, status: 'Paid',    dueDate: '2026-02-12', paidDate: '2026-02-12' },
    { id: 3, vendor: 'Google Ads',      type: 'Ads Boost', amount: 80000000, status: 'Paid',    dueDate: '2026-02-20', paidDate: '2026-02-20' },
    { id: 4, vendor: 'Digital Studio',  type: 'Content Production', amount: 55000000, status: 'Pending', dueDate: '2026-02-28' },
  ],
  5: [
    { id: 1, vendor: 'Fashion Week ID', type: 'KOL Fee',   amount: 50000000, status: 'Paid', dueDate: '2026-02-10', paidDate: '2026-02-09' },
    { id: 2, vendor: 'Style by Rani',   type: 'KOL Fee',   amount: 42000000, status: 'Paid', dueDate: '2026-02-12', paidDate: '2026-02-11' },
    { id: 3, vendor: 'Fashion Studio',  type: 'Content Production', amount: 65000000, status: 'Paid', dueDate: '2026-02-15', paidDate: '2026-02-15' },
  ],
};

interface Invoice {
  id: number;
  vendor: string;
  type: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  paidDate?: string;
}

export function BudgetTab({ campaign }: BudgetTabProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(
    invoicesByCampaign[campaign.id] ?? []
  );

  const remainingBudget = campaign.budget - campaign.spent;
  const budgetUtilization = (campaign.spent / campaign.budget) * 100;
  // FIX: breakdown dihitung dinamis dari campaign.budget & campaign.spent
  const budgetBreakdown = getBudgetBreakdown(campaign.budget, campaign.spent);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':    return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      default:        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const paidTotal    = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.amount, 0);
  const pendingTotal = invoices.filter(i => i.status === 'Pending').reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Budget Management & Invoice Tracking</h3>
        <p className="text-sm text-slate-600 mt-1">Monitor pengeluaran dan kelola invoice kampanye</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <DollarSign className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-blue-700">Total Budget</p>
              <p className="text-2xl font-semibold text-blue-900">IDR {(campaign.budget / 1000000).toFixed(0)}M</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border border-orange-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-orange-700">Budget Terpakai</p>
              <p className="text-2xl font-semibold text-orange-900">IDR {(campaign.spent / 1000000).toFixed(0)}M</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-orange-700 mb-1">{budgetUtilization.toFixed(1)}% utilized</p>
            <div className="bg-orange-200 rounded-full h-2">
              <div className="bg-orange-600 h-2 rounded-full transition-all" style={{ width: `${Math.min(budgetUtilization, 100)}%` }} />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="text-white" size={24} />
            </div>
            <div>
              <p className="text-sm text-green-700">Sisa Budget</p>
              <p className={`text-2xl font-semibold ${remainingBudget < 0 ? 'text-red-600' : 'text-green-900'}`}>
                IDR {(Math.abs(remainingBudget) / 1000000).toFixed(0)}M
                {remainingBudget < 0 && <span className="text-sm ml-1">(over!)</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h4 className="font-semibold text-slate-900 mb-4">Budget Breakdown by Category</h4>
        <div className="space-y-4">
          {budgetBreakdown.map((item, index) => {
            const utilization = item.allocated > 0 ? (item.spent / item.allocated) * 100 : 0;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">{item.category}</p>
                    <p className="text-sm text-slate-600">
                      IDR {(item.spent / 1000000).toFixed(0)}M / {(item.allocated / 1000000).toFixed(0)}M
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{utilization.toFixed(1)}%</span>
                </div>
                <div className="bg-slate-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${
                      utilization > 90 ? 'bg-red-500' : utilization > 70 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Invoice Tracking */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-slate-900">Invoice & Payment Status</h4>
            <p className="text-sm text-slate-600 mt-1">Track semua invoice dan pembayaran</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus size={16} />
            Tambah Invoice
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Paid Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Belum ada invoice.</td>
                </tr>
              ) : (
                invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{invoice.vendor}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{invoice.type}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">IDR {(invoice.amount / 1000000).toFixed(0)}M</td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(invoice.dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-medium text-xs ${getStatusColor(invoice.status)}`}>
                        {invoice.status === 'Paid'    && <CheckCircle size={14} />}
                        {invoice.status === 'Pending' && <AlertCircle size={14} />}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {invoice.paidDate
                        ? new Date(invoice.paidDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                        : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-700">Paid Invoices</p>
          <p className="text-2xl font-semibold text-green-900 mt-1">{invoices.filter(i => i.status === 'Paid').length}</p>
          <p className="text-xs text-green-600 mt-1">IDR {(paidTotal / 1000000).toFixed(0)}M</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-orange-700">Pending Invoices</p>
          <p className="text-2xl font-semibold text-orange-900 mt-1">{invoices.filter(i => i.status === 'Pending').length}</p>
          <p className="text-xs text-orange-600 mt-1">IDR {(pendingTotal / 1000000).toFixed(0)}M</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-700">Total Invoices</p>
          <p className="text-2xl font-semibold text-blue-900 mt-1">{invoices.length}</p>
          <p className="text-xs text-blue-600 mt-1">IDR {((paidTotal + pendingTotal) / 1000000).toFixed(0)}M</p>
        </div>
      </div>
    </div>
  );
}
