import React from 'react';
import { BarChart3, Target, Users, Activity, Plus, Trophy, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin?: boolean;
}

export default function Navigation({ activeTab, onTabChange, isAdmin = false }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'activity', label: 'Activity', icon: Plus },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'leaderboard', label: 'Team', icon: Users },
    { id: 'pipeline', label: 'Pipeline', icon: Activity },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : [])
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                activeTab === id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}