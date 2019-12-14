import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/LoginContainer';
import B99Nav from './components/navbar/Navbar';
import { UserComponent } from './components/user-components/UserComponent';
import { Provider } from 'react-redux';
import { store } from './Store'

const App: React.FC = () => {
  return (
    <div className='App'>
      <Provider store={store}>
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
      </Provider>
    </div>
  );
};

export default App;
