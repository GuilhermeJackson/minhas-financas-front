import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
            </Routes>
        </Router>
    )
}

export default AppRouter