import React from 'react'
import style from '../css/recipe.module.css'


const Recipe = ({title, calories, image, ingredients}) => {
  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <p>{calories} Calories</p>
      <img className={style.image} src={image} alt={title}></img>
      <ul>
        {ingredients.map(ingredient => (
          <li>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Recipe