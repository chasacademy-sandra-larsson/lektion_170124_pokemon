
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

  } catch(err) {
      console.error("Error fetchin Pokemon list", err.message)
      return [];
  }

}

async function getPokemonDetails(pokemonName) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = response.data;
    // console.log("pokemon details", response)

    // console.log("abilities", response.data.abilities)
   
    // console.log(response.data.abilities[0].ability.name)
    // console.log(response.data.abilities[1].ability.name)

    const abilities = data.abilities.map(item => item.ability.name)
    const base_experience = data.base_experience
    console.log(abilities, base_experience)

    return {
      // abilities: abilities,
      // base_experience: base_experience   -- samma sak som nedan
      abilities,
      base_experience
    }

  } catch(err) {
    console.error("Error fetching pokemon details", err.message)
    return {
      abilities: [],
      base_experience: null
    }
  }

}

// Denna funktion ansvarar för att renderera ut pokemoninformation i varje pokemomkort
function renderPokemonCards(pokemonList) {

  const cardsContainer = document.querySelector(".pokemon-cards-container");
  
  cardsContainer.innerHTML = pokemonList.map((pokemon, index) => {
    return `
    <article class="pokemon-card">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png">
      <h2>${pokemon.name}</h2>
      <p>Abilities: TODO</p>
      <p>Base Experience: TODO</p>
   </article>
  `;
 }).join('');



}



async function main() {
  const pokemonList = await getPokemonList()
  // Köra function som renderar ut pokemon-card datat
  renderPokemonCards(pokemonList)
  const data  = await  getPokemonDetails("charmander")
  
}

main();