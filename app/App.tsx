import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CampaignList } from './components/CampaignList';
import { CampaignDetail } from './components/CampaignDetail';
import { KOLDatabase } from './components/KOLDatabase';
import { Reports } from './components/Reports';

// FIX: 'campaigns' sekarang punya view tersendiri, bukan alias Dashboard
type View = 'dashboard' | 'campaigns' | 'kol-database' | 'reports' | 'finance' | 'settings' | 'campaign-detail';

export default function App() {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  const handleNavigate = (view: string) => {
    setActiveView(view as View);
    if (view !== 'campaign-detail') {
      setSelectedCampaignId(null);
    }
  };

  const handleNavigateToCampaign = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setActiveView('campaign-detail');
  };

  const handleBackFromCampaign = () => {
    // Kembali ke view sebelumnya (bisa dari dashboard atau campaign list)
    setActiveView('campaigns');
    setSelectedCampaignId(null);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onNavigateToCampaign={handleNavigateToCampaign} />;

      // FIX: 'campaigns' sekarang render CampaignList, bukan Dashboard
      case 'campaigns':
        return <CampaignList onNavigateToCampaign={handleNavigateToCampaign} />;

      case 'campaign-detail':
        return selectedCampaignId ? (
          <CampaignDetail
            campaignId={selectedCampaignId}
            onBack={handleBackFromCampaign}
          />
        ) : (
          <CampaignList onNavigateToCampaign={handleNavigateToCampaign} />
        );

      case 'kol-database':
        return <KOLDatabase />;

      case 'reports':
        return <Reports />;

      case 'finance':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Finance & Admin</h2>
              <p className="text-slate-600 mt-2">Coming soon...</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Settings</h2>
              <p className="text-slate-600 mt-2">Coming soon...</p>
            </div>
          </div>
        );

      default:
        return <Dashboard onNavigateToCampaign={handleNavigateToCampaign} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar activeView={activeView} onNavigate={handleNavigate} />
      <div className="ml-64 p-8">
        {renderContent()}
      </div>
    </div>
  );
}
