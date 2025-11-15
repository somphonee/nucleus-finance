const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Member {
  id: number;
  code: string;
  organization_id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  gender?: string;
  id_card_number?: string;
  phone?: string;
  email?: string;
  address?: string;
  village?: string;
  district?: string;
  province?: string;
  join_date: string;
  status: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberResponse {
  success: boolean;
  message: string;
  data: Member;
}

export interface MembersListResponse {
  success: boolean;
  message: string;
  data: Member[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class MembersAPI {
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

  async getMembers(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
    status?: string;
    search?: string;
  }): Promise<MembersListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return this.request<MembersListResponse>(`/members${queryString ? `?${queryString}` : ''}`);
  }

  async getMemberById(id: number): Promise<MemberResponse> {
    return this.request<MemberResponse>(`/members/${id}`);
  }

  async getMemberByCode(code: string): Promise<MemberResponse> {
    return this.request<MemberResponse>(`/members/code/${code}`);
  }

  async createMember(data: Omit<Member, 'id' | 'created_at' | 'updated_at'>): Promise<MemberResponse> {
    return this.request<MemberResponse>('/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateMember(id: number, data: Partial<Member>): Promise<MemberResponse> {
    return this.request<MemberResponse>(`/members/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteMember(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/members/${id}`, {
      method: 'DELETE',
    });
  }
}

export const membersAPI = new MembersAPI();
