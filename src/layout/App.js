import React ,{ lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// material-ui
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// third-party
import { useSelector } from 'react-redux';

// project import
import theme from 'themes';
import Router from 'routes/index';
import NavigationScroll from './NavigationScroll';
import Loadable from 'component/Loadable';
const AuthLogin = Loadable(lazy(() => import('../views/Login')));

// ==============================|| APP ||============================== //

const App = () => {
  const JWT_AUTH_TOKEN = localStorage.getItem("token");
  const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
  const roleName= USER && USER.userInfo && USER.userInfo.roleName
  const customization = useSelector((state) => state.customization);

  return (
    <>
      {
        <NavigationScroll>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
              <CssBaseline />
              <Routes>
              <Route path="/login" element={<AuthLogin />} />
              {/* <Route path="/forgotPassword" element={<ForgotPasswordPage />} /> */}
              {JWT_AUTH_TOKEN ? (
                <Route
                  path="/*"
                  element={<Router />}
                />
              ) : (
                <Route
                  path="/*"
                  element={<Navigate to="/login" />}
                />
              )}
              </Routes>
             
            </ThemeProvider>
          </StyledEngineProvider>
        </NavigationScroll>
      }
    </>
  );
};

export default App;
