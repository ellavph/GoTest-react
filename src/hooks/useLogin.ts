import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";


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
            await loginUser({ username, password })
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