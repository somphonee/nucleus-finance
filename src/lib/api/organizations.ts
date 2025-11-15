const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Organization {
  id: number;
  name: string;
  name_en?: string;
  code: string;
  province_id: number;
  address?: string;
  phone?: string;
  email?: string;
  registration_number?: string;
  registration_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface OrganizationResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface OrganizationsListResponse {
  success: boolean;
  message: string;
  data: Organization[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class OrganizationsAPI {
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

  async getOrganizations(params?: { 
    page?: number; 
    page_size?: number;
    province_id?: number;
    search?: string;
  }): Promise<OrganizationsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.province_id) queryParams.append('province_id', params.province_id.toString());
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return this.request<OrganizationsListResponse>(`/organizations${queryString ? `?${queryString}` : ''}`);
  }

  async getOrganizationById(id: number): Promise<OrganizationResponse> {
    return this.request<OrganizationResponse>(`/organizations/${id}`);
  }

  async createOrganization(data: Omit<Organization, 'id' | 'created_at' | 'updated_at'>): Promise<OrganizationResponse> {
    return this.request<OrganizationResponse>('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrganization(id: number, data: Partial<Organization>): Promise<OrganizationResponse> {
    return this.request<OrganizationResponse>(`/organizations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteOrganization(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/organizations/${id}`, {
      method: 'DELETE',
    });
  }
}

export const organizationsAPI = new OrganizationsAPI();
