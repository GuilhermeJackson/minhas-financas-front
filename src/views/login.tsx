import { useContext, useState } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../app/service/usuarioService";
import { mensagemErro } from '../components/toastr';
import { IUsuarioLogin } from "../model/interfaces/usuario.model";
import { AuthContext } from '../provedorAutenticacao';


function Login() {
   const usuarioService = UsuarioService()
   const navigate = useNavigate();
   const [email, setEmail] = useState<string>('');
   const [senha, setSenha] = useState<string>('');
   const { iniciarSessao } = useContext(AuthContext as React.Context<any>);

   const entrar = async () => {
      const credencial: IUsuarioLogin = {
         email: email,
         senha: senha
      }
      await usuarioService.autenticar(credencial)
         .then(response => {
            iniciarSessao(response.data);
            navigate('/home');
         }).catch(error => {
            mensagemErro(error.message);
            console.log(error);
         })
   }

   const prepararCadastrar = () => {
      navigate('/cadastro-usuarios');
   }

   return (
      <div className="row">
         <div className="col-md-6 offset-md-3">
            <div className="bs-docs-section">
               <Card title="Login">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="bs-component">
                           <fieldset>
                              <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                 <input type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Digite o Email" />
                              </FormGroup>
                              <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                 <input type="password"
                                    value={senha}
                                    onChange={e => setSenha(e.target.value)}
                                    className="form-control"
                                    id="senha"
                                    placeholder="Password" />
                              </FormGroup>
                              <button onClick={entrar} className="btn btn-success">
                                 <i className="pi pi-sign-in"></i>Entrar
                              </button>
                              <button onClick={prepararCadastrar} className="btn btn-danger">
                                 <i className="pi pi-plus" ></i> Cadastrar
                              </button>
                           </fieldset>
                        </div>
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      </div>
   )
}

export default Login;