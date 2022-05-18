import { pokemonRequest } from "../API/request.js"
import { dexPokemon } from "./dex.js"

const pokeNames = (app,data,zone,vista)=>{
    const div = document.createElement('div')
    div.classList.add('poke_list_element')
    div.setAttribute('url',data.url)
    div.draggable = true
    const name = document.createElement('p')
    name.textContent = data.name
    div.appendChild(name)
    app.appendChild(div)
    div.id = data.url
    div.ondragstart = (e)=>{
        e.dataTransfer.setData('url',data.url)
    }
    div.onclick = async (e)=>{
        zone.appendChild(div)
        await Actualizar(zone,vista,app,div)
    }
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
}

