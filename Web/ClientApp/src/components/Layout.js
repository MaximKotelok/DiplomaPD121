import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import FooterComponent from './Footer/FooterComponent';
import "../styles/variables.css";
import "../styles/global.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">
          {this.props.children}
        </Container>
        <FooterComponent />
      </div>
    );
  }
}
