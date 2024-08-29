import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

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
  return (
    <Box sx={{ p: 3 }}>
      {/* Search Input */}
      <TextField
        label='Search Documents'
        variant='outlined'
        fullWidth
        margin='normal'
        value={search}
        onChange={(e) => updateSearchFilters(e, 'search')}
      />

      {/* Sort and Order */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => updateSearchFilters(e, 'sort')}
            label='Sort By'
          >
            <MenuItem value=''>None</MenuItem>
            <MenuItem value='documentName'>Document Name</MenuItem>
            <MenuItem value='createdAt'>Created At</MenuItem>
            <MenuItem value='updatedAt'>Updated At</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant='outlined'>
          <InputLabel>Order</InputLabel>
          <Select
            value={order}
            onChange={(e) => updateSearchFilters(e, 'order')}
            label='Order'
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default DocumentSearchFilter;
