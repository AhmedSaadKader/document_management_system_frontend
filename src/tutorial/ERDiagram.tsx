import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import MermaidChart from './MermaidChart';

const ERDiagram: React.FC = () => {
  const erDiagram = `
    erDiagram
    %% PostgresSQL Tables
    USERS ||--o{ USEROTPS : has
    USERS {
        string national_id PK
        string first_name
        string last_name
        string email
        string password_digest
        string created_at
        string updated_at
    }

    USEROTPS {
        int id PK
        string email FK
        string otp_code
        string expires_at
        boolean used
        string created_at
    }

    %% MongoDB Collections
    USERS ||--o{ WORKSPACES : creates
    USERS ||--o{ DOCUMENTS : uploads

    WORKSPACES ||--o{ DOCUMENTS : contains
    WORKSPACES {
        string workspaceName
        string description
        string userId FK
        string userEmail
        boolean isPublic
        objectId[] documents
        Permission[] permissions
        Date createdAt
        Date updatedAt
        boolean deleted
    }

    DOCUMENTS ||--o{ METADATA : has
    DOCUMENTS {
        string documentName
        objectId workspace FK
        string userId FK
        string userEmail
        boolean deleted
        string filePath
        string fileType
        string originalFileName
        int fileSize
        string[] tags
        int version
        VersionHistory[] versionHistory
        Date createdAt
        Date updatedAt
    }

    METADATA {
        int id PK
        string document_id FK
        string key
        string value
    }

    DOCUMENTS ||--o{ PERMISSIONS : has
    PERMISSIONS {
        objectId userEmail FK
        string permission
    }

    FAVORITES {
        string userId FK
        objectId workspaceId FK
        Date favoritedAt
    }


    %% Relationships
    USERS ||--o{ FAVORITES : favorites
    WORKSPACES ||--o{ PERMISSIONS : has

  `;
  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Databases Architecture
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <MermaidChart chart={erDiagram} />
      </Paper>
    </Container>
  );
};

export default ERDiagram;
