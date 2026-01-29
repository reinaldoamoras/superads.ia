
export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  INTEGRATIONS = 'INTEGRATIONS',
  OPTIMIZATION = 'OPTIMIZATION',
  SOCIAL_CONTENT = 'SOCIAL_CONTENT',
  SETTINGS = 'SETTINGS',
  MARKET_INTELLIGENCE = 'MARKET_INTELLIGENCE',
  CRM = 'CRM',
  LANDING_PAGE = 'LANDING_PAGE',
  ACADEMY = 'ACADEMY',
  BLOG = 'BLOG',
  AFFILIATES = 'AFFILIATES',
  TERMS = 'TERMS',
  SALES_ACCELERATOR = 'SALES_ACCELERATOR',
  SALES_FLOW = 'SALES_FLOW',
  BRAIN_CENTER = 'BRAIN_CENTER',
  LAUNCH_CENTER = 'LAUNCH_CENTER'
}

export interface FlowStep {
  id: string;
  type: 'HOOK' | 'QUALIFY' | 'OFFER' | 'CLOSING' | 'REFERRAL';
  title: string;
  description: string;
  aiScript: string;
  connections: string[];
}

export interface IntegrationKey {
  provider: 'BOTCONVERSA' | 'TYPEBOT' | 'ZAPI' | 'WEBHOOK';
  key: string;
  status: 'CONNECTED' | 'DISCONNECTED';
}

export enum Platform { META = 'Meta Ads', GOOGLE = 'Google Ads', TIKTOK = 'TikTok Ads', LINKEDIN = 'LinkedIn Ads', YOUTUBE = 'YouTube Channel' }
export interface PlatformWallet { platform: Platform; balance: number; dailySpend: number; }
export interface CreatorRevenue { platform: Platform; grossRevenue: number; appFee: number; netRevenue: number; status: 'PENDING' | 'PAID'; }
export enum CampaignObjective { SALES = 'Vendas', LEADS = 'Captação de Leads', TRAFFIC = 'Tráfego/Visitas', ENGAGEMENT = 'Engajamento', BRANDING = 'Reconhecimento de Marca' }
export type CampaignStatus = 'LEARNING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'ERROR';
export interface AdCreative { headline: string; body: string; callToAction: string; visualDescription: string; format: 'IMAGE' | 'VIDEO' | 'CAROUSEL'; }
export interface AudienceProfile { ageRange: string; gender: string; interests: string[]; behaviors: string[]; location: string; }
export interface GeneratedCampaign { id: string; status: CampaignStatus; createdAt: string; productName: string; objective: string; audience: AudienceProfile; creatives: AdCreative[]; platforms: Platform[]; budget: number; fee: number; totalCost: number; spent?: number; clicks?: number; }
export interface Lead { id: string; name: string; phone: string; email: string; status: 'NEW' | 'CONTACTED' | 'CONVERTED' | 'BLOCKED'; lastMessageTime: string; score: number; quality: 'HIGH' | 'MEDIUM' | 'LOW' | 'SPAM'; matchReason: string; platformOrigin: Platform; }
export interface RecoveryScript { leadName: string; script: string; strategy: string; }
export interface ReferralGoal { target: number; current: number; reward: string; }
export interface SocialPost { id: number; platform: string; date: string; content: string; }
export interface PostAnalysis { postId: number; reason: string; suggestion: 'EXCLUIR' | 'MANTER'; }
export interface OrganicContentIdea { title: string; caption: string; hashtags: string[]; format: 'FEED' | 'STORY' | 'REELS'; imagePrompt: string; }
export interface CompetitorAnalysis { suggestedAngle: string; weaknesses: string[]; opportunities: string[]; }
export interface VoiceCommandResponse { action: 'NAVIGATE' | 'CREATE_CAMPAIGN' | 'UNKNOWN'; reply: string; targetView?: AppView; }
export interface BlogPost { title: string; category: 'TENDÊNCIA' | 'SUCESSO' | 'INSIGHT'; date: string; readTime: string; summary: string; content: string; }
export interface YouTubeMetadata { title: string; description: string; tags: string[]; }
export interface YouTubeTrendAnalysis { topChannels: string[]; viralHooks: string[]; trendingTopics: string[]; editingStyle: string; opportunityGap: string; }
export interface AcademyLesson { id: number; title: string; duration: string; category: 'INICIANTE' | 'VENDAS' | 'CRIATIVO'; thumbnail: string; }
export interface AffiliateTransaction { id: string; type: 'COMMISSION' | 'WITHDRAWAL'; amount: number; date: string; description: string; status: 'COMPLETED' | 'PENDING'; }
