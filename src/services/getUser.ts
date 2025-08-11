import apiClient from './api';


export interface UserResponse {
    email: string,
    id: string,
    username: string,
    companyId?: string | null
}

// Interface para a resposta real da API
interface ApiResponse {
    user: UserResponse
}


export const getUser = async (): Promise<UserResponse> => {
  try {
    const response = await apiClient.get<ApiResponse>('users/profile');

    // A API retorna {user: {...}}, então precisamos acessar response.data.user
    const userData = response.data.user;


    return userData;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Ocorreu um erro desconhecido.';
    throw new Error(errorMessage);
  }
};