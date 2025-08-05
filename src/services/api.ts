import axios from 'axios';

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

// 4. Exportamos a instância configurada para ser usada em outros lugares.
export default apiClient;