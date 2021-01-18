import React, {useState, useEffect} from 'react'
import './App.css';
import Recipe from './Components/Recipe'

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID
  const APP_KEY = process.env.REACT_APP_APP_KEY

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=coconut&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data)
  }
  
  const updateSearch = e => {
    setSearch(e.target.value)
  }
  
  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setQuery('')
  }

  useEffect( () => {
    getRecipes()
  }, [query])

  return (
    <div className="App">
      <form className='search-form' onSubmit={getSearch}>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}></input>
        <button className='search-button' type='submit'>Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} 
        />
      ))}
    </div>
  );
}

export default App;
