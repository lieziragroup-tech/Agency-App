import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Campaign } from './CampaignDetail';

interface TimelineTabProps {
  campaign: Campaign;
}

const timelinePhases = [
  {
    id: 1,
    name: 'Planning & Briefing',
    startDate: '2026-02-10',
    endDate: '2026-02-14',
    status: 'completed' as const,
    tasks: [
      { name: 'Client briefing meeting', completed: true },
      { name: 'KOL selection & outreach', completed: true },
      { name: 'Content strategy planning', completed: true },
    ],
  },
  {
    id: 2,
    name: 'Content Creation',
    startDate: '2026-02-15',
    endDate: '2026-02-22',
    status: 'completed' as const,
    tasks: [
      { name: 'Product photoshoot', completed: true },
      { name: 'Content review & approval', completed: true },
      { name: 'Final content preparation', completed: true },
    ],
  },
  {
    id: 3,
    name: 'Campaign Execution',
    startDate: '2026-02-23',
    endDate: '2026-02-28',
    status: 'in-progress' as const,
    tasks: [
      { name: 'First wave posting (3 KOLs)', completed: true },
      { name: 'Second wave posting (5 KOLs)', completed: false },
      { name: 'Monitor engagement & respond', completed: false },
    ],
  },
  {
    id: 4,
    name: 'Performance Monitoring',
    startDate: '2026-03-01',
    endDate: '2026-03-03',
    status: 'pending' as const,
    tasks: [
      { name: 'Collect performance data', completed: false },
      { name: 'Analyze engagement metrics', completed: false },
      { name: 'Create performance dashboard', completed: false },
    ],
  },
  {
    id: 5,
    name: 'Reporting & Closure',
    startDate: '2026-03-04',
    endDate: '2026-03-05',
    status: 'pending' as const,
    tasks: [
      { name: 'Generate final report', completed: false },
      { name: 'Client presentation', completed: false },
      { name: 'Campaign closure meeting', completed: false },
    ],
  },
];

export function TimelineTab({ campaign }: TimelineTabProps) {
  // FIX: Semua angka progress dihitung dinamis dari data, bukan hardcoded
  const completedPhases  = timelinePhases.filter(p => p.status === 'completed').length;
  const inProgressPhases = timelinePhases.filter(p => p.status === 'in-progress').length;
  const totalPhases      = timelinePhases.length;

  const totalTasks     = timelinePhases.flatMap(p => p.tasks).length;
  const completedTasks = timelinePhases.flatMap(p => p.tasks).filter(t => t.completed).length;
  const overallProgress = Math.round((completedTasks / totalTasks) * 100);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':  return <CheckCircle2 className="text-green-600" size={24} />;
      case 'in-progress': return <Clock className="text-blue-600" size={24} />;
      default:           return <Circle className="text-slate-300" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':  return 'border-green-600 bg-green-50';
      case 'in-progress': return 'border-blue-600 bg-blue-50';
      default:           return 'border-slate-300 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Timeline & Progress Kampanye</h3>
        <p className="text-sm text-slate-600 mt-1">
          {campaign.name} — {new Date(campaign.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })} s/d {new Date(campaign.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Timeline Visualization */}
      <div className="space-y-4">
        {timelinePhases.map((phase, index) => (
          <div key={phase.id} className="relative">
            {index < timelinePhases.length - 1 && (
              <div className="absolute left-[11px] top-[48px] w-0.5 h-full bg-slate-200" />
            )}
            <div className={`rounded-lg border-2 ${getStatusColor(phase.status)} p-6`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 relative z-10 bg-white rounded-full">
                  {getStatusIcon(phase.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-900">{phase.name}</h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {new Date(phase.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} -{' '}
                        {new Date(phase.endDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      phase.status === 'completed'  ? 'bg-green-100 text-green-700' :
                      phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                                       'bg-slate-100 text-slate-600'
                    }`}>
                      {phase.status === 'completed' ? 'Selesai' : phase.status === 'in-progress' ? 'Sedang Berjalan' : 'Belum Dimulai'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-3 text-sm">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          task.completed ? 'bg-green-600 border-green-600' : 'border-slate-300'
                        }`}>
                          {task.completed && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={task.completed ? 'text-slate-600 line-through' : 'text-slate-900'}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FIX: Progress Summary dihitung dinamis dari data array */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <h4 className="font-semibold text-slate-900 mb-4">Progress Summary</h4>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-slate-600">Phase Selesai</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">{completedPhases} / {totalPhases}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Sedang Berjalan</p>
            <p className="text-2xl font-semibold text-blue-600 mt-1">{inProgressPhases} / {totalPhases}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Task Selesai</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{completedTasks} / {totalTasks}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Overall Progress</p>
            <p className="text-2xl font-semibold text-slate-900 mt-1">{overallProgress}%</p>
            <div className="mt-2 bg-slate-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
