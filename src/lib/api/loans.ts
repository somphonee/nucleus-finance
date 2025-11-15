const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface LoanProduct {
  id: number;
  name: string;
  name_en?: string;
  interest_rate: number;
  max_amount: number;
  max_term_months: number;
  organization_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: number;
  loan_number: string;
  member_id: number;
  product_id: number;
  principal_amount: number;
  interest_rate: number;
  term_months: number;
  disbursement_date?: string;
  first_payment_date?: string;
  status: 'PENDING' | 'APPROVED' | 'DISBURSED' | 'ACTIVE' | 'CLOSED' | 'DEFAULTED';
  outstanding_balance: number;
  created_at: string;
  updated_at: string;
}

export interface LoanRepayment {
  id: number;
  loan_id: number;
  payment_date: string;
  principal_amount: number;
  interest_amount: number;
  total_amount: number;
  reference_number?: string;
  created_by: number;
  created_at: string;
}

export interface RepaymentSchedule {
  installment_number: number;
  due_date: string;
  principal_amount: number;
  interest_amount: number;
  total_amount: number;
  outstanding_balance: number;
}

export interface LoanProductResponse {
  success: boolean;
  message: string;
  data: LoanProduct;
}

export interface LoanProductsListResponse {
  success: boolean;
  message: string;
  data: LoanProduct[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface LoanResponse {
  success: boolean;
  message: string;
  data: Loan;
}

export interface LoansListResponse {
  success: boolean;
  message: string;
  data: Loan[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface RepaymentScheduleResponse {
  success: boolean;
  message: string;
  data: RepaymentSchedule[];
}

class LoansAPI {
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

  // Loan Products
  async getLoanProducts(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
  }): Promise<LoanProductsListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());

    const queryString = queryParams.toString();
    return this.request<LoanProductsListResponse>(`/loan/products${queryString ? `?${queryString}` : ''}`);
  }

  async getLoanProductById(id: number): Promise<LoanProductResponse> {
    return this.request<LoanProductResponse>(`/loan/products/${id}`);
  }

  async createLoanProduct(data: Omit<LoanProduct, 'id' | 'created_at' | 'updated_at'>): Promise<LoanProductResponse> {
    return this.request<LoanProductResponse>('/loan/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLoanProduct(id: number, data: Partial<LoanProduct>): Promise<LoanProductResponse> {
    return this.request<LoanProductResponse>(`/loan/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLoanProduct(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/loan/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Loans
  async getLoans(params?: {
    page?: number;
    page_size?: number;
    member_id?: number;
    status?: string;
  }): Promise<LoansListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.member_id) queryParams.append('member_id', params.member_id.toString());
    if (params?.status) queryParams.append('status', params.status);

    const queryString = queryParams.toString();
    return this.request<LoansListResponse>(`/loan${queryString ? `?${queryString}` : ''}`);
  }

  async getLoanById(id: number): Promise<LoanResponse> {
    return this.request<LoanResponse>(`/loan/${id}`);
  }

  async createLoan(data: Omit<Loan, 'id' | 'loan_number' | 'outstanding_balance' | 'created_at' | 'updated_at'>): Promise<LoanResponse> {
    return this.request<LoanResponse>('/loan', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLoan(id: number, data: Partial<Loan>): Promise<LoanResponse> {
    return this.request<LoanResponse>(`/loan/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async disburseLoan(id: number, data: {
    disbursement_date: string;
    first_payment_date: string;
  }): Promise<LoanResponse> {
    return this.request<LoanResponse>(`/loan/${id}/disburse`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async repayLoan(id: number, data: {
    payment_date: string;
    principal_amount: number;
    interest_amount: number;
    reference_number?: string;
    created_by: number;
  }): Promise<LoanResponse> {
    return this.request<LoanResponse>(`/loan/${id}/repay`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRepaymentSchedule(id: number): Promise<RepaymentScheduleResponse> {
    return this.request<RepaymentScheduleResponse>(`/loan/${id}/schedule`);
  }
}

export const loansAPI = new LoansAPI();
