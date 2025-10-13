import { useState } from 'react';
import TabView from "./components/TabView.js"
import {sampleRecipes} from "./components/Common"

function App() {

  const [recipes, setRecipes] = useState(sampleRecipes);
  const [id, setId] = useState("");
  const [key, setKey] = useState("");

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
  };

  return (
    <TabView ctx={ctx} />
  );
}

export default App;
