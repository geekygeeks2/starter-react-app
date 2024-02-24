import React from 'react';

// material-ui
import { Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

// ==============================|| MENULIST ||============================== //

const MenuList = () => {
  const JWT_AUTH_TOKEN = localStorage.getItem("token");
  const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
  const roleName= USER && USER.userInfo && USER.userInfo.roleName
  const navItems = roleName && menuItem.items.flatMap((menu) => (menu.role.includes(roleName)  ? menu : [])).map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;
