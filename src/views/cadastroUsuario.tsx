import { useState } from "react"
import FormGroup from "../components/form-group";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";
import { mensagemErro } from '../components/toastr';
import { mensagemSucesso } from '../components/toastr';
import { IUsuarioCadastro } from "../model/interfaces/usuario.model";

function CadastroUsuario() {
    const usuarioService = UsuarioService()
    const navigate = useNavigate();
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaRepeticao, setSenhaRepeticao] = useState<string>('');

    const cadastrar = () => {
        if (exibirMensagemErroDosCampos() === false) {
            return;
        }
        const usuario: IUsuarioCadastro = {
            nome: nome,
            email: email,
            senha: senha
        }
        usuarioService.salvar(usuario)
            .then(() => {
                mensagemSucesso("Usuário cadastrado com sucesso!");
                navigate('/login')
            }).catch(erro => {
                mensagemErro(erro.response.data)
            })
    }

    const cancelar = () => {
        navigate('/login')
    }

    const exibirMensagemErroDosCampos = () => {
        const msg = validar();
        if (msg && msg.length > 0) {
            msg.forEach((msg) => {
                mensagemErro(msg);
            });
            return false;
        }
    };

    const validar: () => string[] = () => {
        const msgs = []
        if (!nome) {
            msgs.push('O campo nome é obrigatório')
        }
        if (!email) {
            msgs.push('O campo e-mail é obrigatório')
        }
        if (email.match('/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/')) {
            msgs.push('Informa um e-mail válido')
        }
        if (!senha) {
            msgs.push('O campo senha é obrigatório')
        }
        if (senha && !senhaRepeticao) {
            msgs.push('É necessário repetir a senha')
        }

        if ((senha && senhaRepeticao) && senha !== senhaRepeticao) {
            msgs.push('Confirmação de senha incorreta!')
        }
        return msgs;
    }

    return (
        <div>

            <div className="card mb-3">
                <h3 className="card-header">Cadastro de Usuário</h3>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label={"Nome: *"} htmlFor={"exampleInputEmail1"} >
                                    <input type="email"
                                        onChange={e => setNome(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup label={"Email: *"} htmlFor={"exampleInputEmail1"}>
                                    <input type="email"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Digite o Email"
                                        onChange={e => setEmail(e.target.value)} />
                                    <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                </FormGroup>
                                <FormGroup label={"Senha: *"} htmlFor={"exampleInputPassword1"} >
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={e => setSenha(e.target.value)} />
                                </FormGroup>

                                <FormGroup label={"Repita a Senha: *"} htmlFor={"exampleInputPassword1"}>
                                    <input type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        onChange={e => setSenhaRepeticao(e.target.value)} />
                                </FormGroup>

                                <button onClick={cadastrar} type="button" className="btn btn-success">Salvar</button>
                                <button onClick={cancelar} type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroUsuario

