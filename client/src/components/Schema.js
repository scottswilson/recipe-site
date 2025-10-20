import { useRef, useCallback } from "react";
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const axiosApi = axios.create({
  baseURL,
  withCredentials: true, // Send cookies with requests
});

export const State = {
  INIT: 0,
  LOGIN: 1,
  REGISTER: 2,
  VIEW: 3,
  EDIT: 4,
};

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

export const getRecipesSchema = (ctx, onSuccess, onFail) => {
  const api = "/api/v1/recipes";

  axiosApi.get(api)
    .then(response => {
      ctx.recipes.set(response.data);
      const firstRecipe = response.data[0] || { id: "" };
      ctx.selectedId.set(firstRecipe.id);
      onSuccess?.();
    })
    .catch(error => {
      console.error('API error:', error);
      onFail?.();
    });
};

export const newRecipeSchema = (ctx, cbFinally, cbSuccess) => {
  const api = "/api/v1/newRecipe";

  const newRecipe = {
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
    image: ""
  };

  axiosApi.post(api, newRecipe)
    .then(response => {
      let newRecipes = ctx.recipes.value.concat([{
        ...newRecipe,
        id: response.data.id
      }]);
      ctx.recipes.set(newRecipes);
      ctx.selectedId.set(response.data.id);
      cbSuccess();
    })
    .catch(error => console.error('API error:', error))
    .finally(() => {
      cbFinally();
    });
};

export const copyRecipeSchema = (ctx, id, newName, cbFinally, cbSuccess) => {
  const api = "/api/v1/newRecipe";

  const selectedRecipe = ctx.recipes.value.filter((recipe) => {
    return recipe.id === ctx.selectedId.value;
  })[0];

  if (!selectedRecipe) {
    return;
  }

  const newRecipe = {
    ...selectedRecipe,
    name: newName,
  };

  axiosApi.post(api, newRecipe)
    .then(response => {
      let newRecipes = ctx.recipes.value.concat([{
        ...newRecipe,
        id: response.data.id
      }]);
      ctx.recipes.set(newRecipes);
      ctx.selectedId.set("");
      cbSuccess();
    })
    .catch(error => console.error('API error:', error))
    .finally(() => {
      cbFinally();
    });
};

export const deleteSchema = (ctx, id, cbFinally, cbSuccess) => {
  const api = "/api/v1/deleteRecipe";
  const body = {
    id: id,
  };

  axiosApi.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.filter(r => {
        return r.id != id;
      });
      const firstRecipe = newRecipes[0] || { id: "" };
      ctx.selectedId.set(firstRecipe.id);
      ctx.recipes.set(newRecipes);
      cbSuccess();
    })
    .catch(error => console.error('API error:', error))
    .finally(() => { cbFinally() });
};

export const recipeNameSchema = (ctx, id, name) => {
  const api = "/api/v1/recipeName";
  const body = {
    id: id,
    name: name
  };

  axiosApi.post(api, body)
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
  const api = "/api/v1/servings";
  const body = {
    id: id,
    servings: servings
  };

  axiosApi.post(api, body)
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
  const api = "/api/v1/ingredients";
  const body = {
    id: id,
    ingredients
  };

  axiosApi.post(api, body)
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
  const api = "/api/v1/procedure";
  const body = {
    id: id,
    procedure
  };

  axiosApi.post(api, body)
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
  const api = "/api/v1/tags";
  const body = {
    id: id,
    tags
  };

  axiosApi.post(api, body)
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

export const imageSchema = (ctx, id, image, cbFinally, cbSuccess) => {
  const api = "/api/v1/image";
  const body = {
    id: id,
    image
  };

  axiosApi.post(api, body)
    .then(response => {
      let newRecipes = ctx.recipes.value.map(r => {
        return {
          ...r,
          image: r.id == id ? image : r.image,
        };
      });
      ctx.recipes.set(newRecipes);
      cbSuccess();
    })
    .catch(error => console.error('API error:', error))
    .finally(() => {
      cbFinally();
    });
};

export const loginSchema = (ctx, info, cbSuccess, cbFailed) => {
  const api = "/api/v1/login";
  const body = info;

  axiosApi.post(api, body)
    .then(response => {
      cbSuccess();
    })
    .catch(error => {
      cbFailed(error);
      console.log(error);
    });
};

export const logoutSchema = (ctx) => {
  const api = "/api/v1/logout";

  axiosApi.get(api)
    .then(response => {
      ctx.state.set(State.LOGIN);
    })
    .catch(error => {
      console.log(error);
    });
};

export const registerSchema = (ctx, info, cbSuccess, cbFailed) => {
  const api = "/api/v1/register";

  axiosApi.post(api, info)
    .then(response => {
      cbSuccess();
    })
    .catch(error => {
      cbFailed(error);
      console.log(error);
    });
};

export const dashboardSchema = (ctx) => {
  const api = "/api/v1/dashboard";

  axiosApi.get(api)
    .then(response => {
      ctx.loggedIn.set(true);
    })
    .catch(error => {
      ctx.loggedIn.set(false);
      console.log(error);
    });
};