import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CadastrarProdutos from "./pages/cadastrarprodutos/CadastrarProdutos.tsx";
import ListarProdutos from "./pages/listarprodutos/ListarProdutos.tsx";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<HomePage></HomePage>}></Route>
                    <Route path={"/cadastrar-produtos"} element={ <CadastrarProdutos></CadastrarProdutos>}></Route>
                    <Route path={"/listar-produtos"} element={<ListarProdutos></ListarProdutos>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App
