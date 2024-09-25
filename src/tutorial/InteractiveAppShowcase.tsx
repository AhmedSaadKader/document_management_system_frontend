// import React, { useState } from 'react';
// import {
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Typography,
//   Box,
// } from '@mui/material';
// import { CodeBlock, dracula } from 'react-code-blocks';

// interface InteractiveAppShowcaseProps {
//   appScreenshot: string;
// }

// const InteractiveAppShowcase: React.FC<InteractiveAppShowcaseProps> = ({
//   appScreenshot,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [highlightedElement, setHighlightedElement] = useState(null);

//   const showcaseSteps = [
//     {
//       title: 'Dashboard Overview',
//       description:
//         "The dashboard provides a quick overview of the user's workspaces and recent activities.",
//       techUsed: 'React, Material-UI',
//       codeSnippet: `
// const Dashboard = () => {
//   const { t } = useTranslation();

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <Box component='main' sx={{ flexGrow: 1, p: 3, width: 'calc(100% - 240px)' }}>
//         <Typography variant='h5' color='textSecondary' gutterBottom>
//           {t('dashboard.greeting')} {localStorage.getItem('first_name')}
//         </Typography>
//         <Typography variant='h4' gutterBottom>
//           {t('dashboard.title')}
//         </Typography>
//         <Grid item xs={12} sm={6} md={4}>
//           <PublicWorkspaces />
//         </Grid>
//       </Box>
//     </Box>
//   );
// };
//       `,
//     },
//     // Add more steps here
//   ];

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const handleNext = () =>
//     setCurrentStep((prev) => Math.min(prev + 1, showcaseSteps.length - 1));
//   const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

//   const handleElementClick = (element) => {
//     setHighlightedElement(element);
//     setOpen(true);
//   };

//   return (
//     <Box>
//       <Button onClick={handleOpen}>Start Tutorial</Button>
//       <Box position='relative' width='100%' height='auto'>
//         <img
//           src={appScreenshot}
//           alt='Application Screenshot'
//           style={{ width: '100%', height: 'auto' }}
//         />
//         {/* Add clickable areas here */}
//       </Box>
//       <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
//         <DialogTitle>{showcaseSteps[currentStep].title}</DialogTitle>
//         <DialogContent>
//           <Typography>{showcaseSteps[currentStep].description}</Typography>
//           <Typography variant='h6' mt={2}>
//             Technologies Used:
//           </Typography>
//           <Typography>{showcaseSteps[currentStep].techUsed}</Typography>
//           <Typography variant='h6' mt={2}>
//             Code Snippet:
//           </Typography>
//           <CodeBlock
//             text={showcaseSteps[currentStep].codeSnippet}
//             language='javascript'
//             showLineNumbers={true}
//             theme={dracula}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handlePrev} disabled={currentStep === 0}>
//             Previous
//           </Button>
//           <Button
//             onClick={handleNext}
//             disabled={currentStep === showcaseSteps.length - 1}
//           >
//             Next
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default InteractiveAppShowcase;
export {};
