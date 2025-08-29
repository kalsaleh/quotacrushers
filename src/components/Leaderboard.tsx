import React from 'react';
import { Trophy, TrendingUp, TrendingDown, Award, Users } from 'lucide-react';
import { leaderboard } from '../data/mockData';

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Team Leaderboard</h1>
        <p className="text-gray-600">See how you stack up against your teammates</p>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100">
        <div className="flex items-center justify-center space-x-8">
          {leaderboard.slice(0, 3).map((member, index) => {
            const positions = ['🥈', '🏆', '🥉'];
            const heights = ['h-16', 'h-20', 'h-14'];
            const order = [1, 0, 2]; // Second, First, Third
            const actualIndex = order[index];
            const actualMember = leaderboard[actualIndex];
            
            return (
              <div key={actualMember.id} className="text-center">
                <div className="relative mb-3">
                  <img
                    src={actualMember.avatar}
                    alt={actualMember.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                  />
                  <span className="absolute -top-2 -right-2 text-2xl">
                    {actualIndex === 0 ? '🏆' : actualIndex === 1 ? '🥈' : '🥉'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{actualMember.name}</h3>
                <p className="text-2xl font-bold text-gray-900">{actualMember.score}</p>
                <div className={`${heights[actualIndex]} bg-gradient-to-t ${
                  actualIndex === 0 ? 'from-yellow-400 to-yellow-300' : 
                  actualIndex === 1 ? 'from-gray-400 to-gray-300' : 'from-orange-400 to-orange-300'
                } rounded-t-lg mt-2 mx-auto w-12`}></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Full Rankings
            </h2>
            <Award className="w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {leaderboard.map((member, index) => (
            <div key={member.id} className={`p-4 ${index === 1 ? 'bg-blue-50' : ''}`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm">
                  {index + 1}
                </div>
                
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    {member.badge && (
                      <span className="text-lg">{member.badge}</span>
                    )}
                    {index === 1 && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {member.achievements.slice(0, 2).map((achievement, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{member.score}</p>
                  <div className="flex items-center space-x-1">
                    {member.change > 0 ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${
                      member.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {member.change > 0 ? '+' : ''}{member.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Stats */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Trophy className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Team Performance</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold">89%</p>
            <p className="text-purple-100 text-sm">Avg. Goal Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">847</p>
            <p className="text-purple-100 text-sm">Total Activities</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">$2.1M</p>
            <p className="text-purple-100 text-sm">Team Revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
}