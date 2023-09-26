import React from 'react';
import { Route, BrowserRouter, Routes as RouterRoutes } from 'react-router-dom';
import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';

function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <RouterRoutes>
        <Route path="/sign_in" element={<signIn />} />
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </RouterRoutes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;
