import React from 'react';
import { Route, BrowserRouter, Routes as ReactRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthGuard from './Hoc/Auth';

import Header from './Components/Header_footer/header';
import Footer from './Components/Header_footer/footer';
import Home from './Components/Home';
import SignIn from './Components/Signin';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from './Components/NotFound';

import Dashboard from './Components/Admin/Dashboard';
import AdminPlayers from './Components/Admin/Players/index';
import AddEditPlayers from './Components/Admin/Players/addEditPlayers';
import AdminMatches from './Components/Admin/matches';
import AddEditMatch from './Components/Admin/matches/addEdirMatch';

interface RoutesProps {
  user: any;
}

const Routes: React.FC<RoutesProps> = ({ user }) => {
  const AuthGuardedDashboard = AuthGuard(Dashboard);
  const AuthGuardedAdminPlayers = AuthGuard(AdminPlayers);
  const AuthGuardedAddEditPlayers = AuthGuard(AddEditPlayers);
  const AuthGuardedAdminMatches = AuthGuard(AdminMatches);
  const AuthGuardedAddEditMatch = AuthGuard(AddEditMatch);

  return (
    <BrowserRouter>
      <Header user={user} />
      <ReactRoutes>
        <Route path="/admin_matches/edit_match/:matchid" element={<AuthGuardedAddEditMatch />} />
        <Route path="/admin_matches/add_match" element={<AuthGuardedAddEditMatch />} />
        <Route path="/admin_matches" element={<AuthGuardedAdminMatches />} />
        <Route path="/admin_players/edit_player/:playerid" element={<AuthGuardedAddEditPlayers />} />
        <Route path="/admin_players/add_player" element={<AuthGuardedAddEditPlayers />} />
        <Route path="/admin_players" element={<AuthGuardedAdminPlayers />} />
        <Route path="/dashboard" element={<AuthGuardedDashboard />} />

        <Route path="/matches" element={<TheMatches />} />
        <Route path="/the_team" element={<TheTeam />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />   
      </ReactRoutes>
      <ToastContainer />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
