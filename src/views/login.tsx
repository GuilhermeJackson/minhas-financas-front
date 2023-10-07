import { useState } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

function Login() {

   const [email, setEmail] = useState<string>('');
   const [senha, setSenha] = useState<string>('');

   const entrar = () => {
      console.log("Email: " + email);
      console.log("Senha: " + senha);
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
                              <button className="btn btn-danger">
                                 <i className="pi pi-plus"></i> Cadastrar
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
