const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface ReportParams {
  organization_id?: number;
  start_date?: string;
  end_date?: string;
  province_id?: number;
  member_id?: number;
}

export interface TrialBalanceItem {
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
}

export interface IncomeStatementItem {
  category: string;
  amount: number;
  percentage?: number;
}

export interface BalanceSheetItem {
  category: string;
  amount: number;
}

export interface GeneralLedgerEntry {
  date: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface CashFlowItem {
  category: string;
  amount: number;
}

export interface TrialBalanceResponse {
  success: boolean;
  message: string;
  data: {
    items: TrialBalanceItem[];
    total_debit: number;
    total_credit: number;
    as_of_date: string;
  };
}

export interface IncomeStatementResponse {
  success: boolean;
  message: string;
  data: {
    revenue: IncomeStatementItem[];
    expenses: IncomeStatementItem[];
    total_revenue: number;
    total_expenses: number;
    net_income: number;
    period_start: string;
    period_end: string;
  };
}

export interface BalanceSheetResponse {
  success: boolean;
  message: string;
  data: {
    assets: BalanceSheetItem[];
    liabilities: BalanceSheetItem[];
    equity: BalanceSheetItem[];
    total_assets: number;
    total_liabilities: number;
    total_equity: number;
    as_of_date: string;
  };
}

export interface GeneralLedgerResponse {
  success: boolean;
  message: string;
  data: {
    account_code: string;
    account_name: string;
    entries: GeneralLedgerEntry[];
    opening_balance: number;
    closing_balance: number;
  };
}

export interface CashFlowResponse {
  success: boolean;
  message: string;
  data: {
    operating_activities: CashFlowItem[];
    investing_activities: CashFlowItem[];
    financing_activities: CashFlowItem[];
    net_operating_cash: number;
    net_investing_cash: number;
    net_financing_cash: number;
    net_change_in_cash: number;
    period_start: string;
    period_end: string;
  };
}

export interface MemberSummaryResponse {
  success: boolean;
  message: string;
  data: {
    member_id: number;
    member_name: string;
    savings_balance: number;
    shares_balance: number;
    loan_balance: number;
    total_deposits: number;
    total_withdrawals: number;
  };
}

export interface LoanPortfolioResponse {
  success: boolean;
  message: string;
  data: {
    total_loans: number;
    total_outstanding: number;
    total_disbursed: number;
    total_repaid: number;
    average_loan_size: number;
    portfolio_at_risk: number;
    loans_by_status: Record<string, number>;
  };
}

export interface SavingsSummaryResponse {
  success: boolean;
  message: string;
  data: {
    total_accounts: number;
    total_balance: number;
    total_deposits: number;
    total_withdrawals: number;
    active_accounts: number;
    average_balance: number;
  };
}

export interface SharesSummaryResponse {
  success: boolean;
  message: string;
  data: {
    total_shares_issued: number;
    total_value: number;
    total_members_with_shares: number;
    average_shares_per_member: number;
  };
}

export interface DailySummaryResponse {
  success: boolean;
  message: string;
  data: {
    date: string;
    total_transactions: number;
    cash_in: number;
    cash_out: number;
    net_cash_flow: number;
    transactions_by_type: Record<string, number>;
  };
}

export interface MonthlySummaryResponse {
  success: boolean;
  message: string;
  data: {
    month: string;
    total_revenue: number;
    total_expenses: number;
    net_income: number;
    total_assets: number;
    total_liabilities: number;
    member_growth: number;
  };
}

class ReportsAPI {
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

  private buildQueryString(params?: ReportParams): string {
    const queryParams = new URLSearchParams();
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.province_id) queryParams.append('province_id', params.province_id.toString());
    if (params?.member_id) queryParams.append('member_id', params.member_id.toString());

    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  async getTrialBalance(params?: ReportParams): Promise<TrialBalanceResponse> {
    return this.request<TrialBalanceResponse>(`/reports/trial-balance${this.buildQueryString(params)}`);
  }

  async getIncomeStatement(params?: ReportParams): Promise<IncomeStatementResponse> {
    return this.request<IncomeStatementResponse>(`/reports/income-statement${this.buildQueryString(params)}`);
  }

  async getBalanceSheet(params?: ReportParams): Promise<BalanceSheetResponse> {
    return this.request<BalanceSheetResponse>(`/reports/balance-sheet${this.buildQueryString(params)}`);
  }

  async getGeneralLedger(params?: ReportParams & { account_code?: string }): Promise<GeneralLedgerResponse> {
    const queryParams = new URLSearchParams();
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.start_date) queryParams.append('start_date', params.start_date);
    if (params?.end_date) queryParams.append('end_date', params.end_date);
    if (params?.account_code) queryParams.append('account_code', params.account_code);

    const queryString = queryParams.toString();
    return this.request<GeneralLedgerResponse>(`/reports/general-ledger${queryString ? `?${queryString}` : ''}`);
  }

  async getCashFlow(params?: ReportParams): Promise<CashFlowResponse> {
    return this.request<CashFlowResponse>(`/reports/cash-flow${this.buildQueryString(params)}`);
  }

  async getMemberSummary(params?: ReportParams): Promise<MemberSummaryResponse> {
    return this.request<MemberSummaryResponse>(`/reports/member-summary${this.buildQueryString(params)}`);
  }

  async getLoanPortfolio(params?: ReportParams): Promise<LoanPortfolioResponse> {
    return this.request<LoanPortfolioResponse>(`/reports/loan-portfolio${this.buildQueryString(params)}`);
  }

  async getSavingsSummary(params?: ReportParams): Promise<SavingsSummaryResponse> {
    return this.request<SavingsSummaryResponse>(`/reports/savings-summary${this.buildQueryString(params)}`);
  }

  async getSharesSummary(params?: ReportParams): Promise<SharesSummaryResponse> {
    return this.request<SharesSummaryResponse>(`/reports/shares-summary${this.buildQueryString(params)}`);
  }

  async getDailySummary(params?: ReportParams & { date?: string }): Promise<DailySummaryResponse> {
    const queryParams = new URLSearchParams();
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.date) queryParams.append('date', params.date);

    const queryString = queryParams.toString();
    return this.request<DailySummaryResponse>(`/reports/daily-summary${queryString ? `?${queryString}` : ''}`);
  }

  async getMonthlySummary(params?: ReportParams & { month?: string }): Promise<MonthlySummaryResponse> {
    const queryParams = new URLSearchParams();
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.month) queryParams.append('month', params.month);

    const queryString = queryParams.toString();
    return this.request<MonthlySummaryResponse>(`/reports/monthly-summary${queryString ? `?${queryString}` : ''}`);
  }
}

export const reportsAPI = new ReportsAPI();
