import "./App.css";

import ReactQueryExample from "./ReactQueryExample"

import usePokemons from "./store";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

const App = observer(() => {
  const store = usePokemons();
  const [name, setName] = useState("");

  useEffect(() => {
    store.fetchPokemon();
    // sessionStorage.setItem("name", JSON.stringify(name)); store new seassion
  }, [store]);

  return (
    <div className="App">
      <h1>Hello Mobx-state-tree </h1>
      {store.pokemons.map((pokemon) => (
        <div key={pokemon.name}>
          <p > 🙍🏻‍♂️ {pokemon.name} ⛔</p>
          <p>url: 🕸 <span>{pokemon.url}</span></p>
        </div>
      ))}
      <input
        type="text"
        value={name}
        onChange={(e) => {
          e.preventDefault()
          setName(e.target.value)
        }}
      /><br /><br />
      <button onClick={() => {store.search(name)}}>search for pokemon</button><br /><br />
      <button onClick={() => {store.fetchPokemon()}}>fetch store</button>
      <ReactQueryExample />
    </div>
  );
});

export default App;
