import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamento/consulta-lancamentos'
import Home from '../views/home';
import CadastroLancamento from '../views/lancamento/cadastro-lancamentos';

function AppRouter() {

    const isUsuarioAutenticado = () => {

        return false
    }

    function RotaAutenticadaCadastroUsuario() { // TODO otimizar o código
        if (isUsuarioAutenticado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <CadastroUsuario />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaConsultaLancamentos() {
        if (isUsuarioAutenticado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <ConsultaLancamentos />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }

    
    function RotaAutenticadaCadastroLancamento() {
        if (isUsuarioAutenticado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <ConsultaLancamentos />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaCadastroLancamentoID() {
        if (isUsuarioAutenticado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <ConsultaLancamentos />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }


    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/cadastro-usuarios" element={<RotaAutenticadaCadastroUsuario />} />

                <Route path="/consulta-lancamentos" element={<RotaAutenticadaConsultaLancamentos />} />

                <Route path="/cadastro-lancamentos/:id" element={<RotaAutenticadaCadastroLancamentoID />} />

                <Route path="/cadastro-lancamentos" element={<RotaAutenticadaCadastroLancamento />} />
            </Routes>
        </Router>
    )
}

export default AppRouter


