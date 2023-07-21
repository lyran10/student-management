import './App.css';
import { StudentManagement } from './pages/studentManagement';
import { NavBar } from './components/navBar';
import {Route,Routes} from "react-router-dom"
import { Login } from './components/Auth/login';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path={"/"} element={<Login/>}/>
        <Route path={"/studentManagement"} element={<StudentManagement/>}/>
      </Routes>
      
    </div>
  );
}

export default App;