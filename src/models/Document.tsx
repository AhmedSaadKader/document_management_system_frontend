export interface Document {
  documentName: string;
  userId: string;
  userEmail: string;
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  workspace: string;
  filePath: string;
  originalFileName: string;
  fileSize: number;
  fileType: string;
  tags?: string[];
  version: number;
  versionHistory: Array<{
    version: number;
    updatedAt?: string;
    updatedBy: string;
  }>;
  permissions: Array<{
    userEmail: string;
    permission: 'read' | 'write' | 'admin';
  }>;
}

export interface DocumentInWorkspace {
  wokspaceId: string;
  _id: string;
  documentName: string;
}
