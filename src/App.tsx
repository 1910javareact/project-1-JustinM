import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './components/login/Login';
import B99Nav from './components/navbar/Navbar';
import { UserComponent } from './components/user-components/UserComponent';

const App: React.FC = () => {
  return (
    <div className='App'>
    <Router>
      <nav>
        <B99Nav />
      </nav>
      <header className='App-header'>
        <Switch>
          <Route path='/user' component={UserComponent} />
          <Route path='/' component={Login} />
        </Switch>
      </header>
    </Router>
    </div>
  );
};

export default App;
