const pokemonRequest = async (urlP) => {
    const results = await fetch(urlP, {
        method: 'GET',
        // mode:"no-cors"
    }).then(data => data.json())
    // console.log(results)
    return results
}
const listPokemonsRequest = async (urlP) => {
    const { results } = await fetch('https://pokeapi.co/api/v2/pokemon/', {
        method: 'GET',
        // mode:"no-cors"
    }).then(data => data.json())
    return results
}

export {listPokemonsRequest,pokemonRequest}