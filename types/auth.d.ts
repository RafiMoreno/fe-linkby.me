interface LoginSubmitPayload {
  username: string;
  password: string;
}

interface LogInResponse {
  token: string;
}

interface ValidateResponse {
  message: string;
  username?: string;
}
