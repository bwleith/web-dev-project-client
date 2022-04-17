import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';
import Search from './components/Search';
import Details from './components/Details';

import './App.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router className="App">
      <div className="container">
          <Routes>
              <Route path="/"
                     element={<HomeScreen/>}/>
              <Route path="/login"
                     element={<LoginScreen/>}/>
              <Route path="/profile"
                     element={<Profile/>}/>
              <Route path="/search"
                     element={<Search/>}/>
              <Route path="/search/:movieSearch"
                     element={<Search/>}/>
              <Route path="/details/:imdbID"
                     element={<Details/>}/>
          </Routes>
      </div>
    </Router>
  );
}

export default App;
