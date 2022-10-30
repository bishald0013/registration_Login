import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './Components/pages/Layout';
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Login from "./Components/pages/auth/Login";
import SigneUp from "./Components/pages/auth/SigneUp";
import ResetPasswordEmail from "./Components/pages/auth/ResetPasswordEmail";
import PasswordReset from "./Components/pages/auth/PasswordReset";
import Dashbord from "./Components/pages/Dashbord";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path="contact" element={<Contact/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signeup" element={<SigneUp/>}></Route>
            <Route path="resetpassword" element={<ResetPasswordEmail/>}></Route>
            <Route path="reset" element={<PasswordReset/>}></Route>
            <Route path="/dashbord" element={<Dashbord />}></Route>
          </Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
