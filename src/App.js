import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink as RRNavLink
} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';

import About from './components/About';
import Home from './components/Home';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar className="shadow" dark style={{  background: 'rgba(6, 117, 255, 0.54)' }}  expand="md">
            <NavbarBrand tag={RRNavLink} exact to="/">Digital Image Processing</NavbarBrand>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={RRNavLink} exact to="/about" activeClassName="active">About</NavLink>
                </NavItem>
              </Nav>
          </Navbar>
          <Route exact path="/" component={Home}/>
          <Route path="/Digital-Image-Processing/" component={Home}/>
          <Route path="/home" component={Home}/>
          <Route path="/about" component={About}/>
          <Footer/>
        </div>
      </Router>
    );
  }
}


export default App;