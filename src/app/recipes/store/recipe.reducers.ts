import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState {
    recipes: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe('Banana Bread',
                   'A beautiful banana bread',
                   '//c1.staticflickr.com/6/5138/5529538337_86e82ce346_b.jpg',
                   [
                     new Ingredient('Eggs', 5),
                     new Ingredient('Water', 7)
                   ]),
        new Recipe('Apple Pie',
                   'An Apple Pie',
                   'https://upload.wikimedia.org/wikipedia/commons/4/4b/Apple_pie.jpg',
                   [
                    new Ingredient('Cinnamon', 1),
                    new Ingredient('Butter', 2)
                   ])
      ]
};

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const deletedRecipes = [...state.recipes];
            deletedRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: deletedRecipes
            };
        default:
            return state;
    }
}
