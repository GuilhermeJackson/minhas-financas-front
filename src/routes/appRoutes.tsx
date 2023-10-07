import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
            </Routes>
        </Router>
    )
}

export default AppRouter