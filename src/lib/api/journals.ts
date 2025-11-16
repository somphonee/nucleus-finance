const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface JournalEntry {
  id: number;
  entry_date: string;
  reference_number?: string;
  description: string;
  organization_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface JournalEntryResponse {
  success: boolean;
  message: string;
  data: JournalEntry;
}

export interface JournalEntriesListResponse {
  success: boolean;
  message: string;
  data: JournalEntry[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class JournalsAPI {
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

  async getJournalEntries(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<JournalEntriesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const queryString = queryParams.toString();
    return this.request<JournalEntriesListResponse>(`/journals${queryString ? `?${queryString}` : ''}`);
  }

  async getJournalEntryById(id: number): Promise<JournalEntryResponse> {
    return this.request<JournalEntryResponse>(`/journals/${id}`);
  }

  async createJournalEntry(data: Omit<JournalEntry, 'id' | 'created_at' | 'updated_at'>): Promise<JournalEntryResponse> {
    return this.request<JournalEntryResponse>('/journals', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateJournalEntry(id: number, data: Partial<JournalEntry>): Promise<JournalEntryResponse> {
    return this.request<JournalEntryResponse>(`/journals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteJournalEntry(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/journals/${id}`, {
      method: 'DELETE',
    });
  }
}

export const journalsAPI = new JournalsAPI();
