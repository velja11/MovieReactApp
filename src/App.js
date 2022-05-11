import Movies from "./components/Movies";
import Navigation from "./components/Navigation";
import {Route, Switch, Redirect} from 'react-router-dom'
import MyWatchList from "./components/MyWatchList";
import MoviesDetails from "./components/MoviesDetails";
import NoFoundPage from "./components/NoPageFound";
import About from "./components/About";
import Login from "./components/Login";
import { useContext } from "react";
import MovieContext from "./context/movie-context";
import Forms from "./components/Forms";



function App() {

  const movCtx = useContext(MovieContext)


  const isLogin = movCtx.idToken

  return (
    <div>
      <Navigation />
    <Switch>
    <Route path='/auth'>
        <Login />
      </Route>
      <Route path='/' exact>
        <Redirect to='/auth' />
      </Route>
      {isLogin && 
      <Route path='/forms'>
        <Forms />
      </Route>
      }
      {isLogin &&
      <Route path='/movies' exact>
      <Movies />
      </Route>
      } 
      {isLogin &&
      <Route path='/watchlist'>
        <MyWatchList />
      </Route>
      }
      {isLogin &&
      <Route path='/movies/:movieId'>
        <MoviesDetails />
      </Route>
      }
      <Route path='/about'>
        <About />
      </Route>
      <Route path='*'>
        <NoFoundPage />
      </Route>
    </Switch>
    
    </div>
  );
}

export default App;
