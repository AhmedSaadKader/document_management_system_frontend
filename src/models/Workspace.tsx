import { Document } from './Document';

export interface Workspace {
  _id: string;
  workspaceName: string;
  description?: string;
  userId: string;
  userEmail: string;
  isPublic: boolean;
  documents: Document[];
  permissions: Array<{
    userEmail: string;
    permission: 'owner' | 'editor' | 'viewer';
  }>;
  createdAt?: string;
  updatedAt?: string;
  deleted: boolean;
}

export type WorkspaceWithRole = {
  workspace: Workspace;
  role: string;
};
