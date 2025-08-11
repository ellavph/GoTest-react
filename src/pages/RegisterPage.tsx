import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Terminal, Zap, Shield, Loader2, ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { useCreateUser } from '@/hooks/useCreateUser';

export default function RegisterPage() {
  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleSubmit,
    goBack
  } = useCreateUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back button */}
        <button
          onClick={goBack}
          className="absolute -top-16 left-0 flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </button>

        {/* Logo/Brand section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">API Test Hub</h1>
          <p className="text-slate-400">Crie sua conta para começar</p>
        </div>

        {/* Register Card */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">Criar Conta</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Preencha os dados para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Exibir erro se houver */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Exibir sucesso se houver */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                  <p className="text-green-400 text-sm text-center">{success}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Nome completo
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-white font-medium">
                  Nome de usuário
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Digite seu username"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
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
                  placeholder="Digite seu email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Senha
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                
                {/* Validações de senha em tempo real */}
                {formData.password && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`w-4 h-4 ${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`} />
                      <span className={`text-xs ${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-slate-400'}`}>
                        Pelo menos 1 letra maiúscula
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className={`w-4 h-4 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-400' : 'text-slate-500'}`} />
                      <span className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-400' : 'text-slate-400'}`}>
                        Pelo menos 1 caractere especial
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white font-medium">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirme sua senha"
                  className={`bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:ring-purple-400/20 ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-400 focus:border-red-400'
                      : 'focus:border-purple-400'
                  }`}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
                
                {/* Indicador de senhas iguais */}
                {formData.confirmPassword && (
                  <div className="flex items-center space-x-2 mt-2">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Senhas coincidem</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400">Senhas não coincidem</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar Conta"}
              </Button>
            </form>

            {/* Features highlight */}
            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-xs text-slate-300">Testes Rápidos</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-xs text-slate-300">Monitoramento</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Já tem uma conta?{" "}
            <button 
              onClick={goBack}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Fazer login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
} 