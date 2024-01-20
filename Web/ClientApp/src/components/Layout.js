import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import FooterComponent from './Footer/FooterComponent';
import "../styles/variables.css";
import "../styles/global.css";
import { matchPath } from 'react-router-dom';

export class Layout extends Component {
  static displayName = Layout.name;
  
  //isSpecificPage = window.location.pathname.startsWith("/map");
  render() {
    console.log(this.isSpecificPage)
    return (
      <div >
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
        <FooterComponent />
      </div>
    );
  }
}
