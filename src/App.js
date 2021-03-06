import React, {useState, useEffect} from 'react'
import './App.css';
import Recipe from './Components/Recipe'

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID
  const APP_KEY = process.env.REACT_APP_APP_KEY

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
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
    setSearch('')
  }

  useEffect( () => {
    getRecipes()
  }, [query])

  return (
    <div className='App'>
      <div className='title'>
        <h1>Recipeez<br/></h1>
        <h2>Find cooking inspiration, find recipes the easy way !</h2>
      </div>
      <form className='search-form' onSubmit={getSearch}>
        <input
          className='search-bar'
          type='text'
          value={search}
          onChange={updateSearch}
        />
        <button className='search-button' type='submit'>Search recipes</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.uri}
            title={recipe.recipe.label}
            calories={Math.floor(recipe.recipe.calories)}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;
