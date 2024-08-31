import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import WorkspaceHeader from '../components/WorkspaceComponents/WorkspaceHeader';
import DocumentForm from '../components/DocumentComponents/DocumentModals/DocumentFormModal';
import DocumentList from '../components/DocumentComponents/DocumentList';
import DocumentSearchFilter from '../components/DocumentComponents/DocumentSearchFilter';
import { useTranslation } from 'react-i18next';

const WorkspacePage: React.FC = () => {
  const [workspace, setWorkspace] = useState<any>(null);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const { t } = useTranslation();

  const updateSearchFilters = (
    e: { target: { value: React.SetStateAction<string> } },
    state: string
  ) => {
    if (state == 'search') {
      setSearch(e.target.value);
    } else if (state == 'sort') {
      setSortBy(e.target.value);
    } else if (state == 'order') {
      setOrder(e.target.value);
    }
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const queryParams = new URLSearchParams({
          search,
          sortBy,
          order,
        }).toString();

        const response = await fetch(
          `http://localhost:5000/api/v1/workspaces/${workspaceId}?${queryParams}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch workspace');
        }

        const data = await response.json();
        setWorkspace(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkspace();
  }, [workspaceId, search, sortBy, order]);

  const onDocumentAdded = (newDocument: any) => {
    setWorkspace((prevWorkspace: any) => ({
      ...prevWorkspace,
      documents: [...prevWorkspace.documents, newDocument],
    }));
  };

  const handleDocumentDeleted = (documentId: string) => {
    setWorkspace((prevWorkspace: any) => ({
      ...prevWorkspace,
      documents: prevWorkspace.documents.filter(
        (document: any) => document._id !== documentId
      ),
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {workspace && workspaceId ? (
        <>
          <WorkspaceHeader
            workspaceName={workspace.workspaceName}
            workspaceId={workspaceId}
            description={workspace.description}
          />
          <DocumentSearchFilter
            search={search}
            sortBy={sortBy}
            order={order}
            updateSearchFilters={updateSearchFilters}
          />
          <DocumentForm
            workspaceId={workspaceId!}
            onDocumentAdded={onDocumentAdded}
          />
          <Grid container spacing={3} sx={{ mt: 3, mx: 1 }}>
            <DocumentList
              documents={workspace.documents}
              onDelete={handleDocumentDeleted}
            />
          </Grid>
        </>
      ) : (
        <Typography>{t('workspace.loadingWorkspace')}</Typography>
      )}
    </Box>
  );
};

export default WorkspacePage;
