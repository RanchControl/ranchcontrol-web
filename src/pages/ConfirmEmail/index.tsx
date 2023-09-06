import React, { useState } from 'react';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '@contexts/Auth';
import { useAuthentication } from '@hooks';

import RoutesPath from '@router/routes';

const ConfirmEmail: React.FC = () => {
  const [message, setMessage] = useState('E-mail confirmado com sucesso');
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const { logout, userInfo } = useAuth();
  const { confirmEmail } = useAuthentication();
  const navigate = useNavigate();

  const confirmEmailRequest = useQuery(
    [],
    () => {
      if (userInfo) {
        logout?.();
      }

      return confirmEmail(
        searchParams.get('client_id')!,
        searchParams.get('user_name')!,
        searchParams.get('confirmation_code')!
      );
    },
    {
      onSuccess: () => {
        setMessage('E-mail confirmado com sucesso');
      },
      onError: () => {
        setMessage(
          'Não foi possível confirmar o e-mail, por favor tente novamente'
        );
        setError(true);
      },
    }
  );
  return (
    <Grid item xs={12} lg={9} xl={6}>
      {confirmEmailRequest.isLoading ? (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Box
          sx={{
            p: 4,
          }}
        >
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'}>
            <Typography variant="h2" fontWeight="700" marginRight={2}>
              {message}
            </Typography>
            {error ? (
              <ErrorIcon color="error" />
            ) : (
              <CheckCircleIcon color="success" />
            )}
          </Box>

          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                pt: '10px',
                pb: '10px',
                mt: 4,
              }}
              onClick={() => navigate(RoutesPath.auth.root)}
            >
              Voltar ao login
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default ConfirmEmail;
