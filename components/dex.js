const dexPokemon =async(data)=>{
    console.log(data)

    const dex = document.createElement('div')
    const dexData = document.createElement('div')
    const sprite = document.createElement('img')
    const name = document.createElement('p')
    const hp = document.createElement('p')
    const attack = document.createElement('p')
    const defense = document.createElement('p')
    


    sprite.setAttribute('src',data.sprites.front_default)

    sprite.classList.add('sprite')
    dex.classList.add('dex')
    dexData.classList.add('dex_data')

    name.textContent = data.name
    hp.textContent = 'hp : '+ data.stats[0].base_stat
    attack.textContent = 'attack : '+ data.stats[1].base_stat
    defense.textContent = 'defense : '+ data.stats[2].base_stat

    dexData.appendChild(name)
    dexData.appendChild(hp)
    dexData.appendChild(attack)
    dexData.appendChild(defense)

    dex.appendChild(sprite)
    dex.appendChild(dexData)
    return dex
}

export {dexPokemon}