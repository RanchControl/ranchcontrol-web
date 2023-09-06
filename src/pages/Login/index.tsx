import React from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useToggle } from 'ahooks';
import { AxiosError } from 'axios';
import { FormikProvider, useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { minLength } from 'utils/errors';
import * as yup from 'yup';

import { useAuth } from '@contexts/Auth';

import { CustomFormLabel } from '@components/Label';

import logo from '@assets/images/logos/4m.svg';
import RoutesPath from '@router/routes';
import { errors } from '@utils';

import { CustomLink, Logo } from './styles';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [state, { toggle }] = useToggle();
  const navigate = useNavigate();

  const onLoginFormSubmit = useMutation(
    async ({ email, password }: Login) => {
      if (login) {
        return await login(email, password);
      }
    },
    {
      onError: (error: AxiosError<ApiResponse>) => {
        enqueueSnackbar(error.response?.data.body.mensagem, {
          variant: 'error',
        });
      },
      onSuccess: () => {
        enqueueSnackbar('Login realizado com sucesso', { variant: 'success' });
      },
    }
  );

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup.object({
      email: yup.string().email(errors.email).trim().required(errors.required),
      password: yup.string().min(8, minLength(8)).required(errors.required),
    }),
    onSubmit: (values) => {
      onLoginFormSubmit.mutate(values);
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
          Bem vindo ao ISF-SUS!
        </Typography>
        <FormikProvider value={formik}>
          <Box
            sx={{
              mt: 2,
            }}
            component={'form'}
            onSubmit={formik.handleSubmit}
          >
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
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
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <TextField
              fullWidth
              id="password"
              name="password"
              type={state ? ' text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggle}
                      edge="end"
                    >
                      {state ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box
              sx={{
                display: {
                  xs: 'block',
                  sm: 'flex',
                  lg: 'flex',
                },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  ml: 'auto',
                }}
              >
                <CustomLink
                  onClick={() => navigate(RoutesPath.auth.forgotPassword)}
                >
                  <Typography
                    mt={1}
                    fontWeight="500"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      mb: '16px',
                      color: 'primary.main',
                      cursor: 'pointer',
                    }}
                  >
                    Esqueceu a senha?
                  </Typography>
                </CustomLink>
              </Box>
            </Box>

            <LoadingButton
              color="secondary"
              variant="contained"
              size="large"
              type="submit"
              loading={onLoginFormSubmit.isLoading}
              fullWidth
              sx={{
                py: '10px',
                fontSize: '16px',
              }}
            >
              Login
            </LoadingButton>
          </Box>
        </FormikProvider>
      </Box>
    </Grid>
  );
};

export default Login;
