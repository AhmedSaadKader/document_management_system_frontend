import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateWorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/v1/workspaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ workspaceName, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create workspace');
      }

      const data = await response.json();
      console.log('Workspace created:', data);
      navigate(`/workspace/${data._id}`); // Redirect to the newly created workspace
    } catch (error) {
      console.error('Error creating workspace:', error);
      setError('Failed to create workspace. Please try again.');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        Create New Workspace
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Workspace Name'
          fullWidth
          margin='normal'
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          required
        />
        <TextField
          label='Description'
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
          Create Workspace
        </Button>
      </form>
    </Container>
  );
};

export default CreateWorkspaceForm;
