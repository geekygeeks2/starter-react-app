// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// eslint-disable-next-line
export default {
  items: [
    // {
    //   id: 'navigation',
    //   title: 'Materially',
    //   caption: 'Dashboard',
    //   type: 'group',
    //   icon: icons['NavigationOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'dashboard',
    //       title: 'Dashboard',
    //       type: 'item',
    //       icon: icons['HomeOutlinedIcon'],
    //       url: '/dashboard/default'
    //     }
    //   ]
    // },
    {
      id: 'pages',
      //title: 'Pages',
      //caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      role:['TOP_ADMIN','SUPER_ADMIN','ADMIN','AGENT','INVESTOR'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default',
          role:['TOP_ADMIN','SUPER_ADMIN','ADMIN','AGENT','INVESTOR'],
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          role:['TOP_ADMIN'],
        },
        {
          id: 'registration-page',
          title: 'Registration',
          type: 'item',
          url: '/registration',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          role:['TOP_ADMIN','SUPER_ADMIN','ADMIN','AGENT','INVESTOR'],
        },
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: icons['SecurityOutlinedIcon'],
          role:['TOP_ADMIN'],
          children: [
            {
              id: 'login-1',
              title: 'Login',
              type: 'item',
              url: '/application/login',
              target: true,
              role:['TOP_ADMIN'],
            },
            {
              id: 'register',
              title: 'Register',
              type: 'item',
              url: '/application/register',
              target: true,
              role:['TOP_ADMIN'],
            }
          ]
        }
      ]
    },
    {
      id: 'utils',
      title: 'Utils',
      type: 'group',
      icon: icons['AccountTreeOutlinedIcon'],
      role:['TOP_ADMIN'],
      children: [
        {
          id: 'util-icons',
          title: 'Icons',
          type: 'item',
          url: 'https://mui.com/material-ui/material-icons/',
          icon: icons['AppsOutlinedIcon'],
          external: true,
          target: true,
          role:['TOP_ADMIN']
        },
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/utils/util-typography',
          icon: icons['FormatColorTextOutlinedIcon'],
          role:['TOP_ADMIN']
        }
      ]
    },
    // {
    //   id: 'support',
    //   title: 'Support',
    //   type: 'group',
    //   icon: icons['ContactSupportOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       icon: icons['BlockOutlinedIcon'],
    //       disabled: true
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
    //       icon: icons['HelpOutlineOutlinedIcon'],
    //       chip: {
    //         label: 'Help?',
    //         color: 'primary'
    //       },
    //       external: true,
    //       target: true
    //     }
    //   ]
    // }
  ]
};
