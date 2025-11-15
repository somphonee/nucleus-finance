const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface ShareTransaction {
  id: number;
  member_id: number;
  transaction_type: 'BUY' | 'SELL';
  number_of_shares: number;
  price_per_share: number;
  total_amount: number;
  transaction_date: string;
  reference_number?: string;
  created_by: number;
  created_at: string;
}

export interface ShareBalance {
  member_id: number;
  total_shares: number;
  total_value: number;
  current_price_per_share: number;
}

export interface ShareTransactionResponse {
  success: boolean;
  message: string;
  data: ShareTransaction;
}

export interface ShareTransactionsListResponse {
  success: boolean;
  message: string;
  data: ShareTransaction[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface ShareBalanceResponse {
  success: boolean;
  message: string;
  data: ShareBalance;
}

class SharesAPI {
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

  async getShareTransactions(params?: {
    page?: number;
    page_size?: number;
    member_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<ShareTransactionsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.member_id) queryParams.append('member_id', params.member_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const queryString = queryParams.toString();
    return this.request<ShareTransactionsListResponse>(`/share${queryString ? `?${queryString}` : ''}`);
  }

  async getShareTransactionById(id: number): Promise<ShareTransactionResponse> {
    return this.request<ShareTransactionResponse>(`/share/${id}`);
  }

  async buyShares(data: {
    member_id: number;
    number_of_shares: number;
    price_per_share: number;
    transaction_date: string;
    reference_number?: string;
    created_by: number;
  }): Promise<ShareTransactionResponse> {
    return this.request<ShareTransactionResponse>('/share/buy', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async sellShares(data: {
    member_id: number;
    number_of_shares: number;
    price_per_share: number;
    transaction_date: string;
    reference_number?: string;
    created_by: number;
  }): Promise<ShareTransactionResponse> {
    return this.request<ShareTransactionResponse>('/share/sell', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMemberShareBalance(memberId: number): Promise<ShareBalanceResponse> {
    return this.request<ShareBalanceResponse>(`/share/member/${memberId}/balance`);
  }
}

export const sharesAPI = new SharesAPI();
