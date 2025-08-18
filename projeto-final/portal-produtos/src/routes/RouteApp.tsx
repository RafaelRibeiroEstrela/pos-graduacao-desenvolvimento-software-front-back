import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "../pages/HomePage";
import CadastrarProdutos from "../pages/cadastrarprodutos/CadastrarProdutos";
import ListarProdutos from "../pages/listarprodutos/ListarProdutos";

function RouteApp() {
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

export default RouteApp;