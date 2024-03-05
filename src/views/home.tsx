import { useContext, useEffect, useState } from "react";
import UsuarioService from "../app/service/usuarioService";
import { IUsuarioLogado } from "../model/interfaces/usuario.model";
import { AuthContext } from "../provedorAutenticacao";

function Home() {
    const usuarioService = UsuarioService();
    const [saldo, setSaldo] = useState<number>();
    const { usuarioAutenticado } = useContext(AuthContext as React.Context<any>);

    useEffect(() => {
        const usuarioLogadoString = usuarioAutenticado;
        if (usuarioLogadoString != null) {
            const usuarioLogado: IUsuarioLogado = usuarioLogadoString;
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
