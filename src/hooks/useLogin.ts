import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function useLogin() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async() => {
        setIsLoading(true)
        setError(null)

        try {

            // Se chegou até aqui, o login foi bem-sucedido
            // Token já foi salvo no localStorage pelo authService
            console.log('Login realizado com sucesso!')
            navigate('/home')
        } catch (err: any) {
            setError(err.message || 'Erro ao tentar fazer login.'); 
        } finally {
            setIsLoading(false)
        };
    };

        return {
            username,
            setUsername,
            password,
            setPassword,
            isLoading,
            error,
            handleLogin
        }
}