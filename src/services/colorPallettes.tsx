import { createTheme, PaletteMode } from '@mui/material';

const palettes = {
  blue: {
    light: {
      palette: {
        mode: 'light' as PaletteMode,
        primary: { main: '#1976d2' },
        secondary: { main: '#f50057' },
        background: { default: '#f5f5f5' },
      },
    },
    dark: {
      palette: {
        mode: 'dark' as PaletteMode,
        primary: { main: '#90caf9' },
        secondary: { main: '#f50057' },
        background: { default: '#121212' },
      },
    },
  },
  green: {
    light: {
      palette: {
        mode: 'light' as PaletteMode,
        primary: { main: '#4caf50' },
        secondary: { main: '#ff5722' },
        background: { default: '#e8f5e9' },
      },
    },
    dark: {
      palette: {
        mode: 'dark' as PaletteMode,
        primary: { main: '#66bb6a' },
        secondary: { main: '#ff5722' },
        background: { default: '#1b5e20' },
      },
    },
  },
  // Add more palettes as needed...
};

// Helper to create a theme based on the selected palette and mode
export const createAppTheme = (
  paletteKey: keyof typeof palettes,
  mode: PaletteMode
) => createTheme(palettes[paletteKey][mode]);

export { palettes };
