import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';

const CreateWorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const data = await ApiClient.createWorkspace({workspaceName, description});
      navigate(`/workspace/${data._id}`);
    } catch (error) {
      console.error('Error creating workspace:', error);
      setError(`${t('workspace.workspaceCreateError')}`);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('workspace.createNewWorkspace')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t('workspace.workspaceName')}
          fullWidth
          margin='normal'
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          required
        />
        <TextField
          label={t('workspace.description')}
          fullWidth
          margin='normal'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && (
          <Typography color='error' variant='body2' gutterBottom>
            {error}
          </Typography>
        )}
        <Button type='submit' variant='contained' color='primary'>
          {t('workspace.createWorkspace')}
        </Button>
      </form>
    </Box>
  );
};

export default CreateWorkspaceForm;
