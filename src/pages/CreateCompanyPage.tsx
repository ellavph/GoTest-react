import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompany } from '@/services/createCompany';
import { linkCompany } from '@/services/linkCompany';
import { getUser } from '@/services/getUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Terminal, Building2, ArrowLeft } from 'lucide-react';

export const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Nome da empresa é obrigatório');
    if (!formData.email.trim()) errors.push('Email é obrigatório');
    if (!formData.phone.trim()) errors.push('Telefone é obrigatório');
    if (!formData.address.trim()) errors.push('Endereço é obrigatório');
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Email inválido');
    }
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '));
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Criar a empresa
      const companyResponse = await createCompany(formData);
      
      // 2. Vincular o usuário à empresa
      await linkCompany(companyResponse.company.id);
      
      // 3. Verificar se o usuário agora tem companyId
      const updatedUser = await getUser();
      
      if (updatedUser.companyId) {
        setSuccess('Empresa criada e vinculada com sucesso! Redirecionando...');
        
        // Redirecionar para Home após 2 segundos
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError('Empresa criada mas não foi possível vincular ao usuário. Tente novamente.');
      }

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Criar Empresa</h1>
          <p className="text-slate-400">Configure os dados da sua empresa para continuar</p>
        </div>

        {/* Form Card */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">Dados da Empresa</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Preencha as informações para criar sua empresa
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-400 text-sm text-center">{success}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Nome da Empresa
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Digite o nome da empresa"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@empresa.com"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-medium">
                  Telefone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(11) 99999-9999"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white font-medium">
                  Endereço
                </Label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Digite o endereço completo"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goBack}
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Criando...' : 'Criar Empresa'}
                </Button>
              </div>
            </form>

            {/* Features highlight */}
            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs text-slate-300">Dashboard Completo</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-slate-300">Gestão Empresarial</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
