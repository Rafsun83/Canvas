import './App.css';
import Home from './Component/Home/Home';
import Navigations from './Component/Navigation/Navigations'
import SignUp from './Component/SingUp/SignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InvalidPages from './Component/InvalidPage/InvalidPages';
import AuthProvider from './Context/AuthProvider';
import SignIn from './Component/SingUp/SignIn';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <Navigations/>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/sigin" element={<SignIn/>} />
            <Route path="*" element={<InvalidPages/>} />
            </Routes>            
      </BrowserRouter>
      </AuthProvider>        
     
       
    </div>
  );
}

export default App;
