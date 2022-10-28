import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './Components/pages/Layout';
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path="contact" element={<Contact/>}></Route>
          </Route>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
