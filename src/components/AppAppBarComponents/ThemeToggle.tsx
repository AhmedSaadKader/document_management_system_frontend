import React from 'react';
import Switch from '@mui/material/Switch';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box } from '@mui/material';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, toggleColorMode }) => {
  return (
    <Box display='flex' alignItems='center'>
      {mode === 'dark' ? <ModeNightIcon /> : <LightModeIcon />}
      <Switch
        checked={mode === 'dark'}
        onChange={toggleColorMode}
        color='default'
        inputProps={{ 'aria-label': 'toggle dark/light mode' }}
      />
    </Box>
  );
};

export default ThemeToggle;
