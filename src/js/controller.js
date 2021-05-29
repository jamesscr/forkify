import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0. Update results view to mark selected search result active
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1. Loading Recipe
    await model.loadRecipe(id);

    //  2. rendering Recipe
    recipeView.render(model.state.recipe);
    // TEST
    // controlServings();
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get search queries
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Render results
    resultsView.render(model.getSearchResultsPage());

    // 4. Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1. Render new Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2. Render new pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // update recipe servings(in states)
  model.updateServings(newServings);

  // update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);

};

const controlAddBookmark=function(){
  // Add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // Update recipe view
  recipeView.update(model.state.recipe);

  // render Bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();