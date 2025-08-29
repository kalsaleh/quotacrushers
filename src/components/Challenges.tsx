import React, { useState } from 'react';
import { Trophy, Users, User, Swords, Calendar, Target, Gift, Plus, Clock } from 'lucide-react';
import { challenges, duelRequests, currentUser, leaderboard } from '../data/mockData';

export default function Challenges() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'individual' | 'team' | 'duel'>('all');
  const [showCreateDuel, setShowCreateDuel] = useState(false);

  const filteredChallenges = challenges.filter(challenge => 
    activeFilter === 'all' || challenge.type === activeFilter
  );

  const pendingDuels = duelRequests.filter(duel => 
    duel.status === 'pending' && duel.challenged === currentUser.id
  );

  const activeDuels = duelRequests.filter(duel => 
    duel.status === 'active' && (duel.challenger === currentUser.id || duel.challenged === currentUser.id)
  );

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'individual': return User;
      case 'team': return Users;
      case 'duel': return Swords;
      default: return Trophy;
    }
  };

  const getChallengeColor = (type: string) => {
    switch (type) {
      case 'individual': return 'bg-blue-100 text-blue-600';
      case 'team': return 'bg-green-100 text-green-600';
      case 'duel': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getProgressPercentage = (challenge: any) => {
    const userProgress = challenge.progress[currentUser.id] || 0;
    return Math.min((userProgress / challenge.target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Challenges</h1>
        <p className="text-gray-600">Compete, achieve, and earn rewards</p>
      </div>

      {/* Pending Duels */}
      {pendingDuels.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
          <div className="flex items-center space-x-2 mb-3">
            <Swords className="w-5 h-5 text-red-600" />
            <h2 className="font-semibold text-red-900">Duel Requests</h2>
          </div>
          
          {pendingDuels.map((duel) => {
            const challenger = leaderboard.find(member => member.id === duel.challenger);
            
            return (
              <div key={duel.id} className="bg-white rounded-lg p-4 mb-3 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={challenger?.avatar}
                      alt={challenger?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{duel.title}</h3>
                      <p className="text-sm text-gray-600">
                        {challenger?.name} challenges you to {duel.target} {duel.metric} in {duel.duration} days
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Accept Challenge
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'all', label: 'All' },
          { id: 'individual', label: 'Individual' },
          { id: 'team', label: 'Team' },
          { id: 'duel', label: 'Duels' }
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Create Duel Button */}
      <button
        onClick={() => setShowCreateDuel(true)}
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
      >
        <Swords className="w-5 h-5" />
        <span>Challenge a Teammate</span>
      </button>

      {/* Active Challenges */}
      <div className="space-y-4">
        {filteredChallenges.map((challenge) => {
          const Icon = getChallengeIcon(challenge.type);
          const colorClass = getChallengeColor(challenge.type);
          const progress = getProgressPercentage(challenge);
          const daysLeft = Math.ceil((new Date(challenge.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`p-2 rounded-lg ${colorClass}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                      {challenge.type.charAt(0).toUpperCase() + challenge.type.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{challenge.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{daysLeft} days left</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{challenge.participants.length} participants</span>
                    </div>
                  </div>
                </div>
                
                {challenge.prize && (
                  <div className="text-right">
                    <Gift className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">{challenge.prize}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Your Progress</span>
                  <span className="text-sm font-medium text-gray-900">
                    {challenge.progress[currentUser.id] || 0} / {challenge.target} {challenge.unit}
                  </span>
                </div>
                
                <div className="bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full h-3 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">
                    {progress.toFixed(0)}% Complete
                  </span>
                  {progress >= 100 && (
                    <span className="text-sm font-medium text-green-600 flex items-center space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>Completed!</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Duels */}
      {activeDuels.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Swords className="w-5 h-5 text-red-600" />
            <span>Active Duels</span>
          </h2>
          
          {activeDuels.map((duel) => {
            const opponent = leaderboard.find(member => 
              member.id === (duel.challenger === currentUser.id ? duel.challenged : duel.challenger)
            );
            
            return (
              <div key={duel.id} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-5 border border-red-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={opponent?.avatar}
                      alt={opponent?.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-200"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{duel.title}</h3>
                      <p className="text-sm text-gray-600">vs {opponent?.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-red-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{duel.duration} days</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">You</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-gray-500">{duel.metric}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{opponent?.name}</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                    <p className="text-xs text-gray-500">{duel.metric}</p>
                  </div>
                </div>
                
                {duel.prize && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Prize: <span className="font-medium">{duel.prize}</span></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Duel Modal */}
      {showCreateDuel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Duel Challenge</h3>
              <button
                onClick={() => setShowCreateDuel(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Weekly Call Challenge"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Opponent</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option value="">Select teammate...</option>
                  {leaderboard.filter(member => member.id !== currentUser.id).map((member) => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="calls">Calls</option>
                    <option value="meetings">Meetings</option>
                    <option value="deals">Deals</option>
                    <option value="revenue">Revenue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="7"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prize (optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Lunch on the loser"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateDuel(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}