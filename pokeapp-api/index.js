(()=>{ 
    const iconTitleTag = document.querySelector('#icon-title')    
/*     fetch(`https://pokeapi.co/api/v2/pokemon/25`)
    .then(response => response.json())
    .then(data => {
        iconTitleTag.setAttribute("href", data.sprites.front_default)
    }) */
    iconTitleTag.setAttribute("href", 'img/pokeballnormal.png')
})();
const maskUrl = "-webkit-mask-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const maskUrl2 = "mask-image: url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
const root = document.querySelector('#root')
const div = `<label class='welcome-title rounded p-4 text-light d-flex align-items-center justify-content-center'>Bienvenido al Pokedex Web<label >`
const pokemonInput = document.querySelector('#pokemonInput')
const formSubmit = document.querySelector('#form-submit')
const buttonNextPokemon = document.querySelector('#next-pokemon')
const buttonPreviousPokemon = document.querySelector('#previous-pokemon')

root.innerHTML = div
let pokemonName = 'pikachu'
let pokemonID = 1
let pokedexActive = true

buttonNextPokemon.addEventListener('click', e =>{
    pokemonID > 897 ? console.log('Error'): pokemonID += 1; getPokemon(pokemonID);
})

buttonPreviousPokemon.addEventListener('click', e =>{
    pokemonID < 2 ? console.log('Error'): pokemonID -= 1; getPokemon(pokemonID);
})

formSubmit.addEventListener('click', e =>{
    pokemonName = pokemonInput.value || pokemonName    
    getPokemon(pokemonName)
})
activatePokedex=(active = pokedexActive)=>{
    if (active) {
        const pokemonInfoContainer = document.querySelector('#pokemon-info-container')
        const pokemonDivElementContainer = `
        <div class="data-card-panel d-flex align-items-center justify-content-center">
        <div id="pokemonDiv" class="data-card bg-dark p-2 rounded d-flex align-items-center justify-content-center flex-column"></div></div>`

        pokemonInfoContainer.innerHTML = pokemonDivElementContainer
        const pokemonDivElement = document.querySelector('#pokemonDiv')
        pokemonDivElement.innerHTML = `<span class="small-loader"></span><br>`
        pokedexActive = false
    } else {
        pokemonDivElementContainer = ''
        pokedexActive = true
    }
}
const getPokemon = (pokemonNameID)=>{
    activatePokedex(true)
    const pokemonEndPointToString = pokemonNameID.toString()
    const pokemonDivElement = document.querySelector('#pokemonDiv')


    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEndPointToString.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
        pokemonID = data.id
        pokemonDivElement.innerHTML = `
        <div id="id-container" class="data-container mt-1 rounded w-100 bg-primary d-flex align-items-center justify-content-center ">
            <div class="data-card-info-container d-flex align-items-center justify-content-center">
                <span class="text-light">
                    # ${data.id}
                </span>
            </div>
        </div>
        <div class="card-test d-flex align-items-center justify-content-center">
            <div id="root-anchor" class="container d-flex align-items-center justify-content-center">
                <img id="root-img" src="img/test.png" width="100" alt="" style=" ${maskUrl2}${data.id}.png'); ${maskUrl}${data.id}.png');">
                <img id="root-img2" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" width="100" alt="">
            </div>
        </div>
        <div id="data-info-container" class="data-container mt-1 rounded w-100 d-flex align-items-center justify-content-around">
            <div class="data-card-info-container d-flex align-items-center justify-content-center">
                <span class="text-info">
                    ${data.name}
                </span>
            </div>
            <div class="data-card-info-container d-flex align-items-center justify-content-center">
                <img class="data-card-image-info" src="img/pokeballnormal.png" alt="">
                <span class="text-info">
                    ${data.weight / 10} kg
                </span>
            </div>
        </div>
        `
        return fetch(data.location_area_encounters)
    }).catch((err) => {
        pokemonDivElement.innerHTML = 'El nombre de tu pokemon no existe en la lista'
    });

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEndPointToString.toLowerCase()}`)
    .then(response => response.json())
    .then(data => {
        return fetch(data.location_area_encounters)
    }).then(function(response) { 
        return response.json(); 
      })
    .then(function(data) {
        pokemonDivElement.innerHTML += `
        <div class="data-container mt-1 rounded w-100 d-flex align-items-center justify-content-center ">
            <div class="data-card-info-container w-100 d-flex align-items-center justify-content-center">
                <span class="text-info">
                    Ciudad: ${data[0].location_area.name} 
                </span>
            </div>
        </div>`
      }).catch((err) => {
        pokemonDivElement.innerHTML += `
        <div class="data-container mt-1 rounded w-100 d-flex align-items-center justify-content-center ">
            <div class="data-card-info-container w-100 d-flex align-items-center justify-content-center">
                <span class="text-info">
                    Sin ciudad
                </span>
            </div>
        </div>`
        console.log(err);
    })
}