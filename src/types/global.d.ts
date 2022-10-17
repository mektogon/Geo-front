interface LoginUser {
  username: string | null | undefined;
  password: string;
}

interface DisplayUser {
  username: string;
  token: string;
}
