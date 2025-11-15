const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface CashBook {
  id: number;
  name: string;
  organization_id: number;
  account_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CashTransaction {
  id: number;
  cash_book_id: number;
  transaction_date: string;
  description: string;
  amount: number;
  transaction_type: 'INCOME' | 'EXPENSE';
  category_id?: number;
  reference_number?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface CashBookResponse {
  success: boolean;
  message: string;
  data: CashBook;
}

export interface CashBooksListResponse {
  success: boolean;
  message: string;
  data: CashBook[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface CashTransactionResponse {
  success: boolean;
  message: string;
  data: CashTransaction;
}

export interface CashTransactionsListResponse {
  success: boolean;
  message: string;
  data: CashTransaction[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class CashAPI {
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

  // Cash Books
  async getCashBooks(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
  }): Promise<CashBooksListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());

    const queryString = queryParams.toString();
    return this.request<CashBooksListResponse>(`/cash/books${queryString ? `?${queryString}` : ''}`);
  }

  async getCashBookById(id: number): Promise<CashBookResponse> {
    return this.request<CashBookResponse>(`/cash/books/${id}`);
  }

  async createCashBook(data: Omit<CashBook, 'id' | 'created_at' | 'updated_at'>): Promise<CashBookResponse> {
    return this.request<CashBookResponse>('/cash/books', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCashBook(id: number, data: Partial<CashBook>): Promise<CashBookResponse> {
    return this.request<CashBookResponse>(`/cash/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCashBook(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/cash/books/${id}`, {
      method: 'DELETE',
    });
  }

  // Cash Transactions
  async getCashTransactions(params?: {
    page?: number;
    page_size?: number;
    cash_book_id?: number;
    start_date?: string;
    end_date?: string;
  }): Promise<CashTransactionsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.cash_book_id) queryParams.append('cash_book_id', params.cash_book_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);

    const queryString = queryParams.toString();
    return this.request<CashTransactionsListResponse>(`/cash/transactions${queryString ? `?${queryString}` : ''}`);
  }

  async getCashTransactionById(id: number): Promise<CashTransactionResponse> {
    return this.request<CashTransactionResponse>(`/cash/transactions/${id}`);
  }

  async recordCashTransaction(data: Omit<CashTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<CashTransactionResponse> {
    return this.request<CashTransactionResponse>('/cash/transactions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const cashAPI = new CashAPI();
