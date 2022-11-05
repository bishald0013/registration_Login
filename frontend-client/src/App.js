import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './pages/Layout';
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/auth/Login";
import SigneUp from "./pages/auth/SigneUp";
import ResetPasswordEmail from "./pages/auth/ResetPasswordEmail";
import PasswordReset from "./pages/auth/PasswordReset";
import Dashbord from "./pages/Dashbord";

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
            <Route path="api/user/reset/:id/:token" element={<PasswordReset/>}></Route>
            <Route path="/dashbord" element={<Dashbord />}></Route>
          </Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
