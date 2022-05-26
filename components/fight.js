const layoutFight=(data,enemyData)=>{
    const layout = document.createElement('section')
    const texture = document.createElement('div')
    
    layout.classList.add('layout_fight')
    texture.classList.add('texture')

    const pokemonLayout = pokemonToFight(data,'myPokemon')
    const enemyLayout = pokemonToFight(enemyData)

    layout.appendChild(enemyLayout)
    layout.appendChild(pokemonLayout)

    const Pad = battlePanel()
    layout.appendChild(Pad)
    layout.appendChild(texture)

    return layout
}



const pokemonToFight=(data,type='enemy')=>{
    const myPokemon = document.createElement('article')
    const name = document.createElement('p')
    const hp = document.createElement('p')
    const hp_bar = document.createElement('div')
    const sprite = document.createElement('img')
    
    myPokemon.classList.add(type)
    name.classList.add(type+'_name')
    hp.classList.add(type+'_hp')
    hp_bar.classList.add(type+'_hp_bar')
    sprite.classList.add(type+'_sprite')

    
    myPokemon.setAttribute('hp',data.stats[0].base_stat)
    myPokemon.setAttribute('attack',data.stats[1].base_stat)
    myPokemon.setAttribute('defense',data.stats[2].base_stat)
    
    sprite.setAttribute('src',type==='enemy'?data.sprites.versions['generation-v']['black-white'].animated.front_default : data.sprites.versions['generation-v']['black-white'].animated.back_default)
    
    name.textContent = data.name
    hp.textContent = myPokemon.getAttribute('hp')

    

    myPokemon.appendChild(name)
    myPokemon.appendChild(hp_bar)
    myPokemon.appendChild(hp)
    myPokemon.appendChild(sprite)

    return myPokemon
}

const battlePanel=()=>{
    const pad = document.createElement('div')
    const buttonA = document.createElement('button')
    const buttonB = document.createElement('button')
    const buttonBaya = document.createElement('button')

    pad.classList.add('pad')
    buttonA.classList.add('buttonA')
    buttonB.classList.add('buttonB')
    buttonB.classList.add('buttonBaya')

    buttonA.textContent='Attack'
    buttonB.textContent='Special Attack'
    buttonBaya.textContent='Baya'

    buttonBaya.setAttribute('baya',5)

    buttonA.onclick=(e)=>buttonOnClick('A',e)
    buttonB.onclick=(e)=>buttonOnClick('B',e)
    buttonBaya.onclick=(e)=>bayaOnclick(buttonBaya,50)

    pad.appendChild(buttonA)
    pad.appendChild(buttonB)
    pad.appendChild(buttonBaya)
    return pad
}

const buttonOnClick=(type,event)=>{
    const PokemonStats = document.querySelector('.myPokemon')
    const attack = PokemonStats.getAttribute('attack')
    const enemy =document.querySelector('.enemy')

    PokemonStats.classList.add('golpe_me')
    setTimeout(()=>{
    PokemonStats.classList.remove('golpe_me')
    },1300)


    const statsToEnemy ={
        hp:enemy.getAttribute('hp'),
        defense:enemy.getAttribute('defense'),
        damage:type==='B'?attack*2 :attack
    }
    enemy.setAttribute('hp',damage(statsToEnemy))
    setTimeout(()=>{
        enemy.childNodes[2].textContent=enemy.getAttribute('hp')
    },1000)

    if(damage(statsToEnemy)<=0){
        const layout_Fight = document.querySelector('.layout_fight')
        
        const Win = document.createElement('div')

        Win.classList.add('win')
        Win.textContent = 'YOU WIN'

        layout_Fight.appendChild(Win)
        return
    }

    EnemyAttack()

}

const damage =({hp,defense,damage})=>{
    const recived = Math.floor(hp - ((damage/2)-(defense/3)))
    
    return recived
}

const bayaOnclick =(btn,heal=30)=>{
    if(!(btn.getAttribute('baya')>0)) return 
    const PokemonStats = document.querySelector('.myPokemon')
    const hp = parseInt( PokemonStats.getAttribute('hp'))
    PokemonStats.setAttribute('hp',hp+heal)
    PokemonStats.childNodes[2].textContent =PokemonStats.getAttribute('hp')
    btn.setAttribute('baya',btn.getAttribute('baya')-1)

    EnemyAttack()

}


const EnemyAttack=()=>{
    const PokemonStats = document.querySelector('.myPokemon')
    const defense = PokemonStats.getAttribute('defense')
    const hp = PokemonStats.getAttribute('hp')
    const enemy =document.querySelector('.enemy')

    if(hp<=0) return 

    enemy.classList.add('golpe_enemy')
    setTimeout(()=>{
    enemy.classList.remove('golpe_enemy')
    },2300)

    const statsToMy ={
        hp,
        defense,
        damage:enemy.getAttribute('attack')
    }
    PokemonStats.setAttribute('hp',damage(statsToMy))

    if(damage(statsToMy)<=0){
        const layout_Fight = document.querySelector('.layout_fight')
        const GameOver = document.createElement('div')

        GameOver.classList.add('gameover')
        GameOver.textContent = 'GAME OVER'

        layout_Fight.appendChild(GameOver)
    }
    setTimeout(()=>{
        PokemonStats.childNodes[2].textContent=PokemonStats.getAttribute('hp')
        
    },2000)
}

export {layoutFight}