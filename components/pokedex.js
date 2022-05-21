import { pokeNames } from '../components/pokename.js'
import { dexPokemon } from './dex.js'
import { listPokemonsRequest,pokemonRequest } from '../API/request.js'
import { layoutFight } from './fight.js'


const pokedex = async () => {
    const results = await listPokemonsRequest('https://pokeapi.co/api/v2/pokemon/')

    const listPokemons = document.createElement('article')
    const SectionPokedex = document.createElement('section')
    // zona roja
    const pokedex = document.createElement('article')
    // sprite y info
    const vistaPokemon = document.createElement('article')
    // zona de dejar el poketmonster
    const zoneSelectPokemon = document.createElement('div')
    const contInfoVista = document.createElement('div')

    listPokemons.classList.add('pokedex_list_pokemons')
    SectionPokedex.classList.add('main_pokedex')

    pokedex.classList.add('pokedex_layout')

    contInfoVista.classList.add('info_zone')

    vistaPokemon.classList.add('view_pokemon')
    zoneSelectPokemon.classList.add('zone_select')



    results.forEach(dataP => {
        pokeNames(listPokemons, dataP,zoneSelectPokemon,vistaPokemon)
    });
    zoneSelectPokemon.ondragover = e => e.preventDefault()
    zoneSelectPokemon.ondrop = async(e)=>await pokemonOndrop(e,zoneSelectPokemon,vistaPokemon,listPokemons)
    
    // Habria que pasar la vista y zona a un div para que en otro div ponga la escena de batalla
    

    contInfoVista.appendChild(vistaPokemon)
    contInfoVista.appendChild(zoneSelectPokemon)

    pokedex.appendChild(contInfoVista)

    SectionPokedex.appendChild(listPokemons)
    SectionPokedex.appendChild(pokedex)
    return SectionPokedex
}



const pokemonOndrop=async(e,zoneSelectPokemon,vistaPokemon,listPokemons) => {
    e.preventDefault()
    const elemnts = zoneSelectPokemon.childNodes
    // console.log(elemnts.item(0))
    if(elemnts.item(0)) listPokemons.appendChild(elemnts.item(0))

    zoneSelectPokemon.innerHTML=''
    const pokemondata = e.dataTransfer.getData('url')
    const div = document.getElementById(pokemondata)
    
    zoneSelectPokemon.appendChild(div)
    
    const urlP = div.getAttribute('url')
    const pokemon = await pokemonRequest(urlP)

    const elemntForView= await dexPokemon(pokemon)
    vistaPokemon.innerHTML =''
    vistaPokemon.appendChild(elemntForView)


    // FIGHT
    const pokedex = document.querySelector('.pokedex_layout')
    const prevFight = document.querySelector('.layout_fight')
    prevFight?.remove()
    
    // console.log(pokedex)
    // console.log(prevFight)
    
    const fight = layoutFight(pokemon,pokemon)
    pokedex.appendChild(fight)
    
}



export { pokedex }

