import { Route, Switch } from 'react-router-dom';
import Container from './components/Container/Container';
import Layout from './components/Layout/Layout';
import './App.css';
import Register from './containers/Users/Register/Register';
import Login from './containers/Users/Login/Login';
import RedirectToHome from './components/RedirectToHome/RedirectToHome';
import Home from './containers/Cocktails/Home/Home';
import SingleCocktail from './containers/Cocktails/SingleCocktail/SingleCocktail';
import AddNewCocktail from './containers/Cocktails/AddNewCocktail/AddNewCocktail';
import MyCocktailsPage from './containers/Cocktails/MyCocktailsPage/MyCocktailsPage';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Layout>
          <Container>
            <Route exact path='/' component={RedirectToHome} />
            <Route exact path='/home' component={Home} />
            <Route path='/home/:id' component={SingleCocktail} />
            <Route path='/addNewCocktail/' component={AddNewCocktail} />
            <Route path='/myCocktails/' component={MyCocktailsPage} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route />
          </Container>
        </Layout>
      </Switch>
    </div>
  );
}

export default App;
