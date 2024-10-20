import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import CountryList from './components/CountryList';
import CountryForm from './components/CountryForm';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/countries" component={CountryList} />
          <Route path="/countries/:id" component={CountryForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;