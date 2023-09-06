import React, {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from 'react';

import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useSnackbar } from 'notistack';

interface IRequestConfig extends AxiosRequestConfig {
  method: Method;
  url: string;
}

interface IApiContextValues {
  request: <Type>(config: IRequestConfig) => Promise<AxiosResponse<Type>>;
  addInterceptors: (tokens: ITokens, onUnauthorized: () => any) => void;
  cleanInterceptors: () => void;
}

interface IInterceptors {
  request: number;
  response: number;
}

const ApiContext = createContext<IApiContextValues>({} as IApiContextValues);

interface IApiProviderProps {
  children: React.ReactNode;
}

type OnUnauthorizedFunction = () => Promise<void> | void;

const ApiProvider: React.FC<IApiProviderProps> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [interceptors, setInterceptors] = useState<IInterceptors>();

  const apiInstance = useMemo(
    () =>
      axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      }),
    []
  );

  const setAuthorizationHeader = useCallback(
    (tokens: ITokens) => {
      return apiInstance?.interceptors.request.use((config) => {
        if (tokens && config.headers) {
          config.headers.authorization = `${tokens.token}`;
        }

        return config;
      });
    },
    [apiInstance?.interceptors.request]
  );

  const handleUnauthorized = useCallback(
    (onUnauthorized: OnUnauthorizedFunction) => {
      return apiInstance?.interceptors.response.use(
        (config) => config,
        async (responseError) => {
          if (responseError?.response?.status === 401) {
            await onUnauthorized();
            enqueueSnackbar('Sua sessão expirou. Por favor logue novamente.', {
              variant: 'info',
            });
          }
          return Promise.reject(responseError);
        }
      );
    },
    [apiInstance?.interceptors.response, enqueueSnackbar]
  );

  const addInterceptors = useCallback(
    (tokens: ITokens, onUnauthorized: OnUnauthorizedFunction) => {
      const newRequestInterceptor = setAuthorizationHeader(tokens);
      const newResponseInterceptor = handleUnauthorized(onUnauthorized);
      setInterceptors({
        request: newRequestInterceptor,
        response: newResponseInterceptor,
      });
    },
    [setAuthorizationHeader, handleUnauthorized]
  );

  const cleanInterceptors = useCallback(() => {
    if (interceptors !== undefined) {
      apiInstance?.interceptors.request.eject(interceptors.request);
      apiInstance?.interceptors.response.eject(interceptors.response);
    }
  }, [
    apiInstance?.interceptors.request,
    apiInstance?.interceptors.response,
    interceptors,
  ]);

  return (
    <ApiContext.Provider
      value={{
        request: apiInstance.request,
        addInterceptors,
        cleanInterceptors,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const context = useContext(ApiContext);
  return context;
};

export { ApiProvider, useApi };
