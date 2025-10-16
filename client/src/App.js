import { useState, useEffect } from 'react';
import TabView from "./components/TabView.js"
import LoginPage from "./components/Login.js"
import { sampleRecipes } from "./components/Common"
import {
  getRecipesSchema,
} from "./components/Schema"

function App() {

  const [recipes, setRecipes] = useState(sampleRecipes);
  const [id, setId] = useState("");
  const [key, setKey] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const ctx = {
    recipes: {
      value: recipes,
      set: setRecipes,
    },
    selectedId: {
      value: id,
      set: setId,
    },
    key: {
      value: key,
      set: setKey,
    },
    loggedIn: {
      value: loggedIn,
      set: setLoggedIn,
    },
  };

  useEffect(() => {
    getRecipesSchema(ctx);
  }, []);

  return (
    <>
      {loggedIn ? (
        <TabView ctx={ctx} />
      ) : (
        <LoginPage ctx={ctx} />
      )}
    </>
  );
}

export default App;
