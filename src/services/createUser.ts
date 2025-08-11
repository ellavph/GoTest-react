import apiClient from './api';

export interface User {
    email: string,
    password: string,
    name: string,
    username: string
}

export interface UserResponse {
  message: string;
  user: Omit<User, 'password' | 'name'> & { id: string };
}

export const createUser = async (user: User): Promise<UserResponse> => {
  try {
    const response = await apiClient.post<UserResponse>('auth/register', user);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Ocorreu um erro desconhecido.';
    throw new Error(errorMessage);
  }
};