import * as PokemonAPI from 'pokeapi-js-wrapper';

export class Pokemon {
    constructor() {
        const P = new PokemonAPI.Pokedex();
        console.log(P.getPokemonsList());
    }
}
