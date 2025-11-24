import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "react-oidc-context";

import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';
// import NotFoundPage from './pages/NotFound/NotFound';


function App() {
  const auth = useAuth();

      return (
          <Router>
            <Routes>
              <Route path="/" element={<Home auth={auth}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="*" element={<NotFoundPage/>}/> */}
            </Routes>
          </Router>
      );
    }

export default App;

