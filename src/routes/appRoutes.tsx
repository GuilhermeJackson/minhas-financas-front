import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamento/consulta-lancamentos'
import Home from '../views/home';
import AuthService from '../app/service/authService';

function AppRouter() {

    const authService = AuthService();

    function RotaAutenticadaCadastroUsuario() { // TODO otimizar o código
        if (authService.isUsuarioLogado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <CadastroUsuario />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaConsultaLancamentos() {
        if (authService.isUsuarioLogado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <ConsultaLancamentos />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }


    function RotaAutenticadaCadastroLancamento() {
        if (authService.isUsuarioLogado()) {
            console.log("USUARIO AUTENTICADO DEVE LEVAR PARA PÁGINA CORRETA");
            return <ConsultaLancamentos />
        } else {
            console.log("USUARIO DESLOGADO DEVE LEVAR PARA TELA DE LOGIN");
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaCadastroLancamentoID() {
        if (authService.isUsuarioLogado()) {
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


