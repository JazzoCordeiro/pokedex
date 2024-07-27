const pokeName = document.querySelector('.pokeName')
const pokeNumber = document.querySelector ('.pokeNumber')
const pokemonImage = document.querySelector ('.pokemonImage')
const form = document.querySelector ('.form')
const input = document.querySelector ('.pokeSearch')
const buttonPrev = document.querySelector ('.btnPrev')
const buttonNext = document.querySelector ('.btnNext')

let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status === 200) {

    const data = await APIresponse.json();
    return data;
}}

const renderPokemon = async (pokemon) => {
    pokeName.innerHTML = 'loading...';
    pokeNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data){
    pokemonImage.style.display = 'block';
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value ='';
    searchPokemon = data.id;
}   else {
    pokemonImage.style.display = 'none';
    pokeName.innerHTML = "Not Found :&#40";
    pokeNumber.innerHTML = "";
}

}

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', ()=> {
    if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', ()=> {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);