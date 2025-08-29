export interface SalesRep {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  team: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'calls' | 'meetings' | 'deals' | 'revenue';
  color: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'email' | 'deal';
  title: string;
  description: string;
  timestamp: string;
  value?: number;
  client?: string;
  status: 'completed' | 'pending' | 'scheduled';
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  change: number;
  badge?: string;
  achievements: string[];
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  expectedCloseDate: string;
  assignedTo: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'team' | 'duel';
  category: 'calls' | 'meetings' | 'deals' | 'revenue' | 'custom';
  target: number;
  unit: string;
  startDate: string;
  endDate: string;
  participants: string[];
  createdBy: string;
  status: 'active' | 'completed' | 'upcoming';
  prize?: string;
  badge?: string;
  progress: { [userId: string]: number };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  criteria: {
    type: 'achievement' | 'streak' | 'milestone';
    value: number;
    metric: string;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface GoogleSheetsConfig {
  sheetId: string;
  sheetName: string;
  columns: {
    userId: string;
    metric: string;
    value: string;
    date: string;
  };
  lastSync: string;
}

export interface DuelRequest {
  id: string;
  challenger: string;
  challenged: string;
  title: string;
  metric: string;
  target: number;
  duration: number; // days
  status: 'pending' | 'accepted' | 'declined' | 'active' | 'completed';
  createdAt: string;
  prize?: string;
}