const pokeNames = (app,data)=>{
    const div = document.createElement('div')
    div.classList.add('poke_list_element')
    div.setAttribute('url',data.url)
    div.draggable = true
    const name = document.createElement('p')
    name.textContent = data.name
    div.appendChild(name)
    app.appendChild(div)

    div.ondrag = (e)=>{
        e.dataTransfer.setData('text',data.url)
    }
}

export {pokeNames}