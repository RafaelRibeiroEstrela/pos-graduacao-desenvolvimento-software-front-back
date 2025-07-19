import {Produto} from "../interfaces/Produto";
import * as fs from "node:fs";

async function readFile(path: string): Promise<Produto[]> {
    const jsonString = fs.readFileSync(path, 'utf-8');
    return JSON.parse(jsonString) as Produto[];
}

export default readFile;