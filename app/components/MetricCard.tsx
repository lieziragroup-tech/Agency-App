import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendColor?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, trendColor = 'text-green-600' }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-1">{title}</p>
          <h3 className="text-3xl font-semibold text-slate-900">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trendColor}`}>{trend}</p>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <Icon className="text-blue-600" size={24} />
        </div>
      </div>
    </div>
  );
}
