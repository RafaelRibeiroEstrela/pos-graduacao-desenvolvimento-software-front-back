import Cabecalho from "./Cabecalho.tsx";
import MenuLateral from "./MenuLateral.tsx";

interface PaginaPadraoProps {
    children?: React.ReactNode;
}

function PaginaPadrao({ children }: PaginaPadraoProps) {
    return (
        <div className="flex flex-col h-screen">
            {/* Cabeçalho no topo com fundo escuro */}
            <header className="w-full p-6 bg-gray-900 text-white flex justify-center items-center">
                <Cabecalho />
            </header>

            {/* Container principal com menu lateral à esquerda e conteúdo */}
            <div className="flex flex-1 bg-white">
                {/* Menu lateral à esquerda com borda */}
                <aside className="w-64 border border-black p-4">
                    <MenuLateral />
                </aside>

                {/* Área de conteúdo */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default PaginaPadrao;