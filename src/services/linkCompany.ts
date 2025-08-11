import apiClient from './api';

export interface LinkCompanyRequest {
  company_id: string;
}

export interface LinkCompanyResponse {
  message: string;
}

export const linkCompany = async (companyId: string): Promise<LinkCompanyResponse> => {
  try {
    const response = await apiClient.post<LinkCompanyResponse>('users/link-company', {
      company_id: companyId
    });
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Erro ao vincular usuário à empresa.';
    throw new Error(errorMessage);
  }
};
