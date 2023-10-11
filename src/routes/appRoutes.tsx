import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import ConsultaLancamentos from '../views/lancamento/consulta-lancamentos'
import Home from '../views/home';
import CadastroLancamento from '../views/lancamento/cadastro-lancamentos';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
                <Route path="/consulta-lancamentos" element={<ConsultaLancamentos />} />
                <Route path="/cadastro-lancamentos/:id" element={<CadastroLancamento />} />
            </Routes>
        </Router>
    )
}

export default AppRouter