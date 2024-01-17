
import axios from "axios"

// "results": [
//   {
//     "name": "bulbasaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/1/"
//   },
//   {
//     "name": "ivysaur",
//     "url": "https://pokeapi.co/api/v2/pokemon/2/"
//   },
//   {


async function getPokemonList() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10");
    return response.data.results;

  } catch(error) {
      console.error("Error fetchin Pokemon list", error)
      return [];
  }

}

// Denna funktion ansvarar för att renderera ut pokemoninformation i varje pokemomkort
async function renderPokemonCards(pokemonList) {

   return `
   <article class="pokemon-card">
   <img src="">
   <h2>${pokemon.name}</h2>
   <p>Abilities${}</p>
   <p>Base Experience ${}</p>
   </article>
   `

}



async function main() {
  const pokemonList = getPokemonList()
  // Köra function som renderar ut pokemon-card datat
  renderPokemonCards(pokemonList)

}

main();