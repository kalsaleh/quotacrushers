import React, { useState } from 'react';
import { AuthContext, useAuthProvider } from './hooks/useAuth';
import AuthForm from './components/AuthForm';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Goals from './components/Goals';
import ActivityTracker from './components/ActivityTracker';
import Leaderboard from './components/Leaderboard';
import Pipeline from './components/Pipeline';
import Challenges from './components/Challenges';
import Admin from './components/Admin';

function App() {
  const auth = useAuthProvider();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAdmin] = useState(true); // In real app, this would come from user context

  if (auth.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!auth.user) {
    return (
      <AuthContext.Provider value={auth}>
        <AuthForm />
      </AuthContext.Provider>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'goals':
        return <Goals />;
      case 'activity':
        return <ActivityTracker />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'pipeline':
        return <Pipeline />;
      case 'challenges':
        return <Challenges />;
      case 'admin':
        return isAdmin ? <Admin /> : <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AuthContext.Provider value={auth}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="px-4 py-6 pb-24">
          <div className="max-w-md mx-auto">
            {renderContent()}
          </div>
        </main>
        
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin} />
      </div>
    </AuthContext.Provider>
  );
}

export default App;