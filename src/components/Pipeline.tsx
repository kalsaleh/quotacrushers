import React from 'react';
import { Baseline as PipelineIcon, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { deals } from '../data/mockData';

export default function Pipeline() {
  const stages = [
    { id: 'prospect', label: 'Prospect', color: 'bg-gray-100 text-gray-800' },
    { id: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800' },
    { id: 'proposal', label: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-100 text-orange-800' },
    { id: 'closed-won', label: 'Closed Won', color: 'bg-green-100 text-green-800' },
    { id: 'closed-lost', label: 'Closed Lost', color: 'bg-red-100 text-red-800' }
  ];

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  const getStageColor = (stage: string) => {
    const stageInfo = stages.find(s => s.id === stage);
    return stageInfo?.color || 'bg-gray-100 text-gray-800';
  };

  const getDaysUntilClose = (date: string) => {
    const today = new Date();
    const closeDate = new Date(date);
    const diffTime = closeDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Deal Pipeline</h1>
        <p className="text-gray-600">Track your deals through the sales process</p>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-bold text-gray-900">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Weighted Value</p>
              <p className="text-2xl font-bold text-gray-900">${(weightedValue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals List */}
      <div className="space-y-4">
        {deals.map((deal) => {
          const daysUntilClose = getDaysUntilClose(deal.expectedCloseDate);
          const isUrgent = daysUntilClose <= 7 && deal.stage !== 'closed-won' && deal.stage !== 'closed-lost';
          
          return (
            <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                    {isUrgent && <AlertCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <p className="text-gray-600">{deal.client}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ${(deal.value / 1000).toFixed(0)}K
                  </p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                    {stages.find(s => s.id === deal.stage)?.label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Probability</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                        style={{ width: `${deal.probability}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{deal.probability}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Expected Close</p>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                      {daysUntilClose > 0 ? `${daysUntilClose} days` : `${Math.abs(daysUntilClose)} days overdue`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Weighted Value:</span>
                  <span className="font-medium text-gray-900">
                    ${((deal.value * deal.probability / 100) / 1000).toFixed(0)}K
                  </span>
                </div>
                
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stage Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center space-x-2 mb-4">
          <PipelineIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Pipeline by Stage</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {stages.slice(0, 4).map((stage) => {
            const stageDeals = deals.filter(deal => deal.stage === stage.id);
            const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
            
            return (
              <div key={stage.id} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stage.color}`}>
                    {stage.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {stageDeals.length}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  ${(stageValue / 1000).toFixed(0)}K
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}