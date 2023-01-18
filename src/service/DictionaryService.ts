import axios from 'axios';
import { IDictionary } from '../models/Dictionary';



export class DictionaryService {

    async getAll(word:string): Promise<IDictionary[]> {

        let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        let dictionaries: IDictionary[] = response.data;
        
        return dictionaries;
    }
}