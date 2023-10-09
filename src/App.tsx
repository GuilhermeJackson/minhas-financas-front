import 'bootswatch/dist/flatly/bootstrap.css'
import AppRouter from './routes/appRoutes'
import Navbar from './components/navbar'

import 'toastr/build/toastr.css'

function App() {

  return (
    <>
      <Navbar isUsuarioAutenticado={true} />
      <div className='container'>
        <AppRouter />
      </div>
    </>
  )
}

export default App
