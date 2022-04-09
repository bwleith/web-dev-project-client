import './vendors/bootstrap/css/bootstrap.min.css';
import './vendors/bootstrap/bootstrap.min.css';
import './vendors/fontawesome/css/all.css';

import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import Profile from './components/Profile';
import Search from './components/Search';

import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter className="App">
      <div className="container">
          <Routes>
              <Route path="/home"
                     element={<HomeScreen/>}/>
              <Route path="/login"
                     element={<LoginScreen/>}/>
              <Route path="/profile"
                     element={<Profile/>}/>
              <Route path="/search"
                     element={<Search/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
