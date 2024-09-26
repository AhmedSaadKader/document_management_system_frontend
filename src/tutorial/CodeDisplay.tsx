// import React, { useEffect, useRef } from 'react';
// import * as monaco from 'monaco-editor';

// const CodeDisplay = ({ code }) => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     const editor = monaco.editor.create(editorRef.current, {
//       value: code,
//       language: 'javascript', // Adjust language as needed
//       theme: 'vs-dark', // Customize theme
//       readOnly: true, // Make the code read-only
//     });

//     return () => editor.dispose();
//   }, [code]);

//   return <div ref={editorRef} />;
// };

// export default CodeDisplay;

export {};
