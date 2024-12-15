import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Divider, Grid } from '@mui/material';
import { Workspace } from '../../models/Workspace';
import { useTranslation } from 'react-i18next';

interface WorkspaceDetailsModalProps {
  workspace: Workspace;
}

const WorkspaceDetailsModal: React.FC<WorkspaceDetailsModalProps> = ({
  workspace,
}) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        {t('workspace.details')}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'background.paper',
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
            borderRadius: 2,
          }}
        >
          <Typography variant='h5' sx={{ mb: 2 }}>
            {t('workspace.details')}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.name')}:
              </Typography>
              <Typography
                variant='body1'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {workspace.workspaceName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.owner')}:
              </Typography>
              <Typography
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                variant='body1'
              >
                {workspace.userEmail}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.description')}:
              </Typography>
              <Typography
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                variant='body1'
              >
                {workspace.description || t('workspace.noDescription')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.public')}:
              </Typography>
              <Typography
                variant='body1'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
              >
                {workspace.isPublic ? t('workspace.yes') : t('workspace.no')}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.createdAt')}:
              </Typography>
              <Typography variant='body1'>
                {new Date(workspace.createdAt as string).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
                {t('workspace.updatedAt')}:
              </Typography>
              <Typography variant='body1'>
                {new Date(workspace.updatedAt as string).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mt: 2, mb: 2 }} />

          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            {t('workspace.permissions')}:
          </Typography>
          {workspace.permissions.map((perm: any) => (
            <Typography key={perm.userEmail} variant='body2' sx={{ mt: 1 }}>
              {`${perm.userEmail} - ${t(`workspace.${perm.permission}`)}`}
            </Typography>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant='contained' onClick={() => setOpen(false)}>
              {t('workspace.close')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default WorkspaceDetailsModal;
