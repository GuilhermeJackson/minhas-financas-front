import LocalStorageService from './localstorageService';

export const AuthService = () => {
    const localStorage = new LocalStorageService();
    const USUARIO_LOGADO = '_usuario_logado'

    function isUsuarioLogado() {
        const usuario: any = localStorage.obterItem(USUARIO_LOGADO); //TODO verificar tipagem de usuario logado
        console.log("ENTRO NA VERIFICAÇÃO DO USUARIO", usuario)
        return usuario; 
    }

    function removerUsuariouAutenticado() {
        localStorage.removerItem(USUARIO_LOGADO)
    }
    return {
        isUsuarioLogado,
        removerUsuariouAutenticado
    }
};

export default AuthService;
