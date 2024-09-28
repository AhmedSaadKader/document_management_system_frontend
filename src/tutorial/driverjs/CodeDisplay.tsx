import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import GithubApiClient from '../../services/GithubAPIClient';

interface TutorialPageProps {
  title: string;
  backend: boolean;
  filePath: string;
}

const TutorialPage: React.FC<TutorialPageProps> = ({
  title,
  backend,
  filePath,
}) => {
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFileContent(filePath);
    console.log('x');
  }, [filePath]);

  const fetchFileContent = async (filePath: string) => {
    setIsLoading(true);
    try {
      const content = backend
        ? await GithubApiClient.fetchFileContentBackend(filePath)
        : await GithubApiClient.fetchFileContentFrontend(filePath);
      setFileContent(content);
    } catch (error) {
      console.error('Error fetching file content:', error);
      setFileContent('Error fetching file content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        {isLoading ? (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='400px'
          >
            <CircularProgress />
          </Box>
        ) : (
          <CodeMirror
            value={fileContent}
            height='400px'
            extensions={[javascript({ typescript: true })]}
            editable={false}
          />
        )}
      </Paper>
    </Box>
  );
};

export default TutorialPage;
