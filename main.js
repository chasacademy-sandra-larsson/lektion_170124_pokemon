
import axios from "axios"
let isSorted = false; // Flagga om listan är sorterad eller inte
let isFiltered = false; // Flagga om listan är filtrerad eller inte
let pokemonList; // Lista med alla pokemon

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
   // console.log(abilities, base_experience)

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
async function renderPokemonCards(pokemonList) {

  const cardsContainer = document.querySelector(".pokemon-cards-container");

  // Samla komplett information om en pokemon (name, index, abilities, base_exp)
  // const pokemon = {
  //   name: pokemon.name,
  //   abilities: abilities,
  //   base_experience: base_experience,
  //   index: index
  // }

  const completePokemonList = await Promise.all(pokemonList.map(async (pokemon, index) => {

  
      const {abilities, base_experience} = await getPokemonDetails(pokemon.name);
      return {
        name: pokemon.name,
        abilities: abilities,
        base_experience: base_experience,
        index: index
      };
  }));


  // Reduce
  const totalBaseExperience = completePokemonList.reduce((total, pokemon) => total + pokemon.baseExperience, 0);
  document.querySelector('.total_exp').textContent = `Total Base Experience: ${totalBaseExperience}`;

  // Filter
  const filterAbilities = ['solar-power'] ; 
  let filteredList = isFiltered ? completePokemonList.filter(pokemon => {
    return filterAbilities.every(ability => pokemon.abilities.includes(ability));
  }) : completePokemonList;
  
  // Sort
  let listToRender = isSorted ? [...filteredList].sort((a, b) => (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0) : filteredList;


  cardsContainer.innerHTML = listToRender.map((pokemon, index) => {
    return `
    <article class="pokemon-card">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png">
      <h2>${pokemon.name}</h2>
      <p>Abilities: ${pokemon.abilities.join(", ")}</p>
      <p>Base Experience: ${pokemon.base_experience}</p>
   </article>
  `;
 }).join('');

}

// Eventlisteners
const sortButton = document.querySelector(".btn_sort")
sortButton.addEventListener('click', () => {
  isSorted = !isSorted; 
  if (pokemonList) { 
    renderPokemonCards(pokemonList, isSorted, isFiltered);
  } else {
    console.error('pokemonList is not defined');
  }
});

const filterButton = document.querySelector(".btn_filter")
filterButton.addEventListener('click', () => {
  isFiltered = !isFiltered; 
  if (pokemonList) { 
    renderPokemonCards(pokemonList, isSorted, isFiltered);
  } else {
    console.error('pokemonList is not defined');
  }
});

// Här börjar det
async function main() {
   pokemonList = await getPokemonList()
  // Köra function som renderar ut pokemon-card datat
  renderPokemonCards(pokemonList)  
}

main();