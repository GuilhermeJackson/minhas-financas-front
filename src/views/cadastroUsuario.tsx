import { useState } from "react"
import FormGroup from "../components/form-group";

function CadastroUsuario() {

    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [senhaRepeticao, setSenhaRepeticao] = useState<string>('');

    const cadastrar = () => {
        console.log(nome)
        console.log(email)
        console.log(senha)
        console.log(senhaRepeticao)
    }

    return (
        <div className="container">

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
                                <button type="button" className="btn btn-danger">Voltar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroUsuario

