import axios from "axios";

import { baseUrl } from "../api/instance";

const login = async (userData: LoginUser): Promise<any> => {
  const response = await axios.post(`${baseUrl}auth/login`, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = (): void => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
