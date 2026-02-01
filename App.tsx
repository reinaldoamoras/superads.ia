
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
import { CheckCircle2, AlertCircle, X, ShieldAlert, Sparkles, Cpu, Globe } from 'lucide-react';
import { isApiKeyMissing } from './services/geminiService';

const APP_VERSION = "v22.0.0-ENTERPRISE";

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
  const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
  const [wallets, setWallets] = useState(INITIAL_WALLETS);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    console.log(`%c [SYSTEM READY] SUPERADS IA ${APP_VERSION} `, 'background: #6366f1; color: white; font-weight: bold; font-size: 20px; padding: 10px; border-radius: 8px;');
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
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
        {/* BANNER DE STATUS v22 */}
        <div className="bg-slate-900 text-white px-6 py-2.5 flex items-center justify-between shadow-2xl z-[9999] border-b border-indigo-500/30">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{APP_VERSION}</span>
            </div>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
                <Globe size={14} className="text-emerald-400" />
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Rede Global Ativa</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[9px] font-black uppercase opacity-60">Status: Operacional</span>
          </div>
        </div>

        {keyMissing && (
          <div className="bg-red-600 text-white px-4 py-1.5 flex items-center justify-center gap-3 shadow-inner">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Configuração de API Necessária para Funções de IA</span>
          </div>
        )}

        <div className="flex-1 relative overflow-y-auto custom-scrollbar bg-slate-950">
          {viewContent}
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {notification && (
        <div className={`fixed top-14 right-8 z-[200] flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border-2 animate-slide-in-right ${notification.type === 'success' ? 'bg-emerald-600 border-emerald-400' : 'bg-red-600 border-red-400'} text-white`}>
            {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <span className="text-base font-bold tracking-tight">{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-2 opacity-50 hover:opacity-100"><X size={16}/></button>
        </div>
      )}
      {renderView()}
    </Layout>
  );
}

export default App;
