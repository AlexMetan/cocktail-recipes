import './App.css';
import Nav from './Components/Nav/Nav';
import {Switch,Route} from 'react-router-dom'
import HomePage from './Components/HomePage/HomePage';
import CocktailDesc from './Components/CocktailDesc/CocktailDesc';
import SearcherPage from './Components/SearcherPage/SearcherPage';
import Page404 from './Components/Page404/Page404';
function App() {
  return (
    <main>
      <Nav/>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/searcher" exact component={SearcherPage}/>
        <Route path="/cocktail/:id" component={CocktailDesc} />
        <Route path="/404" component={Page404} />
        <Route component={Page404} />
      </Switch>
    </main>
  );
}

export default App;
