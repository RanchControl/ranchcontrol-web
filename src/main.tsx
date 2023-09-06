import React from 'react';

import isPropValid from '@emotion/is-prop-valid';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { StyleSheetManager } from 'styled-components';

import { ApiProvider } from '@contexts/Api';
import { AuthProvider } from '@contexts/Auth';

import Router from '@router';

import { BuildTheme } from './theme/Theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = BuildTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            preventDuplicate
            maxSnack={3}
          >
            <ApiProvider>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </ApiProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </StyleSheetManager>
    </ThemeProvider>
  </React.StrictMode>
);
