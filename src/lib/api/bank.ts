const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface BankAccount {
  id: number;
  account_name: string;
  account_number: string;
  bank_name: string;
  branch?: string;
  organization_id: number;
  coa_account_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BankTransaction {
  id: number;
  bank_account_id: number;
  transaction_date: string;
  description: string;
  amount: number;
  transaction_type: 'DEPOSIT' | 'WITHDRAWAL';
  reference_number?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface BankAccountResponse {
  success: boolean;
  message: string;
  data: BankAccount;
}

export interface BankAccountsListResponse {
  success: boolean;
  message: string;
  data: BankAccount[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface BankTransactionResponse {
  success: boolean;
  message: string;
  data: BankTransaction;
}

export interface BankTransactionsListResponse {
  success: boolean;
  message: string;
  data: BankTransaction[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface BankBalanceResponse {
  success: boolean;
  message: string;
  data: {
    balance: number;
    account_id: number;
    as_of_date: string;
  };
}

class BankAPI {
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

  // Bank Accounts
  async getBankAccounts(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
  }): Promise<BankAccountsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());

    const queryString = queryParams.toString();
    return this.request<BankAccountsListResponse>(`/bank/accounts${queryString ? `?${queryString}` : ''}`);
  }

  async getBankAccountById(id: number): Promise<BankAccountResponse> {
    return this.request<BankAccountResponse>(`/bank/accounts/${id}`);
  }

  async createBankAccount(data: Omit<BankAccount, 'id' | 'created_at' | 'updated_at'>): Promise<BankAccountResponse> {
    return this.request<BankAccountResponse>('/bank/accounts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBankAccount(id: number, data: Partial<BankAccount>): Promise<BankAccountResponse> {
    return this.request<BankAccountResponse>(`/bank/accounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBankAccount(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/bank/accounts/${id}`, {
      method: 'DELETE',
    });
  }

  // Bank Transactions
  async getBankTransactions(params?: {
    page?: number;
    page_size?: number;
    bank_account_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<BankTransactionsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.bank_account_id) queryParams.append('bank_account_id', params.bank_account_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const queryString = queryParams.toString();
    return this.request<BankTransactionsListResponse>(`/bank/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async getBankBalance(id: number): Promise<BankBalanceResponse> {
    return this.request<BankBalanceResponse>(`/bank/transactions/${id}`);
  }

  async recordBankTransaction(data: Omit<BankTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<BankTransactionResponse> {
    return this.request<BankTransactionResponse>('/bank/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const bankAPI = new BankAPI();
