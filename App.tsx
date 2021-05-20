import React from 'react';
import Routes from './routes'
import { ThemeProvider } from '@emotion/react'

export interface Theme {
  color: string,
  backgroundColor: string
}

const theme: Theme = {
  color: 'hotpink',
  backgroundColor: 'purple'
}


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

