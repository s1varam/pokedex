import Axios from "axios";

export const instance = Axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
});
