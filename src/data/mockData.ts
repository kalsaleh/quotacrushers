import { SalesRep, Goal, Activity, LeaderboardEntry, Deal } from '../types';
import { Challenge, Badge, DuelRequest } from '../types';

export const currentUser: SalesRep = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex.johnson@company.com',
  avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
  role: 'Senior Sales Rep',
  team: 'Enterprise Sales'
};

export const goals: Goal[] = [
  {
    id: '1',
    title: 'Monthly Calls',
    target: 100,
    current: 78,
    unit: 'calls',
    deadline: '2025-01-31',
    category: 'calls',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Quarterly Revenue',
    target: 250000,
    current: 187500,
    unit: '$',
    deadline: '2025-03-31',
    category: 'revenue',
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'New Meetings',
    target: 25,
    current: 19,
    unit: 'meetings',
    deadline: '2025-01-31',
    category: 'meetings',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    title: 'Deals Closed',
    target: 8,
    current: 5,
    unit: 'deals',
    deadline: '2025-01-31',
    category: 'deals',
    color: 'bg-orange-500'
  }
];

export const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Discovery Call - TechCorp',
    description: 'Initial discovery call to understand their requirements',
    timestamp: '2025-01-10T10:30:00Z',
    client: 'TechCorp Inc.',
    status: 'completed'
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Demo Presentation',
    description: 'Product demo for GlobalSoft decision makers',
    timestamp: '2025-01-10T14:00:00Z',
    client: 'GlobalSoft',
    status: 'completed'
  },
  {
    id: '3',
    type: 'deal',
    title: 'Closed Enterprise Deal',
    description: 'Successfully closed $50k enterprise contract',
    timestamp: '2025-01-09T16:45:00Z',
    value: 50000,
    client: 'Enterprise Solutions Ltd',
    status: 'completed'
  },
  {
    id: '4',
    type: 'email',
    title: 'Follow-up Email',
    description: 'Sent follow-up email with proposal details',
    timestamp: '2025-01-09T09:15:00Z',
    client: 'StartupX',
    status: 'completed'
  },
  {
    id: '5',
    type: 'meeting',
    title: 'Contract Review',
    description: 'Review contract terms with legal team',
    timestamp: '2025-01-11T11:00:00Z',
    client: 'MegaCorp',
    status: 'scheduled'
  }
];

export const leaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    score: 98,
    change: 5,
    badge: '🏆',
    achievements: ['Top Performer', 'Goal Crusher', 'Team Player']
  },
  {
    id: '2',
    name: 'Alex Johnson',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    score: 92,
    change: 2,
    badge: '🥈',
    achievements: ['Consistent Performer', 'Deal Closer']
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    score: 89,
    change: -1,
    badge: '🥉',
    achievements: ['Rising Star', 'Client Favorite']
  },
  {
    id: '4',
    name: 'Emma Davis',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    score: 87,
    change: 8,
    achievements: ['Most Improved', 'Team Collaborator']
  },
  {
    id: '5',
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    score: 84,
    change: -3,
    achievements: ['Veteran Player', 'Mentor']
  }
];

export const deals: Deal[] = [
  {
    id: '1',
    title: 'Enterprise Software License',
    client: 'TechCorp Inc.',
    value: 75000,
    stage: 'negotiation',
    probability: 80,
    expectedCloseDate: '2025-01-25',
    assignedTo: 'Alex Johnson'
  },
  {
    id: '2',
    title: 'Cloud Migration Services',
    client: 'GlobalSoft',
    value: 120000,
    stage: 'proposal',
    probability: 60,
    expectedCloseDate: '2025-02-15',
    assignedTo: 'Alex Johnson'
  },
  {
    id: '3',
    title: 'Security Audit Package',
    client: 'StartupX',
    value: 25000,
    stage: 'qualified',
    probability: 45,
    expectedCloseDate: '2025-02-28',
    assignedTo: 'Alex Johnson'
  },
  {
    id: '4',
    title: 'Integration Platform',
    client: 'MegaCorp',
    value: 200000,
    stage: 'prospect',
    probability: 25,
    expectedCloseDate: '2025-03-30',
    assignedTo: 'Alex Johnson'
  }
];

export const challenges: Challenge[] = [
  {
    id: '1',
    title: 'January Call Blitz',
    description: 'Make 150 calls this month to win the Call Champion badge',
    type: 'individual',
    category: 'calls',
    target: 150,
    unit: 'calls',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    participants: ['1', '2', '3', '4', '5'],
    createdBy: 'admin',
    status: 'active',
    prize: '$500 bonus',
    badge: 'call-champion',
    progress: {
      '1': 78,
      '2': 92,
      '3': 65,
      '4': 88,
      '5': 71
    }
  },
  {
    id: '2',
    title: 'Team Revenue Sprint',
    description: 'Team challenge to reach $1M in revenue this quarter',
    type: 'team',
    category: 'revenue',
    target: 1000000,
    unit: '$',
    startDate: '2025-01-01',
    endDate: '2025-03-31',
    participants: ['1', '2', '3', '4', '5'],
    createdBy: 'admin',
    status: 'active',
    prize: 'Team dinner at 5-star restaurant',
    badge: 'revenue-crusher',
    progress: {
      '1': 187500,
      '2': 225000,
      '3': 156000,
      '4': 198000,
      '5': 167000
    }
  }
];

export const badges: Badge[] = [
  {
    id: 'call-champion',
    name: 'Call Champion',
    description: 'Made 150+ calls in a month',
    icon: '📞',
    color: 'bg-blue-500',
    criteria: {
      type: 'milestone',
      value: 150,
      metric: 'calls'
    },
    rarity: 'rare'
  },
  {
    id: 'deal-closer',
    name: 'Deal Closer',
    description: 'Closed 10 deals in a month',
    icon: '🤝',
    color: 'bg-green-500',
    criteria: {
      type: 'milestone',
      value: 10,
      metric: 'deals'
    },
    rarity: 'epic'
  },
  {
    id: 'revenue-crusher',
    name: 'Revenue Crusher',
    description: 'Generated $1M+ in revenue',
    icon: '💰',
    color: 'bg-yellow-500',
    criteria: {
      type: 'milestone',
      value: 1000000,
      metric: 'revenue'
    },
    rarity: 'legendary'
  },
  {
    id: 'streak-master',
    name: 'Streak Master',
    description: 'Maintained a 30-day activity streak',
    icon: '🔥',
    color: 'bg-orange-500',
    criteria: {
      type: 'streak',
      value: 30,
      metric: 'days'
    },
    rarity: 'rare'
  }
];

export const duelRequests: DuelRequest[] = [
  {
    id: '1',
    challenger: '2',
    challenged: '1',
    title: 'Weekly Call Challenge',
    metric: 'calls',
    target: 50,
    duration: 7,
    status: 'pending',
    createdAt: '2025-01-10T09:00:00Z',
    prize: 'Lunch on the loser'
  },
  {
    id: '2',
    challenger: '3',
    challenged: '1',
    title: 'Deal Closing Duel',
    metric: 'deals',
    target: 3,
    duration: 14,
    status: 'active',
    createdAt: '2025-01-05T14:30:00Z',
    prize: '$100 gift card'
  }
];