import React from 'react';

import { Box, Grid } from '@mui/material';

import img1 from '../../../assets/images/backgrounds/login-bg2.svg';
import { Image } from './styles';

interface AuthBaseProps {
  children: React.ReactNode;
}

const AuthBase: React.FC<AuthBaseProps> = ({ children }) => {
  return (
    <Grid container sx={{ height: '100vh', justifyContent: 'center' }}>
      <Grid
        item
        xs={12}
        sm={12}
        lg={6}
        sx={{
          background: (theme) =>
            `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
            display: { xs: 'none', lg: 'block' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="12px"
            sx={{
              position: {
                xs: 'relative',
              },
              height: { xs: 'auto', lg: '100vh' },
              right: { xs: 'auto', lg: 'auto' },
              margin: '0 auto',
              padding: '12px 12px 0 12px',
              backgroundColor: '#F1FBFE',
            }}
          >
            <Image src={img1} alt="bg" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} lg={6} display="flex" alignItems="center">
        <Grid container spacing={0} display="flex" justifyContent="center">
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthBase;
