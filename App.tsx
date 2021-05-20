import React from 'react';
import Routes from './routes'
import { ThemeProvider } from '@emotion/react'

const theme = {
  pink: '#DE006F',
  purple: '#3C2EDB',
  cyan: '#3FF2E3',
  green: '#73DB2E',
  yellow: '#F9C534'
}


export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

