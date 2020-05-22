/**
 * @flow
 */

import {useState, useEffect} from 'react';

const mapRecipe = () => (recipe) => ({
  title: recipe.title,
  url: recipe.href,
});

const retrieveResults = () => (data) => data.results.map(mapRecipe());

const fetchRecipes = () =>
  fetch('https://api.github.com/users/davinyvidal')
    .then((response) => response.json())
    .then(retrieveResults());

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const saveRecipes = () => (newRecipes) => setRecipes(newRecipes);

  useEffect(() => {
    fetchRecipes().then(saveRecipes());
  }, []);

  return [recipes, setRecipes];
};
