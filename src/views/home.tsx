import { useEffect, useState } from "react";
import UsuarioService from "../app/service/usuarioService";
import LocalStorageService from "../app/service/localstorageService";
import { IUsuarioLogado } from "../model/interfaces/usuario.model";


function Home() {
    const localStorageService = new LocalStorageService();
    const usuarioService = UsuarioService();
    const [saldo, setSaldo] = useState<number>();

    useEffect(() => {
        const usuarioLogadoString = localStorageService.obterItem('_usuario_logado');
        if (usuarioLogadoString != null) {
            const usuarioLogado: IUsuarioLogado = JSON.parse(usuarioLogadoString);
            const idNumber = +usuarioLogado.id;
            usuarioService.obterSaldoPorUsuario(idNumber)
                .then((response) => {
                    if (typeof response.data === 'number')
                        setSaldo(response.data);
                }).catch(error => {
                    getErrorMessage({ message: error.message });
                })
        }
    }, []);

    return (
        <div className="jumbotron">
            <h1 className="display-3">Bem vindo!</h1>
            <p className="lead">Esse é seu sistema de finanças.</p>
            <p className="lead">Seu saldo para o mês atual é de R$ {saldo} </p>
            <hr className="my-4" />
            <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg"
                    href="/cadastro-usuarios"
                    role="button"><i className="pi pi-users"></i>
                    Cadastrar Usuário
                </a>
                <a className="btn btn-danger btn-lg"
                    href="/cadastro-lancamentos"
                    role="button"><i className="pi pi-money-bill"></i>
                    Cadastrar Lançamento
                </a>
            </p>
        </div>
    );
}

export default Home;
