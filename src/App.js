import './App.css';
import Nav from './Components/Nav/Nav';
import {Switch,Route} from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage';
import CocktailDesc from './Components/CocktailDesc/CocktailDesc';
function App() {
  return (
    <main>
      <Nav/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/cocktail/:id" component={CocktailDesc} />
      </Switch>
    </main>
  );
}

export default App;
