import React, { useState } from 'react';
import { Target, Plus, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { goals } from '../data/mockData';

export default function Goals() {
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgressTextColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600';
    if (progress >= 70) return 'text-blue-600';
    if (progress >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Goals</h1>
          <p className="text-gray-600">Track your progress and stay motivated</p>
        </div>
        <button
          onClick={() => setShowAddGoal(true)}
          className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Goals Grid */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const progressColor = getProgressColor(progress);
          const textColor = getProgressTextColor(progress);
          
          return (
            <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{daysLeft} days left</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{goal.category}</span>
                    </div>
                  </div>
                </div>
                
                {progress < 50 && daysLeft < 7 && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {goal.unit === '$' ? `$${goal.current.toLocaleString()}` : goal.current}
                  </span>
                  <span className="text-sm text-gray-600">
                    of {goal.unit === '$' ? `$${goal.target.toLocaleString()}` : goal.target} {goal.unit}
                  </span>
                </div>

                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className={`rounded-full h-3 transition-all duration-500 ${progressColor}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${textColor}`}>
                    {progress.toFixed(0)}% Complete
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${textColor}`} />
                    <span className={`text-sm font-medium ${textColor}`}>
                      {progress >= 100 ? 'Completed!' : progress >= 90 ? 'Almost there!' : 'Keep going!'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5 text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold">You're on fire! 🔥</h3>
            <p className="text-purple-100 text-sm">
              You've completed 78% of your monthly goals. Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}