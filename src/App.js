import React, {useState, useEffect} from 'react'
import './App.css';
import Recipe from './Components/Recipe'

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID
  const APP_KEY = process.env.REACT_APP_APP_KEY

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`
    )
    const data = await response.json()
    setRecipes(data.hits)
    console.log(data)
  }
  
  const [recipes, setRecipes] = useState([])

  useEffect( () => {
    getRecipes()
  }, [])

  return (
    <div className="App">
      <form className='search-form'>
        <input className='search-bar' type='text'></input>
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
