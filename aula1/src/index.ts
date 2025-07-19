import readFile from "./file/readFile";
import {Produto} from "./interfaces/Produto";
import requestCategoryApi from "./api/requestApi";


export async function main(): Promise<void> {

  const path = 'C:\\Users\\rafa_\\Documents\\Github\\PosDesenvolvimentoWeb\\src\\file\\produtos.json';
  const produtosSeparados: Produto[] = []
  try {
    const produtos: Produto[] = await readFile(path)
    for (const produto of produtos) {
      const permitido = await requestCategoryApi(produto.category)
      if (permitido) {
        produtosSeparados.push(produto)
      }
    }
  } catch (err) {
    console.error('Erro ao processar produtos:', err)
  }

  console.log(produtosSeparados);
}

main()





