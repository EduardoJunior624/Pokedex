const allPokemons = [];

async function fetchAllPokemon() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=200"
    );
    const data = await response.json();
    allPokemons.push(data.results);
    for (const pokemon of data.results) {
      await fetchPokemonDetails(pokemon.url);
    }
  } catch (error) {
    console.error("Erro ao buscar a lista de Pokémon:", error);
  }
}

async function fetchPokemonDetails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayPokemon(data);
  } catch (error) {
    console.error("Erro ao buscar o Pokémon:", error);
  }
}

function displayPokemon(pokemon) {
  const pokemonList = document.getElementById("pokemon-list");

  const pokemonCard = document.createElement("button");
  pokemonCard.classList.add("pokemon-card");

  pokemonCard.innerHTML = `
        <h3>${pokemon.id}. ${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p>ID: ${pokemon.id}</p>
        <p style=" font-size:20px; color: white; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black; margin-bottom: 2px; border-radius: 5px; background-color: ${getTypeColor(pokemon.types[0].type.name)}"> ${pokemon.types[0].type.name}</p>`;
        if(pokemon.types.length > 1){
            pokemonCard.innerHTML+= `<p style=" font-size:20px; color: white; -webkit-text-stroke-width: 1px; -webkit-text-stroke-color: black; border-radius: 5px; background-color: ${getTypeColor(pokemon.types[1].type.name)}"> ${pokemon.types[1].type.name}</p>`;
        }
        pokemonCard.onclick = function(){
            showPokemonDetails(pokemon);
        }
        pokemonList.appendChild(pokemonCard);
}

function showPokemonDetails(pokemon){
    const modal = document.getElementById('pokemon-modal');
    const nameElement = document.getElementById('pokemon-name');
    const imageElement = document.getElementById('pokemon-image');
    const statsElement = document.getElementById('pokemon-stats');

    nameElement.innerText = `${pokemon.name.toUpperCase()} (ID: ${pokemon.id})`
    imageElement.src = pokemon.sprites.front_default;

    const stats = pokemon.stats.map(stat => {
        return `<p>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</p>`;
    }).join('');

    statsElement.innerHTML = stats;

    modal.style.display = 'block';
}

document.getElementById('close-modal').onclick = function() {
    document.getElementById('pokemon-modal').style.display = 'none';
}

function getTypeColor(tipoPokemon){
    switch(tipoPokemon){
        case 'normal':
            return 'gray';
        case 'fire':
            return 'orange';
        case 'water':
            return 'blue';
        case 'grass':
            return 'green';
        case 'electric':
            return 'yellow';
        case 'ice':
            return 'lightblue';
        case 'fighting':
            return 'brown';
        case 'poison':
            return 'purple';
        case 'ground':
            return 'saddlebrown';
        case 'flying':
            return 'skyblue';
        case 'psychic':
            return 'pink';
        case 'bug':
            return 'limegreen';
        case 'rock':
            return 'darkgray';
        case 'ghost':
            return 'indigo';
        case 'dragon':
            return 'darkblue';
        case 'dark':
            return 'black';
        case 'steel':
            return 'silver';
        case 'fairy':
            return 'lightpink';
        default:
            return 'white';
    }
}

async function searchPokemon() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const filteredPokemon = [];
    clearPokemonList();
    for (let i = 0; i < allPokemons[0].length; i++) {
        const pokemon = allPokemons[0][i];
        if (pokemon.name.toLowerCase().includes(searchTerm)) {
          await fetchPokemonDetails(pokemon.url)
        }
    }
}

function clearPokemonList() {
    const pokemonList = document.getElementById('pokemon-list');
    pokemonList.innerHTML = '';
}

document.getElementById('search-bar').addEventListener('input', function() {
    searchPokemon();
})

window.onload = function () {
  fetchAllPokemon();
}

