const pokemonList = document.querySelector('.pokemon-list');
const pokemonDetail = document.querySelector('.pokemon-detail');

// Lấy danh sách 20 Pokemon từ API và hiển thị trên trang web
fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    .then(response => response.json())
    .then(data => {
        data.results.forEach(pokemon => {
            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');

            const pokemonName = document.createElement('div');
            pokemonName.classList.add('pokemon-name');
            pokemonName.textContent = pokemon.name;

            pokemonDiv.appendChild(pokemonName);

            pokemonDiv.addEventListener('click', () => {
                getPokemonDetails(pokemon.url);
            });

            pokemonList.appendChild(pokemonDiv);
        });
    })
    .catch(error => console.error(error));

// Lấy thông tin chi tiết của Pokemon từ API và hiển thị trên trang web
function getPokemonDetails(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const pokemonDetailHtml = `
        <img src="${data.sprites.front_default}" />
        <div class="pokemon-name">${data.name}</div>
        <div class="pokemon-types">${getPokemonTypes(data.types)}</div>
      `;
            pokemonDetail.innerHTML = pokemonDetailHtml;
        })
        .catch(error => console.error(error));
}

// Lấy loại Pokemon từ API
function getPokemonTypes(types) {
    let typesString = '';
    types.forEach(type => {
        typesString += `${type.type.name} `;
    });
    return typesString;
}