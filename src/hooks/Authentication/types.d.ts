interface Login {
  email: string;
  password: string;
}

interface LoginResponse {
  body: ITokens;
}

interface ApiResponse {
  body: {
    mensagem: string;
  };
}

interface SystemManagersQuery extends QueryParams {
  role?: string;
}
