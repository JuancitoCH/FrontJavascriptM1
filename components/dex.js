const dexPokemon =async(data)=>{
    console.log(data)

    const dex = document.createElement('div')
    const dexData = document.createElement('div')
    const contenedor_sprite = document.createElement('div')
    const sprite = document.createElement('img')
    const name = document.createElement('p')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const defense = document.createElement('p')
    const type = document.createElement('p')

    

    sprite.setAttribute('src',data.sprites.versions['generation-v']['black-white'].animated.front_default)

    sprite.classList.add('sprite')
    contenedor_sprite.classList.add('contenedor_sprite')
    dex.classList.add('dex')
    dexData.classList.add('dex_data')

    name.textContent = data.name
    hp.textContent = 'HP : '+ data.stats[0].base_stat
    attack.textContent = 'Attack : '+ data.stats[1].base_stat
    defense.textContent = 'Defense : '+ data.stats[2].base_stat

    type.textContent = 'Type : '+ data.types[0].type.name

    dexData.appendChild(name)
    dexData.appendChild(hp)
    dexData.appendChild(attack)
    dexData.appendChild(defense)
    dexData.appendChild(type)

    contenedor_sprite.appendChild(sprite)
    dex.appendChild(contenedor_sprite)
    dex.appendChild(dexData)
    return dex
}

export {dexPokemon}