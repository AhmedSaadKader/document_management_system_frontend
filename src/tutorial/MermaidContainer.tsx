import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import MermaidChart from './MermaidChart';

const MermaidContainer: React.FC = () => {
  const mermaidSyntax = `
    graph TB
    subgraph Client
        A[React.js Frontend]
    end
    subgraph Server
        B[Node.js + Express.js]
        C[Authentication Middleware]
    end
    subgraph Services
        F[Document Service]
        G[User Service]
        H[Workspace Service]
        I[Search Service]
    end
    subgraph Storage
        J[S3 Bucket Storage]
    end
    subgraph Databases
        D[(MongoDB)]
        E[(PostgreSQL/MySQL)]
    end
    A <--> B
    B --> C
    C --> F
    C --> G
    C --> H
    C --> I
    F <--> D
    F --> J
    H <--> D
    I <--> D
    G <--> E

  `;

  return (
    <Container>
      <Typography variant='h4' gutterBottom>
        Document Management System Architecture
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <MermaidChart chart={mermaidSyntax} />
      </Paper>
    </Container>
  );
};

export default MermaidContainer;
