import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { enqueueSnackbar } from 'notistack';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { useAuthentication } from '@hooks';

import SplashScreen from '@components/SplashScreen';

import { useApi } from './Api';

interface AuthContextValues {
  userInfo?: UserInfo;
  authorized: boolean;
  updateUserInfo: () => void;
  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoadingInitialValues, setIsLoadingInitialValues] = useState(true);
  const [accessToken, setAccessToken] = useState<string>();

  const { performLogin, getProfile } = useAuthentication();
  const { addInterceptors, cleanInterceptors } = useApi();

  const queryClient = useQueryClient();

  const fetchUserInfo = useQuery('userInfo', getProfile, {
    onError: () => {
      enqueueSnackbar('Não foi possível obter os dados do usuário', {
        variant: 'error',
      });
      localStorage.removeItem('tokens');
    },
    onSettled: () => setIsLoadingInitialValues(false),
    staleTime: Infinity,
    enabled: !!accessToken,
  });

  const requestLogin = useMutation(
    ({ email, password }: Login) => performLogin(email, password),
    {
      onSuccess: (data) => {
        localStorage.setItem('tokens', JSON.stringify(data.body));

        setAccessToken(data.body.token);
        addInterceptors(data.body, logout);
      },
    }
  );

  const logout = useCallback(async () => {
    cleanInterceptors();

    localStorage.removeItem('tokens');
    setAccessToken(undefined);

    queryClient.setQueryData('userInfo', undefined);
  }, [cleanInterceptors, queryClient]);

  const login = useCallback(
    async (email: string, password: string) => {
      cleanInterceptors();
      return requestLogin.mutateAsync({ email, password });
    },
    [cleanInterceptors, requestLogin]
  );

  useEffect(() => {
    if (accessToken) {
      return;
    }

    const tokens = localStorage.getItem('tokens');

    if (tokens) {
      const parsedTokens: ITokens = JSON.parse(tokens);

      addInterceptors(parsedTokens, logout);

      setAccessToken(parsedTokens.token);
    } else {
      setIsLoadingInitialValues(false);
    }
  }, [accessToken, addInterceptors, logout]);

  return (
    <AuthContext.Provider
      value={{
        userInfo: queryClient.getQueryData('userInfo'),
        authorized: !!fetchUserInfo.data,
        updateUserInfo: fetchUserInfo.refetch,
        login,
        logout,
      }}
    >
      {isLoadingInitialValues ? <SplashScreen /> : children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
