import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import WorkspaceHeader from '../components/WorkspaceComponents/WorkspaceHeader';
import DocumentForm from '../components/DocumentComponents/DocumentModals/DocumentFormModal';
import DocumentList from '../components/DocumentComponents/DocumentList';
import DocumentSearchFilter from '../components/DocumentComponents/DocumentSearchFilter';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';
import { Workspace } from '../models/Workspace';
import useDebounce from '../services/Debounce';

const WorkspacePage: React.FC = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [role, setRole] = useState<string>('viewer');
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();
  const [refresh, setRefresh] = useState(false);

  const updateSearchFilters = (
    e: { target: { value: React.SetStateAction<string> } },
    state: string
  ) => {
    if (state == 'search') {
      setSearch(e.target.value);
    } else if (state == 'sort') {
      setSortBy(e.target.value);
    } else if (state == 'order') {
      if (e.target.value == 'asc' || e.target.value == 'desc')
        setOrder(e.target.value);
    }
  };

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const { workspace, role } = await ApiClient.fetchWorkspace(
          workspaceId as string,
          {
            search: debouncedSearch,
            sortBy,
            order,
          }
        );
        setWorkspace(workspace);
        setRole(role);
        setRefresh(false);
      } catch (error) {
        setRefresh(false);
        console.error(error);
      }
    };
    fetchWorkspace();
  }, [debouncedSearch, sortBy, order, workspaceId, refresh]);

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
            workspace={workspace}
            canShare={role === 'editor' || role === 'owner'}
            owner={workspace.userEmail}
            canEdit={role === 'editor' || role === 'owner'}
            canDelete={role === 'owner'}
            setRefresh={setRefresh}
          />
          <DocumentSearchFilter
            search={search}
            sortBy={sortBy}
            order={order}
            updateSearchFilters={updateSearchFilters}
          />
          {role !== 'viewer' && (
            <DocumentForm
              workspaceId={workspaceId!}
              isSidebar={false}
              onDocumentAdded={onDocumentAdded}
            />
          )}

          <Grid container spacing={3} sx={{ mt: 3, mx: 1 }}>
            <DocumentList
              documents={workspace.documents}
              onDelete={handleDocumentDeleted}
              canDelete={role === 'editor' || role === 'owner'}
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
