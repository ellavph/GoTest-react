import axios from 'axios';
import tokenService from './tokenService';

// 1. Criamos uma "instância" do Axios.
//    Isso nos permite ter uma configuração centralizada para todas as chamadas.
const apiClient = axios.create({
  // 2. Definimos a URL base de todas as nossas requisições.
  //    Agora não precisamos mais digitar 'http://localhost:8080' toda vez.
  baseURL: 'http://localhost:8080/api/',

  // 3. Podemos definir headers padrão que irão em todas as requisições.
  headers: {
    'Content-Type': 'application/json',
  },
});

// 4. Interceptor para adicionar automaticamente o token em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = tokenService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 5. Interceptor de resposta para tratar erros de autenticação automaticamente
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se der erro 401 (não autorizado), redireciona para login
    if (error.response?.status === 401) {
      tokenService.removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 6. Exportamos a instância configurada para ser usada em outros lugares.
export default apiClient;