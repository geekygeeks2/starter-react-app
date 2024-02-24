import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, Typography } from '@mui/material';

// project import
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| NAVGROUP ||============================== //

const NavGroup = ({ item }) => {
  const JWT_AUTH_TOKEN = localStorage.getItem("token");
  const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
  const roleName= USER && USER.userInfo && USER.userInfo.roleName
  const theme = useTheme();
  const items = roleName &&  item.children && item.children.length>0 && item.children.flatMap((menu) => menu.role && menu.role.length>0 && (menu.role.includes(roleName) ? menu : [])).map((menu) => {
    switch (menu && menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu && menu.id} variant="h6" color="error" align="center">
            Menu Items Error1
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
          {item.title}
          {item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption}
            </Typography>
          )}
        </Typography>
      }
    >
      {items}
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
  children: PropTypes.object,
  title: PropTypes.string,
  caption: PropTypes.string
};

export default NavGroup;
