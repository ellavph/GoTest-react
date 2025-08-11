import { useEffect, useState, useRef } from 'react';
import { getUser } from '@/services/getUser';
import type { UserResponse } from '@/services/getUser';

export const useUserValidation = () => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    // Evitar requisições simultâneas
    if (isRequestInProgress.current) {
      return;
    }
    
    const validateUser = async () => {
      try {
        isRequestInProgress.current = true;
        setIsLoading(true);
        const userData = await getUser();
        setUser(userData);
      } catch (error: any) {
        setError(error.message);
        // Se der erro, o interceptor da API já cuida do redirecionamento
      } finally {
        setIsLoading(false);
        isRequestInProgress.current = false;
      }
    };

    validateUser();
  }, []); // Executa apenas uma vez na montagem

  return {
    user,
    isLoading,
    error,
    hasCompany: !!user?.companyId,
    companyId: user?.companyId
  };
};
