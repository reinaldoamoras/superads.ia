// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { CreateCampaign } from './components/CreateCampaign';
import { Integrations } from './components/Integrations';
import { Optimization } from './components/Optimization';
import { Login } from './components/Login';
import { SocialContent } from './components/SocialContent';
import { Settings } from './components/Settings';
import { MarketIntelligence } from './components/MarketIntelligence';
import { CrmAutomation } from './components/CrmAutomation';
import { LandingPageBuilder } from './components/LandingPageBuilder';
import { Academy } from './components/Academy';
import { Blog } from './components/Blog';
import { Affiliates } from './components/Affiliates';
import { TermsOfUse } from './components/TermsOfUse';
import { SalesAccelerator } from './components/SalesAccelerator';
import { SalesFlowManager } from './components/SalesFlowManager';
import { BrainCenter } from './components/BrainCenter';
import { LaunchCenter } from './components/LaunchCenter';
import { AppView, GeneratedCampaign, Platform, CampaignObjective, PlatformWallet } from './types';
import { CheckCircle2, AlertCircle, X, Info, ShieldAlert, RefreshCcw } from 'lucide-react';
import { isApiKeyMissing } from './services/geminiService';

const APP_VERSION = "18.5.2-Stable";

const INITIAL_CAMPAIGNS: GeneratedCampaign[] = [
  {
    id: 'cmp_123',
    productName: 'Promoção Verão 2024',
    objective: CampaignObjective.SALES,
    status: 'ACTIVE',
    createdAt: new Date().toLocaleDateString(),
    platforms: [Platform.META, Platform.TIKTOK],
    budget: 1200,
    fee: 60,
    totalCost: 1260,
    spent: 450.50,
    clicks: 342,
    audience: { ageRange: '25-34', gender: 'Todos', interests: ['Moda', 'Praia'], behaviors: [], location: 'Brasil' },
    creatives: []
  }
];

const INITIAL_WALLETS: PlatformWallet[] = [
  { platform: Platform.META, balance: 749.50, dailySpend: 45.00 },
  { platform: Platform.GOOGLE, balance: 120.00, dailySpend: 30.00 },
  { platform: Platform.TIKTOK, balance: 500.00, dailySpend: 25.00 },
  { platform: Platform.LINKEDIN, balance: 0.00, dailySpend: 0.00 },
];

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LOGIN);
  const [campaigns, setCampaigns] = useState<GeneratedCampaign[]>(INITIAL_CAMPAIGNS);
  const [wallets, setWallets] = useState<PlatformWallet[]>(INITIAL_WALLETS);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log(`[SuperAds IA] Sistema Iniciado - Versão: ${APP_VERSION}`);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCampaign = (campaign) => {
    setCampaigns(prev => [campaign, ...prev]);
    showNotification('Campanha criada!', 'success');
  };

  const handleTopUp = (platform, amount) => {
    setWallets(prev => prev.map(w => w.platform === platform ? { ...w, balance: w.balance + amount } : w));
    showNotification(`Recarga de R$ ${amount} concluída!`, 'success');
  };

  const renderView = () => {
    const commonProps = { showNotification, onNavigate: setCurrentView };
    
    let keyMissing = false;
    try {
        keyMissing = isApiKeyMissing();
    } catch(e) {
        keyMissing = true;
    }

    if (currentView === AppView.LOGIN) {
      return <Login onLogin={() => setCurrentView(AppView.DASHBOARD)} />;
    }

    const viewContent = (() => {
      switch (currentView) {
        case AppView.DASHBOARD: return <Dashboard campaigns={campaigns} wallets={wallets} onTopUp={handleTopUp} {...commonProps} />;
        case AppView.CREATE_CAMPAIGN: return <CreateCampaign campaignCount={campaigns.length} onAddCampaign={handleAddCampaign} onFinish={() => setCurrentView(AppView.DASHBOARD)} {...commonProps} />;
        case AppView.INTEGRATIONS: return <Integrations {...commonProps} />;
        case AppView.OPTIMIZATION: return <Optimization {...commonProps} />;
        case AppView.SOCIAL_CONTENT: return <SocialContent {...commonProps} />;
        case AppView.SETTINGS: return <Settings onLogout={() => setCurrentView(AppView.LOGIN)} {...commonProps} />;
        case AppView.MARKET_INTELLIGENCE: return <MarketIntelligence {...commonProps} />;
        case AppView.CRM: return <CrmAutomation {...commonProps} />;
        case AppView.LANDING_PAGE: return <LandingPageBuilder {...commonProps} />;
        case AppView.ACADEMY: return <Academy {...commonProps} />;
        case AppView.BLOG: return <Blog {...commonProps} />;
        case AppView.AFFILIATES: return <Affiliates {...commonProps} />;
        case AppView.SALES_ACCELERATOR: return <SalesAccelerator {...commonProps} />;
        case AppView.SALES_FLOW: return <SalesFlowManager {...commonProps} />;
        case AppView.BRAIN_CENTER: return <BrainCenter {...commonProps} />;
        case AppView.LAUNCH_CENTER: return <LaunchCenter {...commonProps} />;
        case AppView.TERMS: return <TermsOfUse onBack={() => setCurrentView(AppView.SETTINGS)} />;
        default: return <Dashboard campaigns={campaigns} wallets={wallets} {...commonProps} />;
      }
    })();

    return (
      <div className="flex flex-col h-full w-full overflow-hidden">
        {keyMissing && (
          <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-2xl z-[100]">
            <div className="flex items-center gap-3">
              <ShieldAlert size={20} className="animate-pulse" />
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase">API_KEY Pendente</span>
                <span className="text-[10px] opacity-90">Verifique sua chave Gemini nas configurações.</span>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 relative overflow-y-auto">
          {viewContent}
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {notification && (
        <div className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border animate-slide-in-right ${notification.type === 'success' ? 'bg-green-600 border-green-400' : 'bg-red-600 border-red-400'} text-white`}>
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}
      {renderView()}
    </Layout>
  );
}

export default App;
