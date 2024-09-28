class GithubApiClient {
  private static readonly baseUrl = 'https://api.github.com/repos';
  private static readonly repoOwner = 'AhmedSaadKader';
  private static readonly repoNameBackend = 'document_management_system';
  private static readonly repoNameFrontend =
    'document_management_system_frontend';
  private static readonly branch = 'main';

  private static async request(url: string): Promise<any> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An error occurred');
      }

      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  static async fetchFilesBackend() {
    const url = `${this.baseUrl}/${this.repoOwner}/${this.repoNameBackend}/git/trees/${this.branch}?recursive=1`;
    const response = await this.request(url);

    const data = await response.json();

    const tsFiles = data.tree
      .filter(
        (file: any) => file.path.endsWith('.ts') || file.path.endsWith('.tsx')
      )
      .map((file: any) => ({
        name: file.path.split('/').pop(),
        path: file.path,
      }));

    return tsFiles;
  }

  static async fetchFileContentBackend(filePath: string): Promise<string> {
    const url = `https://raw.githubusercontent.com/${this.repoOwner}/${this.repoNameBackend}/${this.branch}/${filePath}`;
    const response = await this.request(url);
    const content = await response.text();
    return content;
  }
  static async fetchFileContentFrontend(filePath: string): Promise<string> {
    const url = `https://raw.githubusercontent.com/${this.repoOwner}/${this.repoNameFrontend}/${this.branch}/${filePath}`;
    const response = await this.request(url);
    const content = await response.text();
    return content;
  }
}

export default GithubApiClient;
