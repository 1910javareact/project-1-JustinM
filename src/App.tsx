import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/LoginContainer';
import B99Nav from './components/navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from './Store'
import UserDisplay from './components/user-component/UserContainer';
import ReimDisplay from './components/reimbursement-components/ReimContainer';

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
              <Route path='/user' component={UserDisplay} />
              <Route path='/reimbursement' component={ReimDisplay} />
              <Route path='/' component={Login} />
            </Switch>
          </header>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
