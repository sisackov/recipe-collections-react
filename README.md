# Recipe Collections App

This is my mid-project Appleseeds Bootcamp done in React.

The idea for building a recipe app came to me a long while ago because I love cooking and baking.
I wanted to share my recipes with others and have the ability to scale my recipe based on
the amount of servings I need or the amount of flour I have :worried: .

**https://recipe-collections.netlify.app/**

You can find React README [here](./misc/React_README.md).

## System Design

-   The **mockup outline** can be found [here](./misc/component-diagrams.drawio)
-   The **component hierarchy trees** can be found [here](./misc/page-view-diagrams.drawio)
-   The diagrams can be opened with [Drawing.io](https://app.diagrams.net/)

    ### **Components Pseudo Code**

    -   ### **Pages**

        | Page Component    | Page Route                  |
        | ----------------- | --------------------------- |
        | LandingPage       | /                           |
        | LoginPage         | /login                      |
        | SignUpPage        | /signup                     |
        | Search            | /search                     |
        | RecipeView        | /recipe/:recipe_id          |
        | RecipeEdit        | /recipe/edit/:recipe_id     |
        | CollectionsList   | /collections                |
        | CollectionRecipes | /collections/:collection_id |
        | ShopCart          | /cart                       |
        | BakingCalculator  | /calculator                 |

    -   ### **Components**

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
        | NutritionalCard       | recipe ingredients array                             |
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

| Type             | Feature             | Task            | Done  | Time           | Day          |
| ---------------- | ------------------- | --------------- | ----- | -------------- | ------------ |
| **Must Have**    |                     |                 |       |                |              |
|                  | **APIs**            |                 | - [x] | **3.5 hours**  | Thursday     |
|                  |                     | Edamam          | - [x] | 2 hours        | Thursday     |
|                  |                     | FDC             | [x]   | 0.5 hours      | Thursday     |
|                  |                     | Mockup          | [x]   | 0.5 hours      | Thursday     |
|                  |                     | Spoonacular     | [ ]   | 0.5 hours      | Thursday     |
|                  | **Recipes**         |                 | [ ]   | **11.5 hours** |              |
|                  |                     | RecipeView      | [ ]   | 2 hours        | Thursday     |
|                  |                     | RecipeEdit      | [ ]   | 2 hours        | Saturday eve |
|                  |                     | RecipeSummary   | [ ]   | 0.5 hours      | Saturday eve |
|                  |                     | NutritionalCard | [ ]   | 3 hours        | Saturday eve |
|                  |                     | IngredientsView | [ ]   | 2 hours        | Sunday       |
|                  |                     | IngredientsForm | [ ]   | 2 hours        | Sunday       |
|                  | **Netlify**         |                 | [ ]   | **2 hours**    | Sunday       |
|                  | **Login**           |                 | [ ]   | **6 hours**    |              |
|                  |                     | LoginPage       | [ ]   | 3 hours        | Sunday       |
|                  |                     | SignUpPage      | [ ]   | 3 hours        | Monday       |
|                  | **Collections**     |                 | [ ]   | **6 hours**    | Monday       |
|                  |                     | List            | [ ]   | 2 hours        | Monday       |
|                  |                     | Recipes         | [ ]   | 2 hours        | Monday       |
|                  |                     | Create          | [ ]   | 2 hours        | Monday       |
|                  | **Search**          |                 | [ ]   | **4 hours**    | Monday       |
|                  |                     | SearchBar       | [ ]   | 3 hours        |              |
|                  |                     | SearchList      | [ ]   | 1 hours        |              |
|                  | **Styling**         |                 | [ ]   | **8 hours**    | Tuesday      |
| **Nice To Have** |                     |                 |       |                |              |
|                  | **Hamburger**       |                 | [ ]   | **2 hours**    | Tuesday      |
|                  | **Shop Cart**       |                 | [ ]   | **3 hours**    | Tuesday      |
|                  | **Calculator**      |                 | [ ]   | **8 hours**    | Wednesday    |
|                  | **RelatedCarousel** |                 | [ ]   | **1.5 hours**  | Wednesday    |
|                  | **SocialLinks**     |                 | [ ]   | **1.5 hours**  | Wednesday    |
| **Future**       |                     |                 |       |                |              |
|                  | **scroll** \*       |                 | [ ]   |                |              |
|                  | **postman** \*\*    |                 | [ ]   |                |              |

#### **Notes**

\* add infinite scroll to landing page/RecipeGrid

\*\* switch from mockApi to postman API
