const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface ChartOfAccount {
  id: number;
  code: string;
  name: string;
  name_en?: string;
  account_type: string;
  parent_id?: number;
  level: number;
  is_active: boolean;
  organization_id: number;
  created_at: string;
  updated_at: string;
}

export interface COAResponse {
  success: boolean;
  message: string;
  data: ChartOfAccount;
}

export interface COAListResponse {
  success: boolean;
  message: string;
  data: ChartOfAccount[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface COAHierarchyResponse {
  success: boolean;
  message: string;
  data: (ChartOfAccount & { children?: ChartOfAccount[] })[];
}

class COAAPI {
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

  async getAccounts(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
  }): Promise<COAListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());

    const queryString = queryParams.toString();
    return this.request<COAListResponse>(`/coa${queryString ? `?${queryString}` : ''}`);
  }

  async getAccountById(id: number): Promise<COAResponse> {
    return this.request<COAResponse>(`/coa/${id}`);
  }

  async getAccountByCode(code: string): Promise<COAResponse> {
    return this.request<COAResponse>(`/coa/code/${code}`);
  }

  async getAccountsByType(type: string): Promise<COAListResponse> {
    return this.request<COAListResponse>(`/coa/type/${type}`);
  }

  async getAccountHierarchy(): Promise<COAHierarchyResponse> {
    return this.request<COAHierarchyResponse>('/coa/hierarchy');
  }

  async createAccount(data: Omit<ChartOfAccount, 'id' | 'created_at' | 'updated_at'>): Promise<COAResponse> {
    return this.request<COAResponse>('/coa', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAccount(id: number, data: Partial<ChartOfAccount>): Promise<COAResponse> {
    return this.request<COAResponse>(`/coa/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAccount(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/coa/${id}`, {
      method: 'DELETE',
    });
  }
}

export const coaAPI = new COAAPI();
