class LocalStorageService {

    adicionarItem = (chave: string, valor: string) => {
        localStorage.setItem(chave, valor);
    }

    obterItem = (chave: string) => {
        return localStorage.getItem(chave);
    }

    removerItem = (chave: string) => {
        localStorage.removeItem(chave);
    }
}

export default LocalStorageService;