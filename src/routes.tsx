import React from 'react';
import { Route, BrowserRouter, Routes as ReactRoutes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';
import SignIn from './Components/Signin';

//admin routes
import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/Players/index';



interface RoutesProps {
  user: any;
}

const Routes: React.FC<RoutesProps> = ({ user }) => {
  console.log(user);
  
  const AuthGuardedDashboard = AuthGuard(Dashboard);
  const AuthGuardedAdminPlayers = AuthGuard(AdminPlayers); 

  return (
    <BrowserRouter>
      <Header user={user} />
      <ReactRoutes>
      <Route path="/admin_players" element={<AuthGuardedAdminPlayers {...user} />} />
        <Route path="/dashboard" element={<AuthGuardedDashboard {...user} />} />
        <Route path="/sign_in" element={<SignIn user={user} />} />
        <Route path="/" element={<Home />} />
      </ReactRoutes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;


//the routes that we want to guard we use AuthGuard