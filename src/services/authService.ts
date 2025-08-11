
import apiClient from './api';
import tokenService from './tokenService';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
}

export const loginUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('auth/login', credentials);
    const token = response.data.access_token;
    
    if (token) {
      tokenService.saveToken(token);
    } else {
      // Se por algum motivo o token não vier na resposta de sucesso
      throw new Error("Token não encontrado na resposta.");
    }

    return response.data;

  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Ocorreu um erro desconhecido.";
    throw new Error(errorMessage);
  }
};

export const logoutUser = (): void => {
  tokenService.removeToken();
};
