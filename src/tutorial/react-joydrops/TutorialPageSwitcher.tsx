import React, { useEffect, useState } from 'react';
import { Box, Typography, Tabs, Tab, Paper } from '@mui/material';
import TutorialPage from '../driverjs/CodeDisplay';

interface TutorialPageSwitcherProps {
  pages: {
    title: string;
    backend: boolean;
    filePath: string;
  }[];
}

const TutorialPageSwitcher: React.FC<TutorialPageSwitcherProps> = ({
  pages,
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedPageIndex(newIndex);
  };

  useEffect(() => {
    console.log(pages[selectedPageIndex].filePath);
  }, [selectedPageIndex]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Tutorial Page Switcher
      </Typography>

      {/* Tabs for switching between tutorial pages */}
      <Tabs
        value={selectedPageIndex}
        onChange={handleTabChange}
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        {pages.map((page, index) => (
          <Tab key={index} label={page.title} />
        ))}
      </Tabs>

      {/* Main content area where the selected TutorialPage is displayed */}
      {/* <Paper elevation={3} sx={{ p: 2, mt: 2 }}> */}
      <TutorialPage
        title={pages[selectedPageIndex].title}
        backend={pages[selectedPageIndex].backend}
        filePath={pages[selectedPageIndex].filePath}
      />
      {/* </Paper> */}
    </Box>
  );
};

export default TutorialPageSwitcher;
