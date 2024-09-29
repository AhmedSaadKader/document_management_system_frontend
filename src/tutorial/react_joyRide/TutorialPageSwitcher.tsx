import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import TutorialPage from './CodeDisplay';
import { TutorialPageProps } from './CodeDisplay';

export interface TutorialPageSwitcherProps {
  pages: TutorialPageProps[];
}

const TutorialPageSwitcher: React.FC<TutorialPageSwitcherProps> = ({
  pages,
}) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedPageIndex(newIndex);
  };

  return (
    <Box sx={{ p: 3 }}>
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
        description={pages[selectedPageIndex].description}
        backend={pages[selectedPageIndex].backend}
        filePath={pages[selectedPageIndex].filePath}
        lineNumber={pages[selectedPageIndex].lineNumber || 1}
      />
      {/* </Paper> */}
    </Box>
  );
};

export default TutorialPageSwitcher;
