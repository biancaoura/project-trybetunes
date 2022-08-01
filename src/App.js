import { React, Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorites from './components/Favorites';
import ProfileEdit from './components/ProfileEdit';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/search" component={ Search } />
        <Route path="/album/:id" component={ Album } />
        <Route path="/favorites" component={ Favorites } />
        <Route path="/profile/edit" component={ ProfileEdit } />
        <Route path="/profile" component={ Profile } />
        <Route component={ NotFound } />
      </BrowserRouter>
    );
  }
}

export default App;
