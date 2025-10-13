import { useRef, useCallback } from "react";
import axios from 'axios';

export const baseUrl = "http://localhost:3001";


export function useThrottle(callback, delay) {
  const timeoutRef = useRef(null);
  const latestArgsRef = useRef(null);

  const throttledFn = useCallback((...args) => {
    latestArgsRef.current = args;

    if (timeoutRef.current) return;

    timeoutRef.current = setTimeout(() => {
      if (latestArgsRef.current) {
        callback(...latestArgsRef.current);
      }

      timeoutRef.current = null;
      latestArgsRef.current = null;
    }, delay);
  }, [callback, delay]);

  return throttledFn;
};

export const getRecipesSchema = (ctx, cb) => {
  const api = baseUrl + "/api/v1/recipes";

  const body = {
    key: ctx.key.value,
  };

  axios.get(api, body)
    .then(response => {
      ctx.recipes.set(response.data);
      cb?.();
    })
    .catch(error => console.error('API error:', error));
};

export const newRecipeSchema = (ctx, cbFinally, cbSuccess) => {
  const api = baseUrl + "/api/v1/newRecipe";

  const body = {
    key: ctx.key.value,
    name: `Recipe ${ctx.recipes.value.length + 1}`,
    servings: 4,
    ingredients: [
      {
        "label": "water",
        "amount": { "whole": 1, "num": 0, "dem": 1 },
        "units": "cup",
      }
    ],
    procedure: ["Place water in cup"],
    tags: [],
    image: "test.webp"
  };

  axios.post(api, body)
    .then(response => {
      getRecipesSchema(ctx, cbSuccess(response.data.id));
    })
    .catch(error => console.error('API error:', error))
    .finally(() => {
      cbFinally();
    });
};

export const copyRecipeSchema = (ctx, id, newName, cbFinally, cbSuccess) => {
  const api = baseUrl + "/api/v1/newRecipe";

  const selectedRecipe = ctx.recipes.value.filter((recipe) => {
    return recipe.id === ctx.selectedId.value;
  })[0];

  if (!selectedRecipe) {
    return;
  }

  const body = {
    ...selectedRecipe,
    key: ctx.key.value,
    name: newName,
  };

  axios.post(api, body)
    .then(response => {
      getRecipesSchema(ctx, cbSuccess);
    })
    .catch(error => console.error('API error:', error))
    .finally(() => {
      cbFinally();
    });
};

export const deleteSchema = (ctx, id, cbFinally, cbSuccess) => {
  const api = baseUrl + "/api/v1/deleteRecipe";
  const body = {
    key: ctx.key.value,
    id: id,
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.filter(r => {
        return r.id != id;
      });
      ctx.selectedId.set("");
      ctx.recipes.set(newRecipes);
      cbSuccess();
    })
    .catch(error => console.error('API error:', error))
    .finally(() => { cbFinally() });
};

export const recipeNameSchema = (ctx, id, name) => {
  const api = baseUrl + "/api/v1/recipeName";
  const body = {
    key: ctx.key.value,
    id: id,
    name: name
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          name: r.id == id ? name : r.name,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};

export const servingsSchema = (ctx, id, servings) => {
  const api = baseUrl + "/api/v1/servings";
  const body = {
    key: ctx.key.value,
    id: id,
    servings: servings
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          servings: r.id == id ? servings : r.servings,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};

export const ingredientsSchema = (ctx, id, ingredients) => {
  const api = baseUrl + "/api/v1/ingredients";
  const body = {
    key: ctx.key.value,
    id: id,
    ingredients
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          ingredients: r.id == id ? ingredients : r.ingredients,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};

export const procedureSchema = (ctx, id, procedure) => {
  const api = baseUrl + "/api/v1/procedure";
  const body = {
    key: ctx.key.value,
    id: id,
    procedure
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          procedure: r.id == id ? procedure : r.procedure,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};

export const tagsSchema = (ctx, id, tags) => {
  const api = baseUrl + "/api/v1/tags";
  const body = {
    key: ctx.key.value,
    id: id,
    tags
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          tags: r.id == id ? tags : r.tags,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};

export const imageSchema = (ctx, id, image) => {
  const api = baseUrl + "/api/v1/image";
  const body = {
    key: ctx.key.value,
    id: id,
    image
  };

  axios.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          image: r.id == id ? image : r.image,
        };
      });
      ctx.recipes.set(newRecipes);
    })
    .catch(error => console.error('API error:', error));
};