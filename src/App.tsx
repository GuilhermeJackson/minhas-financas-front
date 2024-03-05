import 'bootswatch/dist/flatly/bootstrap.css'
import AppRouter from './routes/appRoutes'
import Navbar from './components/navbar'

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import '../node_modules/primeicons/primeicons.css';
import 'toastr/build/toastr.css'
import { ProvedorAutenticacao } from './provedorAutenticacao';

function App() {

  return (
    <ProvedorAutenticacao>
      <Navbar isUsuarioAutenticado={true} />
      <div className='container'>
        <AppRouter />
      </div>
    </ProvedorAutenticacao>
  )
}

export default App
