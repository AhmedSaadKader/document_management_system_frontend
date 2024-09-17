import React from 'react';
import Switch from '@mui/material/Switch';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box, IconButton } from '@mui/material';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  toggleColorMode: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, toggleColorMode }) => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton onClick={toggleColorMode} aria-label='toggle dark/light mode'>
        {mode === 'dark' ? <ModeNightIcon /> : <LightModeIcon />}
      </IconButton>
    </Box>
  );
};

export default ThemeToggle;
