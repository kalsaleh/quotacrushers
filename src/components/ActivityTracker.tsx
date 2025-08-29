import React, { useState } from 'react';
import { Plus, Phone, Calendar, Mail, Handshake, Clock, CheckCircle } from 'lucide-react';

export default function ActivityTracker() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [selectedType, setSelectedType] = useState<'call' | 'meeting' | 'email' | 'deal'>('call');

  const activityTypes = [
    { type: 'call' as const, label: 'Phone Call', icon: Phone, color: 'bg-blue-500' },
    { type: 'meeting' as const, label: 'Meeting', icon: Calendar, color: 'bg-purple-500' },
    { type: 'email' as const, label: 'Email', icon: Mail, color: 'bg-orange-500' },
    { type: 'deal' as const, label: 'Deal', icon: Handshake, color: 'bg-green-500' }
  ];

  const quickActions = [
    { label: 'Log Call', type: 'call', points: 5 },
    { label: 'Schedule Meeting', type: 'meeting', points: 10 },
    { label: 'Send Follow-up', type: 'email', points: 3 },
    { label: 'Close Deal', type: 'deal', points: 50 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Track Activity</h1>
        <p className="text-gray-600">Log your sales activities to stay on top of your goals</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const activityType = activityTypes.find(t => t.type === action.type);
          const Icon = activityType?.icon || Phone;
          
          return (
            <button
              key={index}
              onClick={() => {
                setSelectedType(action.type as any);
                setShowAddActivity(true);
              }}
              className="bg-white border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50 transition-all group"
            >
              <div className={`${activityType?.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
              <p className="text-sm text-blue-600 font-medium">+{action.points} points</p>
            </button>
          );
        })}
      </div>

      {/* Today's Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5 border border-blue-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Today's Activity
        </h2>
        
        <div className="grid grid-cols-4 gap-4">
          {activityTypes.map((type) => (
            <div key={type.type} className="text-center">
              <div className={`${type.color} w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <type.icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {type.type === 'call' ? '12' : type.type === 'meeting' ? '3' : type.type === 'email' ? '8' : '1'}
              </p>
              <p className="text-xs text-gray-600 capitalize">{type.type}s</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Form */}
      {showAddActivity && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Log New Activity</h3>
            <button
              onClick={() => setShowAddActivity(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
              <div className="grid grid-cols-4 gap-2">
                {activityTypes.map((type) => (
                  <button
                    key={type.type}
                    type="button"
                    onClick={() => setSelectedType(type.type)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedType === type.type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className={`w-5 h-5 mx-auto ${
                      selectedType === type.type ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-xs mt-1 ${
                      selectedType === type.type ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      {type.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Discovery call with TechCorp"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Client/Company</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., TechCorp Inc."
              />
            </div>

            {selectedType === 'deal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deal Value ($)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25000"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowAddActivity(false)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Log Activity</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}