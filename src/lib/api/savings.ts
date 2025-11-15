const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface SavingProduct {
  id: number;
  name: string;
  name_en?: string;
  interest_rate: number;
  minimum_balance: number;
  organization_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SavingAccount {
  id: number;
  account_number: string;
  member_id: number;
  product_id: number;
  balance: number;
  status: 'ACTIVE' | 'CLOSED' | 'SUSPENDED';
  opening_date: string;
  closing_date?: string;
  created_at: string;
  updated_at: string;
}

export interface SavingTransaction {
  id: number;
  account_id: number;
  transaction_type: 'DEPOSIT' | 'WITHDRAWAL';
  amount: number;
  transaction_date: string;
  description?: string;
  reference_number?: string;
  created_by: number;
  created_at: string;
}

export interface SavingProductResponse {
  success: boolean;
  message: string;
  data: SavingProduct;
}

export interface SavingProductsListResponse {
  success: boolean;
  message: string;
  data: SavingProduct[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface SavingAccountResponse {
  success: boolean;
  message: string;
  data: SavingAccount;
}

export interface SavingAccountsListResponse {
  success: boolean;
  message: string;
  data: SavingAccount[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface SavingTransactionResponse {
  success: boolean;
  message: string;
  data: SavingTransaction;
}

export interface SavingTransactionsListResponse {
  success: boolean;
  message: string;
  data: SavingTransaction[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class SavingsAPI {
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

  // Saving Products
  async getSavingProducts(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
  }): Promise<SavingProductsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());

    const queryString = queryParams.toString();
    return this.request<SavingProductsListResponse>(`/saving/products${queryString ? `?${queryString}` : ''}`);
  }

  async getSavingProductById(id: number): Promise<SavingProductResponse> {
    return this.request<SavingProductResponse>(`/saving/products/${id}`);
  }

  async createSavingProduct(data: Omit<SavingProduct, 'id' | 'created_at' | 'updated_at'>): Promise<SavingProductResponse> {
    return this.request<SavingProductResponse>('/saving/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSavingProduct(id: number, data: Partial<SavingProduct>): Promise<SavingProductResponse> {
    return this.request<SavingProductResponse>(`/saving/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSavingProduct(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/saving/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Saving Accounts
  async getSavingAccounts(params?: {
    page?: number;
    page_size?: number;
    member_id?: number;
    status?: string;
  }): Promise<SavingAccountsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.member_id) queryParams.append('member_id', params.member_id.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    return this.request<SavingAccountsListResponse>(`/saving/accounts${queryString ? `?${queryString}` : ''}`);
  }

  async getSavingAccountById(id: number): Promise<SavingAccountResponse> {
    return this.request<SavingAccountResponse>(`/saving/accounts/${id}`);
  }

  async createSavingAccount(data: Omit<SavingAccount, 'id' | 'balance' | 'created_at' | 'updated_at'>): Promise<SavingAccountResponse> {
    return this.request<SavingAccountResponse>('/saving/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSavingAccount(id: number, data: Partial<SavingAccount>): Promise<SavingAccountResponse> {
    return this.request<SavingAccountResponse>(`/saving/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async closeSavingAccount(id: number): Promise<SavingAccountResponse> {
    return this.request<SavingAccountResponse>(`/saving/accounts/${id}/close`, {
      method: 'POST',
    });
  }

  // Saving Transactions
  async getSavingTransactions(params?: {
    page?: number;
    page_size?: number;
    account_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<SavingTransactionsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.account_id) queryParams.append('account_id', params.account_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const queryString = queryParams.toString();
    return this.request<SavingTransactionsListResponse>(`/saving/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async deposit(data: {
    account_id: number;
    amount: number;
    transaction_date: string;
    description?: string;
    reference_number?: string;
    created_by: number;
  }): Promise<SavingTransactionResponse> {
    return this.request<SavingTransactionResponse>('/saving/transactions/deposit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async withdraw(data: {
    account_id: number;
    amount: number;
    transaction_date: string;
    description?: string;
    reference_number?: string;
    created_by: number;
  }): Promise<SavingTransactionResponse> {
    return this.request<SavingTransactionResponse>('/saving/transactions/withdraw', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const savingsAPI = new SavingsAPI();
