import { UserData } from '../pages/SignUp';

class ApiClient {
  private static readonly baseUrl = process.env.REACT_APP_API_URL;
  private static readonly itemsPerPage = 15;
  private static readonly token = localStorage.getItem('authToken') || '';

  private static async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE',
    body?: any
  ): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'An error occurred');
    }

    return response.json();
  }

  static async generateOtp(userData: UserData): Promise<void> {
    return this.request('/otp/generate', 'POST', userData);
  }

  static async verifyOtp(otpData: {
    email: string;
    otp: string;
  }): Promise<void> {
    return this.request('/otp/verify', 'POST', otpData);
  }

  static async register(userData: UserData): Promise<any> {
    const data = await this.request('/users/register', 'POST', userData);
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('national_id', data.national_id);
    localStorage.setItem('first_name', data.first_name);
    localStorage.setItem('last_name', data.last_name);
    return data;
  }

  static async login(email: string, password: string): Promise<void> {
    const data = await this.request('/users/login', 'POST', {
      email,
      password,
    });
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('email', data.email);
    localStorage.setItem('national_id', data.national_id);
    localStorage.setItem('first_name', data.first_name);
    localStorage.setItem('last_name', data.last_name);
  }

  static async fetchUser(email: string): Promise<any> {
    return this.request(`/users/${email}`, 'GET');
  }

  static async createWorkspace(workspaceData: {
    workspaceName: string;
    description: string;
  }): Promise<any> {
    return this.request('/workspaces', 'POST', workspaceData);
  }

  static async addDocument(
    workspaceId: string,
    formData: FormData
  ): Promise<any> {
    return this.request(
      `/workspaces/${workspaceId}/documents`,
      'POST',
      formData
    );
  }

  static async fetchDocuments(queryParams: {
    search?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  }): Promise<any> {
    const query = new URLSearchParams(queryParams as any).toString();
    return this.request(`/documents/filter?${query}`, 'GET');
  }

  static async fetchWorkspace(
    workspaceId: string,
    queryParams: {
      search?: string;
      sortBy?: string;
      order?: 'asc' | 'desc';
    }
  ): Promise<any> {
    const query = new URLSearchParams(queryParams as any).toString();
    return this.request(`/workspaces/${workspaceId}?${query}`, 'GET');
  }

  static async fetchRecycleBin(): Promise<any> {
    return this.request('/documents/recycle-bin', 'GET');
  }

  static async fetchAllWorkspaces(): Promise<any> {
    return this.request('/workspaces', 'GET');
  }

  static async deleteDocument(documentId: string): Promise<any> {
    return this.request(`/documents/${documentId}`, 'DELETE');
  }

  static async fetchDocumentDetails(documentId: string): Promise<any> {
    return this.request(`/documents/${documentId}`, 'GET');
  }

  static async fetchSharedWorkspaces(): Promise<any> {
    return this.request(`/workspaces/shared-workspaces`, 'GET');
  }

  static async addFavorite(workspaceId: string): Promise<any> {
    return this.request(`/favorites/${workspaceId}`, 'POST');
  }

  static async removeFavorite(workspaceId: string): Promise<any> {
    return this.request(`/favorites/${workspaceId}`, 'DELETE');
  }

  static async getAllFavorites(): Promise<any> {
    return this.request(`/favorites`, 'GET');
  }

  static async checkIfFavorite(workspaceId: string): Promise<any> {
    return this.request(`/favorites/${workspaceId}/check`, 'GET');
  }

  static async fetchRecentWorkspaces(): Promise<any> {
    return this.request('/workspaces/recent', 'GET');
  }
}

export default ApiClient;
