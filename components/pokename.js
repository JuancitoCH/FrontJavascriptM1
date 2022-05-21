import { pokemonRequest } from "../API/request.js"
import { dexPokemon } from "./dex.js"
import { layoutFight } from "./fight.js"

// generation-vii.icons.front_default
const pokeNames =async (app,data,zone,vista)=>{
    const infoPokemon = await pokemonRequest(data.url)

    const div = document.createElement('div')
    const icon = document.createElement('img')


    div.setAttribute('url',data.url)
    icon.setAttribute('src',infoPokemon.sprites.versions['generation-vii'].icons.front_default)

    icon.classList.add('poke_icon')
    div.classList.add('poke_list_element')
    div.draggable = true
    
    const name = document.createElement('p')
    name.textContent = data.name
    
    div.id = data.url
    div.ondragstart = (e)=>{
        e.dataTransfer.setData('url',data.url)
    }
    div.onclick = async (e)=>{
        zone.appendChild(div)
        await Actualizar(zone,vista,app,div)
    }

    div.appendChild(name)
    div.appendChild(icon)
    app.appendChild(div)
}

export {pokeNames}


const Actualizar =async(zoneSelectPokemon,vistaPokemon,listPokemons,div) => {
    const elemnts = zoneSelectPokemon.childNodes
    if(elemnts.item(0)) listPokemons.appendChild(elemnts.item(0))
    zoneSelectPokemon.innerHTML=''

    zoneSelectPokemon.appendChild(div)
    
    const urlP = div.getAttribute('url')
    const pokemon = await pokemonRequest(urlP)

    const elemntForView= await dexPokemon(pokemon)
    vistaPokemon.innerHTML =''
    vistaPokemon.appendChild(elemntForView)



    const pokedex = document.querySelector('.pokedex_layout')
    const prevFight = document.querySelector('.layout_fight')
    prevFight?.remove()
    
    // console.log(pokedex)
    // console.log(prevFight)
    const enemy = await pokemonRequest(RandomEnemys())
    const fight = layoutFight(pokemon,enemy)
    
    pokedex.appendChild(fight)

}

const RandomEnemys=()=>{
    const enemies={
        mewtwo:'https://pokeapi.co/api/v2/pokemon/mewtwo',
        mew:'https://pokeapi.co/api/v2/pokemon/mew',
        celebi:'https://pokeapi.co/api/v2/pokemon/celebi',
        zapdos :'https://pokeapi.co/api/v2/pokemon/zapdos',
        latios:'https://pokeapi.co/api/v2/pokemon/latios',
        latias:'https://pokeapi.co/api/v2/pokemon/latias',
    }
    return( enemies[Object.keys(enemies)[Math.floor(Math.random()*Object.keys(enemies).length)]] )
}