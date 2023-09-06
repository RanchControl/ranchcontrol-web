import React from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { FormikProvider, useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useAuthentication } from '@hooks';

import { CustomFormLabel } from '@components/Label';

import logo from '@assets/images/logos/4m.svg';
import { CustomLink, Logo } from '@pages/Login/styles';
import RoutesPath from '@router/routes';
import { errors } from '@utils';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { requestChangePassword } = useAuthentication();

  const requestChangePasswordRequest = useMutation(
    ({ email }: ForgotPasswordFormValues) => requestChangePassword(email),
    {
      onSuccess: () => {
        enqueueSnackbar(
          'Acabamos de te enviar um e-mail com instruções sobre como recuperar sua senha.',
          { variant: 'success' }
        );

        navigate(RoutesPath.auth.login);
      },
      onError: (error: AxiosError<ApiResponse>) => {
        enqueueSnackbar(error.response?.data.body.mensagem, {
          variant: 'error',
        });
      },
    }
  );

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: yup.object({
      email: yup.string().trim().required(errors.required),
    }),
    onSubmit: (values) => {
      requestChangePasswordRequest.mutate(values);
    },
  });

  return (
    <Grid item xs={12} lg={9} xl={6}>
      <Box
        sx={{
          px: 4,
        }}
      >
        <Box display={'flex'} justifyContent={'center'}>
          <Logo src={logo} />
        </Box>
        <Typography fontWeight="700" variant="h2">
          Esqueceu sua senha?
        </Typography>
        <Box display="flex" alignItems="center" mt={2}>
          <Typography color="textSecondary" variant="h6" fontWeight="500">
            Por favor, informe seu e-mail associado a sua conta para que seja
            enviado um código de autorização para troca de senha.
          </Typography>
        </Box>
        <FormikProvider value={formik}>
          <Box
            sx={{
              mt: 4,
            }}
            component={'form'}
            onSubmit={formik.handleSubmit}
          >
            <CustomFormLabel htmlFor="email">E-mail</CustomFormLabel>
            <TextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />

            <LoadingButton
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              loading={requestChangePasswordRequest.isLoading}
              fullWidth
              sx={{
                py: '10px',
                fontSize: '16px',
                marginTop: '16px',
              }}
            >
              Login
            </LoadingButton>
            <Box
              sx={{
                display: {
                  xs: 'block',
                  sm: 'flex',
                  lg: 'flex',
                },
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                mt={2}
              >
                <CustomLink onClick={() => navigate(RoutesPath.auth.root)}>
                  <Typography
                    mt={1}
                    fontWeight="500"
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    sx={{
                      textAlign: 'center',
                      textDecoration: 'none',
                      color: 'secondary.main',
                      cursor: 'pointer',
                    }}
                  >
                    Retornar a página de login
                  </Typography>
                </CustomLink>
              </Box>
            </Box>
          </Box>
        </FormikProvider>
      </Box>
    </Grid>
  );
};

export default ForgotPassword;
