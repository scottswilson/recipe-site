import { useState, useEffect } from 'react';

import TabView from "./components/TabView"
import LoadingPage from "./components/LoadingPage"
import LoginPage from "./components/Login"
import RegisterPage from "./components/Register"
import {
  State,
  getRecipesSchema,
} from "./components/Schema"
import EditRecipe from './components/EditRecipe/EditRecipe.js';


import Collapse from '@mui/material/Collapse';


function App() {
  const [recipes, setRecipes] = useState([]);
  const [id, setId] = useState("");
  const [state, setState] = useState(State.INIT);
  const [tab, setTab] = useState(0);

  const ctx = {
    recipes: {
      value: recipes,
      set: setRecipes,
    },
    selectedId: {
      value: id,
      set: setId,
    },
    state: {
      value: state,
      set: setState,
    },
    tab: {
      value: tab,
      set: setTab,
    },
  };

  useEffect(() => {
    const onSuccess = () => {
      setState(State.VIEW);
    };
    const onFail = () => {
      setState(State.LOGIN);
    };
    getRecipesSchema(ctx, onSuccess, onFail);
  }, []);


  return (
    <>
      <Collapse in={state == State.LOGIN} unmountOnExit >
        <LoginPage ctx={ctx} />
      </Collapse>
      <Collapse in={state == State.REGISTER} unmountOnExit >
        <RegisterPage ctx={ctx} />
      </Collapse>
      <Collapse in={state == State.VIEW} unmountOnExit >
        <TabView ctx={ctx} />
      </Collapse>
      <Collapse in={state == State.EDIT} unmountOnExit >
        <EditRecipe ctx={ctx} />
      </Collapse>
      <Collapse in={state == State.INIT} unmountOnExit >
        <LoadingPage ctx={ctx} />
      </Collapse>
    </>
  );
}

export default App;
