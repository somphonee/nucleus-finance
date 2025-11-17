const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
  role?: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user_id: number;
    username: string;
    email: string;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    expires_in: number;
  };
}

class AuthAPI {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Registration failed',
      }));
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Login failed',
      }));
      throw new Error(error.message || 'Login failed');
    }

    const data: LoginResponse = await response.json();
    
    // Store tokens
    if (data.success && data.data.access_token) {
      localStorage.setItem('authToken', data.data.access_token);
      localStorage.setItem('refreshToken', data.data.refresh_token);
    }

    return data;
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      throw new Error('Failed to refresh token');
    }

    const data: RefreshTokenResponse = await response.json();
    
    if (data.success && data.data.access_token) {
      localStorage.setItem('authToken', data.data.access_token);
    }

    return data;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authAPI = new AuthAPI();
