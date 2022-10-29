import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './Components/pages/Layout';
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Login from "./Components/pages/auth/Login";
import SigneUp from "./Components/pages/auth/SigneUp";

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
          </Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
