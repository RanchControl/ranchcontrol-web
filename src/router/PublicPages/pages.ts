import ConfirmEmail from '@pages/ConfirmEmail';
import ForgotPassword from '@pages/ForgotPassword';
import Login from '@pages/Login';
import RoutesPath from '@router/routes';

export default [
  {
    route: RoutesPath.auth.login,
    component: Login,
  },
  {
    route: RoutesPath.auth.forgotPassword,
    component: ForgotPassword,
  },
  {
    route: RoutesPath.auth.confirmEmail,
    component: ConfirmEmail,
  },
];
