import LocalStorageService from './localstorageService';

export const AuthService = () => {
    const localStorage = new LocalStorageService();
    const USUARIO_LOGADO = '_usuario_logado'

    function isUsuarioLogado() {
        const usuario: any = localStorage.obterItem(USUARIO_LOGADO); //TODO verificar tipagem de usuario logado
        if(usuario)
        return usuario;
    }

    function removerUsuariouAutenticado() {
        localStorage.removerItem(USUARIO_LOGADO)
    }

    function logar(usuario: any) {
        localStorage.adicionarItem(USUARIO_LOGADO, JSON.stringify(usuario))
    }

    function obterUsuarioAutenticado() {
        return localStorage.obterItem(USUARIO_LOGADO)
    }
    return {
        isUsuarioLogado,
        removerUsuariouAutenticado,
        logar,
        obterUsuarioAutenticado
    }
};

export default AuthService;
