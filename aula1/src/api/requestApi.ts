import {Permissao} from "../interfaces/Permissao";


async function requestCategoryApi(category: string): Promise<boolean> {
    const baseUrl = 'https://posdesweb.igormaldonado.com.br/api/allowedCategory';
    const url = `${baseUrl}?category=${encodeURIComponent(category)}`;
    const resp: Permissao  = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json()
        .catch(e => console.error(e)));

    return resp.allowed;
}

export default requestCategoryApi;