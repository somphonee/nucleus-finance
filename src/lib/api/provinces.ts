const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Province {
  id: number;
  name: string;
  name_en?: string;
  code?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProvinceResponse {
  success: boolean;
  message: string;
  data: Province;
}

export interface ProvincesListResponse {
  success: boolean;
  message: string;
  data: Province[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class ProvincesAPI {
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

  async getProvinces(params?: { page?: number; page_size?: number }): Promise<ProvincesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    const queryString = queryParams.toString();
    return this.request<ProvincesListResponse>(`/provinces${queryString ? `?${queryString}` : ''}`);
  }

  async getProvinceById(id: number): Promise<ProvinceResponse> {
    return this.request<ProvinceResponse>(`/provinces/${id}`);
  }

  async createProvince(data: Omit<Province, 'id' | 'created_at' | 'updated_at'>): Promise<ProvinceResponse> {
    return this.request<ProvinceResponse>('/provinces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProvince(id: number, data: Partial<Province>): Promise<ProvinceResponse> {
    return this.request<ProvinceResponse>(`/provinces/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProvince(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/provinces/${id}`, {
      method: 'DELETE',
    });
  }
}

export const provincesAPI = new ProvincesAPI();
