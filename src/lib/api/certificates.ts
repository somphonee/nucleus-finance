const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface CertificateData {
  license_number: string;
  registration_date: string;
  application_date: string;
  cooperative_name_lao: string;
  cooperative_name_english: string;
  cooperative_type: string;
  chairman_name: string;
  chairman_nationality: string;
  registered_capital: number;
  capital_in_words: string;
  office_address: string;
  tax_id: string;
  issuance_location: string;
  issuance_date: string;
  number_of_members: number;
  cooperative_purpose: string;
  supervising_authority: string;
  chairman_photo?: string;
}

export interface CertificateResponse {
  success: boolean;
  message: string;
  data: {
    id: number;
    license_number: string;
    cooperative_name_lao: string;
    cooperative_name_english: string;
    created_at: string;
    updated_at: string;
  };
}

export interface CertificateListResponse {
  success: boolean;
  message: string;
  data: Array<{
    id: number;
    license_number: string;
    cooperative_name_lao: string;
    cooperative_name_english: string;
    created_at: string;
  }>;
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class CertificatesAPI {
  private getAuthToken(): string | null {
    // Get token from localStorage or your auth context
    const token = localStorage.getItem('authToken');
    return token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
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
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async createCertificate(data: CertificateData): Promise<CertificateResponse> {
    return this.request<CertificateResponse>('/certificates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCertificates(params?: {
    page?: number;
    page_size?: number;
    search?: string;
  }): Promise<CertificateListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    return this.request<CertificateListResponse>(
      `/certificates${queryString ? `?${queryString}` : ''}`
    );
  }

  async getCertificateById(id: number): Promise<CertificateResponse> {
    return this.request<CertificateResponse>(`/certificates/${id}`);
  }

  async getCertificateByNumber(number: string): Promise<CertificateResponse> {
    return this.request<CertificateResponse>(`/certificates/number/${number}`);
  }

  async updateCertificate(id: number, data: Partial<CertificateData>): Promise<CertificateResponse> {
    return this.request<CertificateResponse>(`/certificates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCertificate(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/certificates/${id}`, {
      method: 'DELETE',
    });
  }

  async generatePDF(data: CertificateData): Promise<Blob> {
    const token = this.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/certificates/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to generate PDF: ${response.statusText}`);
    }

    return response.blob();
  }

  async downloadPDF(id: number): Promise<Blob> {
    const token = this.getAuthToken();
    
    const response = await fetch(`${API_BASE_URL}/certificates/${id}/download-pdf`, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.statusText}`);
    }

    return response.blob();
  }

  async getStatistics(): Promise<{
    success: boolean;
    data: {
      total_certificates: number;
      active_certificates: number;
      certificates_this_month: number;
    };
  }> {
    return this.request('/certificates/statistics');
  }
}

export const certificatesAPI = new CertificatesAPI();
