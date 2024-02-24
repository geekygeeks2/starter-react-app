import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import { Navigate } from 'react-router-dom';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));
const Registration = Loadable(lazy(()=>import('../views/Registration')))

const AuthLogin = Loadable(lazy(() => import('../views/Login')));
const AuthRegister = Loadable(lazy(() => import('../views/Register')));

// ==============================|| MAIN ROUTES ||============================== //
const JWT_AUTH_TOKEN = localStorage.getItem("token");
const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
const roleName= USER && USER.userInfo && USER.userInfo.roleName

// {
//   path: 'login',
//   element: <LoginPage />,
// },

  const MainRoutes = {
    path:  '/',
    element:  USER?<MainLayout />:<MinimalLayout />,
    children: [
      {
        path: '/',  
        element:<DashboardDefault />
      },
      {
        path:  '/dashboard/default',
        element: <DashboardDefault /> 
      },
      { path: '/utils/util-typography', element:  <UtilsTypography /> },
      { path: '/sample-page',element:   <SamplePage />  },
      { path: '/registration', element: <Registration /> }
    ]
  };


export default MainRoutes;
