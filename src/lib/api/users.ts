const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  organization_id?: number;
  province_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface UsersListResponse {
  success: boolean;
  message: string;
  data: User[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class UsersAPI {
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getAuthToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getUsers(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
    role?: string;
  }): Promise<UsersListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.role) queryParams.append('role', params.role);

    const queryString = queryParams.toString();
    return this.request<UsersListResponse>(`/users${queryString ? `?${queryString}` : ''}`);
  }

  async getUserById(id: number): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}`);
  }

  async createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<UserResponse> {
    return this.request<UserResponse>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateUser(id: number, data: Partial<User>): Promise<UserResponse> {
    return this.request<UserResponse>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }
}

export const usersAPI = new UsersAPI();
