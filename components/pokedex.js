import { pokeNames } from '../components/pokename.js'

const pokedex = async () => {
    const { results } = await fetch('https://pokeapi.co/api/v2/pokemon/', {
        method: 'GET',
        // mode:"no-cors"
    }).then(data => data.json())

    const SectionPokedex = document.createElement('section')
    const pokedex = document.createElement('article')
    const vistaPokemon = document.createElement('article')
    const listPokemons = document.createElement('article')
    const zoneSelectPokemon = document.createElement('div')
    // const listPokemons = document.createElement('article')

    SectionPokedex.classList.add('main_pokedex')
    pokedex.classList.add('pokedex_layout')
    vistaPokemon.classList.add('view_pokemon')
    listPokemons.classList.add('pokedex_list_pokemons')
    zoneSelectPokemon.classList.add('zone_select')

    results.forEach(dataP => {
        pokeNames(listPokemons, dataP)
    });
    pokedex.ondragover = e => e.preventDefault()
    pokedex.ondrop = async(e)=>await pokemonOndrop(e,pokedex,vistaPokemon)
    
    pokedex.appendChild(vistaPokemon)
    pokedex.appendChild(zoneSelectPokemon)
    SectionPokedex.appendChild(listPokemons)
    SectionPokedex.appendChild(pokedex)
    return SectionPokedex
}


const pokemonRequest = async (urlP) => {
    const results = await fetch(urlP, {
        method: 'GET',
        // mode:"no-cors"
    }).then(data => data.json())
    console.log(results)
    return results
}

const pokemonOndrop=async(e,pokedex,vistaPokemon) => {
    e.preventDefault()
    const pokemondata = e.dataTransfer.getData('url')
    const div = document.getElementById(pokemondata)

    pokedex.appendChild(div)

    const urlP = div.getAttribute('url')
    const pokemon = await pokemonRequest(urlP)

    const elemntForView=await dexPokemon(pokemon)
    vistaPokemon.innerHTML =''
    vistaPokemon.appendChild(elemntForView)

}

const dexPokemon =async(data)=>{
    const dex = document.createElement('div')
    const sprite = document.createElement('img')

    sprite.setAttribute('src',data.sprites.front_default)

    sprite.classList.add('sprite')
    dex.classList.add('dex')

    dex.appendChild(sprite)
    
    return dex
}



export { pokedex }

