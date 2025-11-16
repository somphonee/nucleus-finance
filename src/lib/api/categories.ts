const API_BASE_URL = 'http://localhost:3000/api/v1';

export interface Category {
  id: number;
  name: string;
  name_en?: string;
  type: string;
  description?: string;
  organization_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  success: boolean;
  message: string;
  data: Category;
}

export interface CategoriesListResponse {
  success: boolean;
  message: string;
  data: Category[];
  meta?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

class CategoriesAPI {
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

  async getCategories(params?: {
    page?: number;
    page_size?: number;
    organization_id?: number;
    type?: string;
  }): Promise<CategoriesListResponse> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
    if (params?.organization_id) queryParams.append('organization_id', params.organization_id.toString());
    if (params?.type) queryParams.append('type', params.type);

    const queryString = queryParams.toString();
    return this.request<CategoriesListResponse>(`/categories${queryString ? `?${queryString}` : ''}`);
  }

  async getCategoryById(id: number): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`);
  }

  async getCategoriesByType(type: string): Promise<CategoriesListResponse> {
    return this.request<CategoriesListResponse>(`/categories/type/${type}`);
  }

  async createCategory(data: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<CategoryResponse> {
    return this.request<CategoryResponse>('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<CategoryResponse> {
    return this.request<CategoryResponse>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: number): Promise<{ success: boolean; message: string }> {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
}

export const categoriesAPI = new CategoriesAPI();
