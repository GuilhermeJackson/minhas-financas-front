import AuthService from '../app/service/authService';
import NavbarItem from './navbar-item';

interface NavbarProps {
    isUsuarioAutenticado: boolean;
}
let authService = AuthService()

const deslogar = () => {
    authService.removerUsuariouAutenticado();
}

function Navbar(props: NavbarProps) {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button"
                    data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded={false}
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} href="/home" label="Home" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={props.isUsuarioAutenticado} href="/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem onClick={deslogar} render={props.isUsuarioAutenticado} href="/login" label="Sair" />
                    </ul>
                </div>
            </div>
        </div>
    );
}


export default Navbar;
