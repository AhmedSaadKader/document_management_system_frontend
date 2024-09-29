import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import GithubApiClient from '../../services/GithubAPIClient';

export interface TutorialPageProps {
  title: string;
  description?: string[];
  backend: boolean;
  filePath: string;
  lineNumber?: number;
}

const TutorialPage: React.FC<TutorialPageProps> = ({
  title,
  description,
  backend,
  filePath,
  lineNumber = 50,
}) => {
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const theme = useTheme();
  const editorRef = useRef<EditorView | null>(null);

  useEffect(() => {
    fetchFileContent(filePath);
  }, [filePath]);

  useEffect(() => {
    if (!isLoading && editorRef.current) {
      setTimeout(() => {
        scrollToLine(lineNumber);
      }, 100); // Small delay to ensure editor is ready
    }
  }, [isLoading, lineNumber]);

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

  const scrollToLine = (line: number) => {
    if (!editorRef.current) return;

    if (editorRef.current) {
      const view = editorRef.current;
      const pos = view.state.doc.line(line).from;
      view.dispatch({
        effects: EditorView.scrollIntoView(pos, { y: 'center' }),
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {title}
      </Typography>
      {description != undefined ? (
        description.map((item, index) => (
          <Typography key={index} gutterBottom>
            {item}
          </Typography>
        ))
      ) : (
        <></>
      )}
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
            height='300px'
            theme='dark'
            extensions={[javascript({ typescript: true })]}
            editable={false}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: '14px',
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
            onCreateEditor={(view) => {
              editorRef.current = view;
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default TutorialPage;
