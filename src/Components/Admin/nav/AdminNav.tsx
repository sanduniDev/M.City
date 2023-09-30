import React from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { List, ListItemButton } from '@mui/material';
import { logOutHandler } from '../../Utils/tools';

interface AdminNavProps {
  navigate: NavigateFunction;
}

const AdminNav: React.FC<AdminNavProps> = ({ navigate }) => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin_matches',
    },
    {
      title: 'Players',
      linkTo: '/admin_players',
    },
  ];

  const renderItems = () => (
    links.map((link) => (
      <Link to={link.linkTo} key={link.title}>
        <ListItemButton className="admin_nav_link">
          {link.title}
        </ListItemButton>
      </Link>
    ))
  );

  return (
    <div>
      {renderItems()}
      <ListItemButton
        className="admin_nav_link"
        onClick={() => {
          logOutHandler();
          // Use navigate to navigate after logout if needed
          // Example: Redirect to the home page after logout
          navigate('/'); 
        }}
      >
        Log out
      </ListItemButton>
    </div>
  );
};

export default AdminNav;
