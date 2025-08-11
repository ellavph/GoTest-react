import apiClient from './api';

export interface CreateCompanyRequest {
  address: string;
  email: string;
  name: string;
  phone: string;
}

export interface Company {
  address: string;
  email: string;
  id: string;
  name: string;
  phone: string;
}

export interface CreateCompanyResponse {
  company: Company;
  message: string;
}

export const createCompany = async (companyData: CreateCompanyRequest): Promise<CreateCompanyResponse> => {
  try {
    const response = await apiClient.post<CreateCompanyResponse>('companies', companyData);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Erro ao criar empresa.';
    throw new Error(errorMessage);
  }
};
