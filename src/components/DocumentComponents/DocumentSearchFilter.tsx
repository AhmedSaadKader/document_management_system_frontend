import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DocumentSearchFilterProps {
  search: string;
  sortBy: string;
  order: string;
  updateSearchFilters: (
    e: { target: { value: React.SetStateAction<string> } },
    state: string
  ) => void;
}

const DocumentSearchFilter = ({
  search,
  sortBy,
  order,
  updateSearchFilters,
}: DocumentSearchFilterProps) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ p: 3 }} id='search-div'>
      <TextField
        label={t('document.searchDocuments')}
        variant='outlined'
        fullWidth
        margin='normal'
        value={search}
        onChange={(e) => updateSearchFilters(e, 'search')}
      />

      {/* Sort and Order */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>{t('document.sort')}</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => updateSearchFilters(e, 'sort')}
            label={t('document.sort')}
          >
            <MenuItem value=''>{t('document.none')}</MenuItem>
            <MenuItem value='documentName'>
              {t('document.documentName')}
            </MenuItem>
            <MenuItem value='createdAt'>{t('document.createdAt')}</MenuItem>
            <MenuItem value='updatedAt'>{t('document.updatedAt')}</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant='outlined'>
          <InputLabel>{t('document.order')}</InputLabel>
          <Select
            value={order}
            onChange={(e) => updateSearchFilters(e, 'order')}
            label={t('document.order')}
          >
            <MenuItem value='asc'>{t('document.ascending')}</MenuItem>
            <MenuItem value='desc'>{t('document.descending')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default DocumentSearchFilter;
