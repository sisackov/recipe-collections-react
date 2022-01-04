# Recipe Collections App

This is my mid-project Appleseeds Bootcamp done in React.

The idea for building a recipe app came to me a long while ago because I love cooking and baking.
I wanted to share my recipes with others and have the ability to scale my recipe based on
the amount of servings I need or the amount of flour I have :worried: .

**https://recipe-collections.netlify.app/**

You can find React README [here](./misc/React_README.md).

## System Design

-   The **mockup outline** can be found [here](./misc/page-view-diagram.pdf).

*   ### **Pages**

    | Page Component    | Page Route                  | Component Hierarchy Tree                                   |
    | ----------------- | --------------------------- | ---------------------------------------------------------- |
    | LandingPage       | /                           | [App](./misc/app-diagram.pdf)                              |
    | LoginPage         | /login                      | [Login](./misc/login-diagram.pdf)                          |
    | SignUpPage        | /signup                     |                                                            |
    | Search            | /search                     | [Search](./misc/search-diagram.pdf)                        |
    | RecipeView        | /recipe/:recipe_id          | [RecipeView](./misc/recipe-view-diagram.pdf)               |
    | RecipeEdit        | /recipe/edit/:recipe_id     | [RecipeEdit](./misc/recipe-edit-diagram.pdf)               |
    | CollectionsList   | /collections                | [CollectionsList](./misc/collection-list-diagram.pdf)      |
    | CollectionRecipes | /collections/:collection_id | [CollectionRecipes](./misc/collection-recipes-diagram.pdf) |
    | ShopCart          | /cart                       | [ShopCart](./misc/shop-cart-diagram.pdf)                   |
    | BakingCalculator  | /calculator                 | [BakingCalculator](./misc/calculator-diagram.pdf)          |

*   ### **Components**

    | Component             | Props                                                |
    | --------------------- | ---------------------------------------------------- |
    | NavBar                |                                                      |
    | Footer                |                                                      |
    | ButtonComponent       | clickHandler, style                                  |
    | SocialLink            | clickHandler, style                                  |
    | FormComponent         | array of formObjects`{label,inputType}`, saveHandler |
    | HamburgerMenu         |                                                      |
    | SearchBar             |                                                      |
    | RecipeCard            | recipeData                                           |
    | RecipeSummary         | recipe ingredients#, prep time, calories#            |
    | NutrientsCard         | recipe ingredients array                             |
    | IngredientsView       | recipe ingredients array                             |
    | RelatedCarousel       | recipe title, ingredients array                      |
    | IngredientsForm       | recipe ingredients array                             |
    | CollectionCard        | collectionData`{title, recipeId array }`             |
    | CollectionRecipesCard | recipeId                                             |
    | ShopCartForm          | array of cartItems`{ingredient,quantity,unit}`       |
    | PrintButton           | array of cartItems?????                              |
    | CalculatorForm        | recipe ingredients array                             |

-   ### **APIs**

    | API           | Call Limits                                         | Documentation                                                |
    | ------------- | --------------------------------------------------- | ------------------------------------------------------------ |
    | FDC Food Data | 3,600/hour                                          | [Docs](https://fdc.nal.usda.gov/api-spec/fdc_api.html#/FDC/) |
    | Edamam        | 10,000/month                                        | [Docs](https://developer.edamam.com/edamam-docs-recipe-api)  |
    | Spoonacular   | 150 points/day(request = 1, each query param = 0.1) | [Docs](https://spoonacular.com/food-api/docs)                |
    | TheMealDB     | None                                                | [Docs](https://www.themealdb.com/api.php)                    |
    | Zestful       | 30/day                                              | [Docs](https://zestfuldata.com/docs)                         |
    | MockApi       | None                                                | [Docs](https://mockapi.io/docs)                              |

-   ### **Contexts**

    -   LoginContext
    -   WindowSize?

## **Timeline**

| Type             | Feature             | Task            | Done                  | Time           | Day          |
| ---------------- | ------------------- | --------------- | --------------------- | -------------- | ------------ |
| **Must Have**    |                     |                 |                       |                |              |
|                  | **APIs**            |                 | :white_check_mark:    | **3.5 hours**  | Thursday     |
|                  |                     | Edamam          | :white_check_mark:    | 2 hours        | Thursday     |
|                  |                     | FDC             | :white_check_mark:    | 0.5 hours      | Thursday     |
|                  |                     | Mockup          | :white_check_mark:    | 0.5 hours      | Thursday     |
|                  |                     | Spoonacular     | :white_check_mark:    | 0.5 hours      | Thursday     |
|                  | **Recipes**         |                 | :black_square_button: | **11.5 hours** |              |
|                  |                     | RecipeCard      | :white_check_mark:    | 2 hours        | Thursday     |
|                  |                     | RecipeView      | :white_check_mark:    | 2 hours        | Thursday     |
|                  |                     | RecipeEdit      | :black_square_button: | 2 hours        | Saturday eve |
|                  |                     | RecipeSummary   | :white_check_mark:    | 0.5 hours      | Saturday eve |
|                  |                     | NutrientsCard   | :white_check_mark:    | 3 hours        | Saturday eve |
|                  |                     | IngredientsView | :white_check_mark:    | 2 hours        | Sunday       |
|                  |                     | IngredientsForm | :black_square_button: | 2 hours        | Sunday       |
|                  | **Netlify**         |                 | :white_check_mark:    | **2 hours**    | Sunday       |
|                  | **Login**           |                 | :white_check_mark:    | **6 hours**    |              |
|                  |                     | LoginPage       | :white_check_mark:    | 3 hours        | Sunday       |
|                  |                     | SignUpPage      | :white_check_mark:    | 3 hours        | Monday       |
|                  | **Collections**     |                 | :black_square_button: | **6 hours**    | Monday       |
|                  |                     | List            | :white_check_mark:    | 2 hours        | Monday       |
|                  |                     | Recipes         | :black_square_button: | 2 hours        | Monday       |
|                  |                     | Create          | :white_check_mark:    | 2 hours        | Monday       |
|                  | **Search**          |                 | :black_square_button: | **4 hours**    | Monday       |
|                  |                     | SearchBar       | :black_square_button: | 3 hours        |              |
|                  |                     | SearchList      | :black_square_button: | 1 hours        |              |
|                  | **Styling**         |                 | :black_square_button: | **8 hours**    | Tuesday      |
| **Nice To Have** |                     |                 |                       |                |              |
|                  | **Hamburger**       |                 | :black_square_button: | **2 hours**    | Tuesday      |
|                  | **Shop Cart**       |                 | :black_square_button: | **3 hours**    | Tuesday      |
|                  | **Calculator**      |                 | :black_square_button: | **8 hours**    | Wednesday    |
|                  | **RelatedCarousel** |                 | :white_check_mark:    | **1.5 hours**  | Wednesday    |
|                  | **SocialLinks**     |                 | :black_square_button: | **1.5 hours**  | Wednesday    |
| **Future**       |                     |                 |                       |                |              |
|                  | **scroll** \*       |                 | :black_square_button: |                |              |
|                  | **postman** \*\*    |                 | :black_square_button: |                |              |

#### **Notes**

\* add infinite scroll to landing page/RecipeGrid

\*\* switch from mockApi to postman API
