import { pokeNames } from '../components/pokename.js'


const pokedex = async () => {
    const { results } = await fetch('https://pokeapi.co/api/v2/pokemon/', {
        method: 'GET',
        // mode:"no-cors"
    }).then(data => data.json())


    const SectionPokedex = document.createElement('section')
    const pokedex = document.createElement('article')
    const listPokemons = document.createElement('article')

    SectionPokedex.classList.add('main_pokedex')
    pokedex.classList.add('pokedex_layout')
    listPokemons.classList.add('pokedex_list_pokemons')
    
    results.forEach(dataP => {
        pokeNames(listPokemons, dataP)
    });
    pokedex.ondragover =e=>e.preventDefault()
    pokedex.ondrop = (e)=>{
        e.preventDefault()
        console.log(e.dataTransfer.getData('text'))
    }


    SectionPokedex.appendChild(listPokemons)
    SectionPokedex.appendChild(pokedex)
    return SectionPokedex
}

export {pokedex}

