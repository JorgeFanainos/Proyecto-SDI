import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Registro from './components/pages/Registro';
import SignIn from './components/pages/SignIn';
import CardItem from './components/CardItem';
import Cards from './components/Cards';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/registro' component={Registro} />
          <Route path='/sign-in' component={SignIn} />
          <Route path='/psicologos' component={Cards} />
          <Route path='/contacto' component={Footer} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
