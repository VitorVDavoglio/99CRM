import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import Negocio from "./pages/negocio/negocio.jsx";

function Rotas(){
    return <BrowserRouter>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}/>
            <Route path="/negocios" element={<Negocio />}/>
        </Routes>
    </BrowserRouter>
}

export default Rotas;