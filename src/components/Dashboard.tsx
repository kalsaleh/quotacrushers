import React from 'react';
import { TrendingUp, Target, Phone, Calendar, DollarSign, Award } from 'lucide-react';
import { goals, recentActivities } from '../data/mockData';

export default function Dashboard() {
  const totalRevenue = 187500;
  const monthlyTarget = 250000;
  const completedActivities = recentActivities.filter(a => a.status === 'completed').length;
  const revenueProgress = (totalRevenue / monthlyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">This Month</p>
              <p className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-200" />
          </div>
          <div className="mt-3">
            <div className="bg-blue-400/30 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: `${revenueProgress}%` }}
              />
            </div>
            <p className="text-blue-100 text-xs mt-1">{revenueProgress.toFixed(0)}% of target</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Activities</p>
              <p className="text-2xl font-bold">{completedActivities}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
          <div className="mt-3">
            <p className="text-green-100 text-xs">+12% from last week</p>
          </div>
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Goal Progress</h2>
          <Target className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {goals.slice(0, 3).map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const isOnTrack = progress >= 70;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{goal.title}</h3>
                  <span className={`text-sm font-medium ${isOnTrack ? 'text-green-600' : 'text-orange-600'}`}>
                    {goal.current}/{goal.target} {goal.unit}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${
                      isOnTrack ? 'bg-green-500' : 'bg-orange-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  {progress.toFixed(0)}% complete • {isOnTrack ? 'On track' : 'Needs attention'}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <Award className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          {recentActivities.slice(0, 4).map((activity) => {
            const icons = {
              call: Phone,
              meeting: Calendar,
              email: TrendingUp,
              deal: DollarSign
            };
            const Icon = icons[activity.type];
            
            const colors = {
              call: 'bg-blue-100 text-blue-600',
              meeting: 'bg-purple-100 text-purple-600',
              email: 'bg-orange-100 text-orange-600',
              deal: 'bg-green-100 text-green-600'
            };
            
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${colors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
                  <p className="text-gray-600 text-xs">{activity.client}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(activity.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                {activity.value && (
                  <span className="text-green-600 font-semibold text-sm">
                    +${activity.value.toLocaleString()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}