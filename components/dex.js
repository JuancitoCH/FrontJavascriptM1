const dexPokemon =async(data)=>{
    const dex = document.createElement('div')
    const dexData = document.createElement('div')
    const sprite = document.createElement('img')
    const name = document.createElement('p')
    


    sprite.setAttribute('src',data.sprites.front_default)

    sprite.classList.add('sprite')
    dex.classList.add('dex')
    dexData.classList.add('dex_data')

    name.textContent = 'Name: ' + data.name
    dexData.appendChild(name)

    dex.appendChild(sprite)
    dex.appendChild(dexData)
    return dex
}

export {dexPokemon}