import React, { useState } from 'react';
import { Settings, Plus, Trophy, Users, Target, Database, Badge, Trash2, Edit, Save } from 'lucide-react';
import { challenges, badges } from '../data/mockData';

export default function Admin() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'badges' | 'sheets' | 'users'>('challenges');
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showCreateBadge, setShowCreateBadge] = useState(false);
  const [sheetsConfig, setSheetsConfig] = useState({
    sheetId: '',
    sheetName: 'Sales Data',
    columns: {
      userId: 'A',
      metric: 'B',
      value: 'C',
      date: 'D'
    }
  });

  const adminTabs = [
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'badges', label: 'Badges', icon: Badge },
    { id: 'sheets', label: 'Google Sheets', icon: Database },
    { id: 'users', label: 'Users', icon: Users }
  ];

  const renderChallengesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Manage Challenges</h2>
        <button
          onClick={() => setShowCreateChallenge(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </button>
      </div>

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{challenge.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.type === 'individual' ? 'bg-blue-100 text-blue-600' :
                    challenge.type === 'team' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {challenge.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    challenge.status === 'active' ? 'bg-green-100 text-green-600' :
                    challenge.status === 'upcoming' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {challenge.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Target: {challenge.target} {challenge.unit}</span>
                  <span>Participants: {challenge.participants.length}</span>
                  <span>Ends: {new Date(challenge.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Challenge</h3>
              <button
                onClick={() => setShowCreateChallenge(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Monthly Call Challenge"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="individual">Individual</option>
                    <option value="team">Team</option>
                    <option value="duel">Duel</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe the challenge and what participants need to do..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="calls">Calls</option>
                    <option value="meetings">Meetings</option>
                    <option value="deals">Deals</option>
                    <option value="revenue">Revenue</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="calls"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prize (optional)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="$500 bonus"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge (optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select badge...</option>
                    {badges.map((badge) => (
                      <option key={badge.id} value={badge.id}>{badge.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateChallenge(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderBadgesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Manage Badges</h2>
        <button
          onClick={() => setShowCreateBadge(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Badge</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${badge.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                  <p className="text-gray-600 text-sm">{badge.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      badge.rarity === 'common' ? 'bg-gray-100 text-gray-600' :
                      badge.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                      badge.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {badge.rarity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {badge.criteria.value} {badge.criteria.metric}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Badge Modal */}
      {showCreateBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Create New Badge</h3>
              <button
                onClick={() => setShowCreateBadge(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Badge Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Super Seller"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="🏆"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Awarded for exceptional sales performance"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-yellow-500">Yellow</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-orange-500">Orange</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rarity</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Criteria Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="milestone">Milestone</option>
                    <option value="streak">Streak</option>
                    <option value="achievement">Achievement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Metric</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="calls"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateBadge(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Badge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  const renderSheetsTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Google Sheets Integration</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuration</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Sheet ID</label>
            <input
              type="text"
              value={sheetsConfig.sheetId}
              onChange={(e) => setSheetsConfig({...sheetsConfig, sheetId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            />
            <p className="text-xs text-gray-500 mt-1">
              Found in the URL: https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sheet Name</label>
            <input
              type="text"
              value={sheetsConfig.sheetName}
              onChange={(e) => setSheetsConfig({...sheetsConfig, sheetName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Sales Data"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User ID Column</label>
              <input
                type="text"
                value={sheetsConfig.columns.userId}
                onChange={(e) => setSheetsConfig({
                  ...sheetsConfig, 
                  columns: {...sheetsConfig.columns, userId: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metric Column</label>
              <input
                type="text"
                value={sheetsConfig.columns.metric}
                onChange={(e) => setSheetsConfig({
                  ...sheetsConfig, 
                  columns: {...sheetsConfig.columns, metric: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="B"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Value Column</label>
              <input
                type="text"
                value={sheetsConfig.columns.value}
                onChange={(e) => setSheetsConfig({
                  ...sheetsConfig, 
                  columns: {...sheetsConfig.columns, value: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="C"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Column</label>
              <input
                type="text"
                value={sheetsConfig.columns.date}
                onChange={(e) => setSheetsConfig({
                  ...sheetsConfig, 
                  columns: {...sheetsConfig.columns, date: e.target.value}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="D"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Test Connection
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Sync Now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">Setup Instructions</h4>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Create a Google Sheet with your sales data</li>
          <li>Make sure the sheet is publicly accessible or shared with the service account</li>
          <li>Configure the column mappings above</li>
          <li>Test the connection to ensure data can be read</li>
          <li>Set up automatic sync intervals in the system settings</li>
        </ol>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-gray-600">User management features will be implemented here, including:</p>
        <ul className="list-disc list-inside text-sm text-gray-600 mt-2 space-y-1">
          <li>Add/remove users</li>
          <li>Assign roles and permissions</li>
          <li>Manage team assignments</li>
          <li>Reset user progress</li>
          <li>Export user data</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage challenges, badges, and system configuration</p>
      </div>

      {/* Admin Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {adminTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'challenges' && renderChallengesTab()}
      {activeTab === 'badges' && renderBadgesTab()}
      {activeTab === 'sheets' && renderSheetsTab()}
      {activeTab === 'users' && renderUsersTab()}
    </div>
  );
}