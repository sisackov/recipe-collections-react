# Recipe Collections App

This is the mid-project Appleseeds Bootcamp done in React.

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
        | Search                |                                                      |
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
        | IngredientsView       | recipe ingredients array                             |
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
