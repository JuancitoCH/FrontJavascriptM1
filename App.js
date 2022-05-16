import { pokedex } from "./components/pokedex.js"
const app = document.getElementById('root')

const pokedexApp = await pokedex()
app.appendChild(pokedexApp)