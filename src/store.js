import { types } from "mobx-state-tree";

const _fetchData = async () => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/");
  return data.json();
};

const Pokemon = types
  .model({
    name: types.optional(types.string, ""),
    url: types.optional(types.string, "")
  })
  .actions((self) => ({
    updateName(newName) {
      self.name = newName;
    }
  }));

const PokemonList = types
  .model({
    pokemons: types.array(Pokemon)
  })
  .actions((self) => ({
    setPokemons(newPokemons) {
      self.pokemons = newPokemons;
    },
    async fetchPokemon() {
      const data = await _fetchData();
    //   console.log("function called");
      self.setPokemons(data.results);
    }
  }))
  .views((self) => ({
    search(name) {
      self.setPokemons(
        self.pokemons.filter((pokemon) => pokemon.name === name)
      );
    }
  }));

let _pokemonStore;
const usePokemons = () => {
  if (!_pokemonStore) {
    _pokemonStore = PokemonList.create({
      pokemons: []
    });
  }

  return _pokemonStore;
};

export default usePokemons;
