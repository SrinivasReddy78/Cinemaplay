import './App.css'
import Navbar from './components/Navbar'
import ApiState from './context/APIs/ApiState';
import { BrowserRouter, Outlet } from "react-router-dom"
import Foot from './components/Foot'





function App() {


  return (
      <ApiState>
        <div id="page-1" className="bg-firstColor overflow-hidden min-h-screen">
          <Navbar />
          <Outlet />
          <Foot />
        </div>
      </ApiState>
  );
}

export default App;