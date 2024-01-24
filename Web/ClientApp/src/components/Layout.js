import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import FooterComponent from './Footer/FooterComponent';
import "../styles/variables.css";
import "../styles/global.css";
import LayoutProvider from './LayoutProvider';
import LayoutContext from './LayoutContext';
import SearchComponent from './AddProductComponents/SearchComponent/SearchComponent';
export class Layout extends Component {
  static displayName = Layout.name;
  static contextType = LayoutContext;
  

  render() {    
    return (
        <div className={this.context.isComponentMounted?"map-container":""}>
          <NavMenu />
          <Container tag="main">        
            {this.props.children}
          </Container>
          <FooterComponent />
        </div>
      
    );
  }
}
