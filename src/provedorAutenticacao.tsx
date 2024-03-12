import { createContext, useState } from 'react';
import AuthService from './app/service/authService';

interface AuthContextProps {
    usuarioAutenticado: any;
    isAutenticado: boolean;
    iniciarSessao: (usuario: any) => void;
    encerraSessao: () => void;
}

interface AuthProviderProps {
    children: any;
}

const AuthContext = createContext<AuthContextProps | null>(null);
const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider

function ProvedorAutenticacao({ children }: AuthProviderProps) {
    let authService = AuthService();
    const [usuarioAutenticado, setUsuarioAutenticado] = useState<any>('');
    const [isAutenticado, setIsAutenticado] = useState<boolean>(true);

    function iniciarSessao(usuario: any) {
        authService.logar(usuario);
        setUsuarioAutenticado(usuario)
        setIsAutenticado(true);
    }

    function encerraSessao() {
        authService.removerUsuariouAutenticado();
        setUsuarioAutenticado(null)
        setIsAutenticado(false)
    }

    const contextValue = {
        usuarioAutenticado: usuarioAutenticado,
        isAutenticado: isAutenticado,
        iniciarSessao: iniciarSessao,
        encerraSessao: encerraSessao
    }

    return (
        <AuthProvider value={contextValue}>
            {children}
        </AuthProvider>
    );
}

export { AuthContext, AuthProvider, AuthConsumer, ProvedorAutenticacao };
