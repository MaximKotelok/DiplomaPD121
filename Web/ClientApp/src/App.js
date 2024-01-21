import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import { setupLocation } from './utils/Location';
import LayoutProvider from './components/LayoutProvider';

export default class App extends Component {
  static displayName = App.name;

    async componentDidMount() {
        await setupLocation();
    }

  render() {
    return (
<LayoutProvider>
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
      </LayoutProvider>            
    );
  }
}
