import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface PerformanceInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  kol: {
    id: number;
    name: string;
    platform: string;
    performance?: {
      reach: number;
      impressions: number;
      engagement: number;
      clicks?: number;
    };
  };
  onSave: (data: any) => void;
}

export function PerformanceInputModal({ isOpen, onClose, kol, onSave }: PerformanceInputModalProps) {
  const [formData, setFormData] = useState({
    reach: kol.performance?.reach || '',
    impressions: kol.performance?.impressions || '',
    engagement: kol.performance?.engagement || '',
    clicks: kol.performance?.clicks || '',
    postLink: '',
    comments: kol.performance ? Math.floor((kol.performance.engagement || 0) * 0.3) : '',
    likes: kol.performance ? Math.floor((kol.performance.engagement || 0) * 0.7) : '',
    shares: kol.performance ? Math.floor((kol.performance.engagement || 0) * 0.1) : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      kolId: kol.id,
      ...formData,
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50">
          <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div>
              <Dialog.Title className="text-xl font-semibold text-slate-900">
                Input Performance Data
              </Dialog.Title>
              <p className="text-sm text-slate-600 mt-1">
                {kol.name} • {kol.platform}
              </p>
            </div>
            <Dialog.Close className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <X size={20} className="text-slate-600" />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {/* Primary Metrics */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Primary Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Reach
                    </label>
                    <input
                      type="number"
                      value={formData.reach}
                      onChange={(e) => handleChange('reach', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 380000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Impressions
                    </label>
                    <input
                      type="number"
                      value={formData.impressions}
                      onChange={(e) => handleChange('impressions', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 520000"
                    />
                  </div>
                </div>
              </div>

              {/* Engagement Breakdown */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Engagement Breakdown</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Likes
                    </label>
                    <input
                      type="number"
                      value={formData.likes}
                      onChange={(e) => handleChange('likes', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 17150"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Comments
                    </label>
                    <input
                      type="number"
                      value={formData.comments}
                      onChange={(e) => handleChange('comments', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 7350"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Shares
                    </label>
                    <input
                      type="number"
                      value={formData.shares}
                      onChange={(e) => handleChange('shares', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 2450"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Total Engagement
                    </label>
                    <input
                      type="number"
                      value={formData.engagement}
                      onChange={(e) => handleChange('engagement', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 24500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-4">Additional Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Link Clicks (optional)
                    </label>
                    <input
                      type="number"
                      value={formData.clicks}
                      onChange={(e) => handleChange('clicks', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Post Link
                    </label>
                    <input
                      type="url"
                      value={formData.postLink}
                      onChange={(e) => handleChange('postLink', e.target.value)}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://instagram.com/p/example"
                    />
                  </div>
                </div>
              </div>

              {/* Calculated Metrics Display */}
              {formData.reach && formData.engagement && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Calculated Engagement Rate</h4>
                  <p className="text-3xl font-semibold text-blue-600">
                    {((Number(formData.engagement) / Number(formData.reach)) * 100).toFixed(2)}%
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Simpan Data
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
