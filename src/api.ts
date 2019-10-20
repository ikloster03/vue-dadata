import axios from 'axios';
import { DadataAddress } from './responceData';

export async function getSuggestion(token: string, value: string, count: number) {
    const url: string = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const query: object = {query: value, count};
    const dadata: DadataAddress[] = [];

    const responce = await axios.post(url, query , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Token ' + token,
        },
    });

    responce.data.suggestions.forEach((item: any) => {
        dadata.push(item);
    });

    return dadata;
}
