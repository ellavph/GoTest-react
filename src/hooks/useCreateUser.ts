import { useState } from 'react';
import { createUser } from '@/services/createUser';
import type { User } from '@/services/createUser';

export const useCreateUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (!/[A-Z]/.test(password)) {
      errors.push('A senha deve conter pelo menos uma letra maiúscula');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('A senha deve conter pelo menos um caractere especial');
    }
    
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    // Validações básicas
    if (!formData.name.trim()) errors.push('Nome é obrigatório');
    if (!formData.username.trim()) errors.push('Username é obrigatório');
    if (!formData.email.trim()) errors.push('Email é obrigatório');
    
    // Validações de senha
    if (formData.password !== formData.confirmPassword) {
      errors.push('As senhas não coincidem');
    }
    
    const passwordErrors = validatePassword(formData.password);
    if (passwordErrors.length > 0) {
      errors.push(...passwordErrors);
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar formulário antes de enviar
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '));
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Criar objeto User para enviar para API (sem confirmPassword)
      const userData: User = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        username: formData.username
      };
      
      const newUser = await createUser(userData);
      
      setSuccess(`Usuário ${newUser.user.username} criado com sucesso!`);
      
      // Limpar formulário após sucesso
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: ''
      });

      // Redirecionar para login após 2 segundos
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      username: ''
    });
    setError('');
    setSuccess('');
  };

  const goBack = () => {
    window.history.back();
  };

  return {
    // Estados
    formData,
    isLoading,
    error,
    success,
    
    // Funções
    handleInputChange,
    handleSubmit,
    resetForm,
    goBack
  };
};
