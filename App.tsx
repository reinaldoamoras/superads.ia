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
import { CheckCircle2, AlertCircle, X, Info, ShieldAlert, Key, RefreshCcw } from 'lucide-react';
import { isApiKeyMissing } from './services/geminiService';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: 'bg-green-600 text-white border-green-500',
    error: 'bg-red-600 text-white border-red-500',
    info: 'bg-indigo-600 text-white border-indigo-500',
  };

  const icons = {
    success: <CheckCircle2 size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border animate-slide-in-right ${styles[type]}`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="opacity-70 hover:opacity-100 ml-2">
        <X size={14} />
      </button>
    </div>
  );
};

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
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
  };

  const handleAddCampaign = (campaign: GeneratedCampaign) => {
    setCampaigns(prev => [campaign, ...prev]);
    showNotification('Campanha criada!', 'success');
  };

  const handleTopUp = (platform: Platform, amount: number) => {
    setWallets(prev => prev.map(wallet => wallet.platform === platform ? { ...wallet, balance: wallet.balance + amount } : wallet));
    showNotification(`Recarga de R$ ${amount} concluída!`, 'success');
  };

  const handleToggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
        showNotification(`Campanha ${newStatus === 'ACTIVE' ? 'ativada' : 'pausada'}.`, 'info');
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const renderView = () => {
    const commonProps = { showNotification, onNavigate: setCurrentView };
    const keyIsMissing = isApiKeyMissing();

    if (currentView === AppView.LOGIN) {
      return <Login onLogin={() => setCurrentView(AppView.DASHBOARD)} />;
    }

    const viewContent = (() => {
      switch (currentView) {
        case AppView.DASHBOARD: return <Dashboard campaigns={campaigns} wallets={wallets} onToggleStatus={handleToggleCampaignStatus} onTopUp={handleTopUp} {...commonProps} />;
        case AppView.BRAIN_CENTER: return <BrainCenter {...commonProps} />;
        case AppView.LAUNCH_CENTER: return <LaunchCenter {...commonProps} />;
        case AppView.SALES_ACCELERATOR: return <SalesAccelerator {...commonProps} />;
        case AppView.SALES_FLOW: return <SalesFlowManager {...commonProps} />;
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
        case AppView.TERMS: return <TermsOfUse onBack={() => setCurrentView(AppView.SETTINGS)} />;
        default: return <Dashboard campaigns={campaigns} wallets={wallets} />;
      }
    })();

    return (
      <div className="flex flex-col h-full w-full">
        {keyIsMissing && (
          <div className="sticky top-0 z-[100] bg-red-600 text-white px-4 py-3 flex items-center justify-between shadow-2xl border-b border-red-500 animate-fade-in">
            <div className="flex items-center gap-4">
              <ShieldAlert size={24} className="animate-pulse" />
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-tighter">API KEY NÃO DETECTADA NO BUILD</span>
                <span className="text-xs font-medium opacity-90">Você adicionou na Vercel? Se sim, clique em <b>Redeploy</b> para injetar a chave no código.</span>
              </div>
            </div>
            <div className="flex gap-2">
              <a 
                href="https://vercel.com/dashboard" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md hover:bg-slate-100"
              >
                <RefreshCcw size={14} /> Fazer Redeploy na Vercel
              </a>
            </div>
          </div>
        )}
        <div className="flex-1">
          {viewContent}
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {notification && <Toast message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
      {renderView()}
    </Layout>
  );
}

export default App;