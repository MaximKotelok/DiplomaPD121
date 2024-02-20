import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
// import { Layout } from './layouts/UserLayout/Layout';
import './custom.css';
import { setupLocation } from './utils/Location';
import LayoutProvider from './layouts/LayoutProvider';
// import LayoutAdmin from './components/pages/Admin/LayoutAdmin';
import "./styles/variables.css";
import "./styles/global.css"
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  static displayName = App.name;

  async componentDidMount() {
    await setupLocation();
  }

  render() {
    return (
      <LayoutProvider>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, Layout, ...rest } = route;
  
            const RenderedElement = Layout ? (
              <Layout>{element}</Layout>
            ) : (
              element
            );
  
            return <Route key={index} {...rest} element={RenderedElement} />;
          })}
        </Routes>
      </LayoutProvider>
    );
  }
  
}
