<<<<<<< HEAD
import * as model from './model.js';
import recipeView from './views/recipeView.js';
=======
import * as model from './model.js'
>>>>>>> a1bfe7d362dfe3079b89e1ba8727a5f7aa8b02d8
// import icons from '../img/icons.svg'; // parcel 1
import icons from 'url:../img/icons.svg'; // parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////s///


const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
<<<<<<< HEAD

    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

=======

    renderSpinner(recipeContainer);
    // 1. Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;


>>>>>>> a1bfe7d362dfe3079b89e1ba8727a5f7aa8b02d8
    //  2. rendering Recipe
    recipeView.render(model.state.recipe);


  } catch (err) {
    alert(err)
  }
};
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));