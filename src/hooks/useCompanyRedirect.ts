import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserValidation } from './useUserValidation';

export const useCompanyRedirect = () => {
  const navigate = useNavigate();
  const { user, isLoading, hasCompany } = useUserValidation();
  const hasRedirected = useRef(false);

  useEffect(() => {
    // Só executa quando não estiver carregando e tiver dados
    if (!isLoading && user !== null && !hasCompany && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate('/create-company');
    }
  }, [user, isLoading, hasCompany, navigate]);

  return { user, isLoading, hasCompany };
};
