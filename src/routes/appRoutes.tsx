import { BrowserRouter as Router, Route, Routes, Navigate, } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamento/consulta-lancamentos'
import Home from '../views/home';
import { useContext } from 'react';
import { AuthContext } from '../provedorAutenticacao';
import CadastroLancamento from '../views/lancamento/cadastro-lancamentos';

function AppRouter() {
    const { isAutenticado } = useContext(AuthContext as React.Context<any>);

    function RotaAutenticadaCadastroUsuario() { // TODO otimizar o código
        if (isAutenticado) {
            return <CadastroUsuario />
        } else {
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaConsultaLancamentos() {
        if (isAutenticado) {
            return <ConsultaLancamentos />
        } else {
            return <Navigate to="/login" />
        }
    }


    function RotaAutenticadaCadastroLancamento() {
        if (isAutenticado) {
            return <CadastroLancamento />
        } else {
            return <Navigate to="/login" />
        }
    }

    function RotaAutenticadaCadastroLancamentoID() {
        if (isAutenticado) {
            return <CadastroLancamento />
        } else {
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


