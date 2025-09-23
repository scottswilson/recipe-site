import TabView from "./components/TabView.js"


function App() {

  const recipes = [
    {
      "name": "Tacos",
      "servings": 10,
      "ingredients": [
        {
          "label": "meat, ground",
          "amount": 2,
          "units": "lbs.",
        }, {
          "label": "large onion, chopped",
          "amount": 1,
          "units": "",
        }, {
          "label": "black beans (1 can)",
          "amount": 400,
          "units": "mL",
        }, {
          "label": "salsa",
          "amount": 1,
          "units": "cup",
        }, {
          "label": "water",
          "amount": 1 / 2,
          "units": "cup",
        }, {
          "label": "chili powder",
          "amount": 4,
          "units": "tbsp",
        }, {
          "label": "salt",
          "amount": 1,
          "units": "tsp",
        }, {
          "label": "ground cumin",
          "amount": 1,
          "units": "tsp",
        }, {
          "label": "garlic powder",
          "amount": 3 / 4,
          "units": "tsp",
        }, {
          "label": "red pepper flakes",
          "amount": 1 / 2,
          "units": "tsp",
        }
      ],
      "procedure": [
        "Cook ground meat and onion in a large pot/dutch oven over medium heat until no longer pink",
        "Drain excess oil",
        "Add salsa from liquid measuring cup, wash remaining salsa into pot with water",
        "Add seasonings and beans",
        "Bring to a boil",
        "Reduce heat and simmer, uncovered, for about 15 minutes, or until most of the water has evaporated",
      ],
      'tags': ["mexican"],
      'image': 'test.webp',
    },
    {
      "name": "Peanut Butter Curry",
      "servings": 10,
      "ingredients": [
        {
          "label": "kosher salt, plus more to taste",
          "amount": 1,
          "units": "tbsp",
        }, {
          "label": "ground coriander",
          "amount": 2,
          "units": "tsp",
        }, {
          "label": "ground cumin",
          "amount": 2,
          "units": "tsp",
        }, {
          "label": "ground turmeric",
          "amount": 1,
          "units": "tsp",
        }, {
          "label": "paprika",
          "amount": 1,
          "units": "tsp",
        }, {
          "label": "cayenne pepper",
          "amount": 1 / 2,
          "units": "tsp",
        }, {
          "label": "chicken thighs, diced to 2-inch pieces",
          "amount": 5 / 2,
          "units": "lbs",
        }, {
          "label": "vegetable oil",
          "amount": 2,
          "units": "tbsp",
        }, {
          "label": "yellow onion, chopped",
          "amount": 1,
          "units": "",
        }, {
          "label": "cloves garlic, minced",
          "amount": 6,
          "units": "",
        }, {
          "label": "finely grated fresh ginger",
          "amount": 1,
          "units": "tbsp",
        }, {
          "label": "chicken broth, or to taste (originally 3.5 cup)",
          "amount": 3,
          "units": "cup",
        }, {
          "label": "unsweetened natural peanut butter",
          "amount": 3 / 4,
          "units": "cup",
        }, {
          "label": "ketchup",
          "amount": 1 / 2,
          "units": "cup",
        }, {
          "label": "packed brown sugar",
          "amount": 1,
          "units": "tbsp",
        }, {
          "label": "zucchini, cut into chunks",
          "amount": 1,
          "units": "lbs",
        }, {
          "label": "red bell pepper, cut into chunks",
          "amount": 1,
          "units": "",
        }, {
          "label": "green poblano pepper, diced",
          "amount": 1,
          "units": "",
        }, {
          "label": "hot cooked rice",
          "amount": 2,
          "units": "cup",
        }, {
          "label": "lime, for garnish",
          "amount": 1,
          "units": "",
        }, {
          "label": "roasted peanuts, plus more for garnish",
          "amount": 1 / 2,
          "units": "cup",
        }, {
          "label": "chopped fresh cilantro, for garnish",
          "amount": 3,
          "units": "tbsp",
        },
      ],
      "procedure": [
        "Mix salt, coriander, cumin, turmeric, paprika, and cayenne pepper together in a small bowl.",
        "Place chicken pieces in a separate bowl and add 1/2 of the spice blend. Mix together thoroughly to coat each surface with spice blend.",
        "Heat oil over high heat in a heavy pot. Brown half of the chicken pieces on all sides. Transfer to a bowl. Repeat with the rest of the chicken.",
        "Reduce heat to medium and add onion to pot. Saute until onions start to turn translucent and golden, 1 or 2 minutes. Add garlic and ginger; cook about 1 minute. Stir in remaining spice blend; cook and stir one minute. Pour in chicken broth. Add browned chicken along with accumulated juices. Stir in peanut butter and ketchup; add brown sugar. Bring to a simmer and reduce heat to maintain a gentle, steady simmer. Simmer, stirring occasionally, about 30 minutes.",
        "Transfer zucchini, red bell pepper, poblano pepper, and peanuts to the pot. Stir to mix. Continue simmering until chicken and vegetables are fork tender, 30 to 40 minutes. Remove from heat.",
        "Serve over rice with a squeeze of lime and a sprinkle of peanuts and chopped cilantro.",
      ],
      'tags': [""],
      'image': 'peanutbutter-curry.webp',
    },
    {
      "name": "Chicken Pot Pie",
      "servings": 4,
      "ingredients": [
        {
          "label": "large chicken breast, cooked, cubed",
          "amount": 2,
          "units": "",
        }, {
          "label": "potatoes, diced",
          "amount": 1,
          "units": "cup",
        }, {
          "label": "medium carrot, sliced",
          "amount": 1,
          "units": "",
        }, {
          "label": "butter (3/4 stick)",
          "amount": 3 / 8,
          "units": "cup",
        }, {
          "label": "large onion, chopped",
          "amount": 1 / 2,
          "units": "",
        }, {
          "label": "all purpose flour",
          "amount": 1 / 2,
          "units": "cup",
        }, {
          "label": "salt",
          "amount": 3 / 4,
          "units": "tsp",
        }, {
          "label": "thyme",
          "amount": 1,
          "units": "tsp",
        }, {
          "label": "pepper",
          "amount": 1/2,
          "units": "tsp",
        }, {
          "label": "milk",
          "amount": 3/4,
          "units": "cup",
        }, {
          "label": "chicken broth",
          "amount": 1 + 1/2,
          "units": "cups",
        }, {
          "label": "frozen vegetables (corn, peas, etc.)",
          "amount": 1,
          "units": "cup",
        }, {
          "label": "sheets refrigerated pie crusts",
          "amount": 4,
          "units": "",
        },
      ],
      "procedure": [
        "Place potatos and sliced carrots in a medium pot, add water to cover",
        "Bring to a boil, reduce heat, cook, covered, 8-10 minutes until crisp-tender",
        "Drain the water",
        "In a large pot/dutch oven, heat butter over medium-high heat",
        "Add onion and cook until tender",
        "Stir in flour and seasonings until blended",
        "Very slowly, add milk while stirring constantly",
        "Very slowly, add broth while stirring constantly",
        "Continue stirring until well mixed and thickened",
        "Stir in chicken, vegetables, and potato mixture",
        "Allow vegetables to cook in the filling before removing from heat",
        "Roll puff pastry dough out to about 30 cm x 40 cm",
        "Add chicken pot pie mixture to half of the rolled out pastry",
        "Fold the other half over mixture and seal edge with a fork",
        "Brush oil over pastry and poke holes with a paring knife",
        "Bake for 15-20 minutes or until golden brown",
      ],
      'tags': [""],
      'image': 'chicken-pot-pie.webp',
    },
  ]

  return (
    <TabView recipes={recipes} />
  );
}

export default App;
