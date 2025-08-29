// API service for communicating with Cloudflare Workers backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://quota-crushers-api.burrito-bot.workers.dev' 
    : 'http://localhost:8787');

console.log('🔗 API Base URL:', API_BASE_URL);
console.log('🌍 Environment:', import.meta.env.PROD ? 'Production' : 'Development');

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  // User endpoints
  async getProfile(token: string) {
    return this.request('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updateProfile(token: string, data: any) {
    return this.request('/api/user/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  }

  // Goals endpoints
  async getGoals(token: string) {
    return this.request('/api/goals', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async createGoal(token: string, goal: any) {
    return this.request('/api/goals', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(goal),
    });
  }

  async updateGoal(token: string, goalId: string, updates: any) {
    return this.request(`/api/goals/${goalId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }

  async deleteGoal(token: string, goalId: string) {
    return this.request(`/api/goals/${goalId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Activities endpoints
  async getActivities(token: string) {
    return this.request('/api/activities', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async logActivity(token: string, activity: any) {
    return this.request('/api/activities', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(activity),
    });
  }

  // Challenges endpoints
  async getChallenges(token: string) {
    return this.request('/api/challenges', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async joinChallenge(token: string, challengeId: string) {
    return this.request(`/api/challenges/${challengeId}/join`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Leaderboard endpoints
  async getLeaderboard(token: string) {
    return this.request('/api/leaderboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Pipeline endpoints
  async getPipelineData(token: string) {
    return this.request('/api/pipeline', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async updatePipelineStage(token: string, stageId: string, updates: any) {
    return this.request(`/api/pipeline/${stageId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  }
}

// Export a singleton instance
export const apiService = new ApiService();
