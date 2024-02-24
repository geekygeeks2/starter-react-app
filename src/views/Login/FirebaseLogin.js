import React from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';

//  third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Google from 'assets/images/social-google.svg';
import { encryptAES } from 'views/Utils/helper';
import { SETTING } from 'app-config/cofiguration';

// ==============================|| FIREBASE LOGIN ||============================== //

const FirebaseLogin = ({ ...rest }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loader, setLoader] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      {/* <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Button
            fullWidth={true}
            sx={{
              fontSize: { md: '1rem', xs: '0.875rem' },
              fontWeight: 500,
              backgroundColor: theme.palette.grey[50],
              color: theme.palette.grey[600],
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: theme.palette.grey[100]
              }
            }}
            size="large"
            variant="contained"
          >
            <img
              src={Google}
              alt="google"
              width="20px"
              style={{
                marginRight: '16px',
                '@media (maxWidth:899.95px)': {
                  marginRight: '8px'
                }
              }}
            />{' '}
            Sign in with Google
          </Button>
        </Grid>
      </Grid> */}

      {/* <Box alignItems="center" display="flex" mt={2}>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
        <Typography color="textSecondary" variant="h5" sx={{ m: theme.spacing(2) }}>
          OR
        </Typography>
        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
      </Box> */}

      <Formik
        initialValues={{
          userId: '',
          password: '',
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().max(10).required('User Id is required'),
          password: Yup.string().max(15).required('Password is required')
        })}

        onSubmit={async(values, { setSubmitting }) => {
          //console.log("valuesvaluesvalues", values)
          //setLoader(true)                                           
            let dataToSend = {
              userId: values.userId,
              password: encryptAES(values.password),
            };
            
            await Axios.post(SETTING.APP_CONSTANT.API_URL+`public/userlogin`, dataToSend)
            .then((res) => {
              setLoader(false)
              if (res && res.data.success) {
                const user = res.data.data.user
                localStorage.setItem("userInformation", JSON.stringify(res.data.data.user))
                localStorage.setItem("token", JSON.stringify(res.data.data.token))
                //toast["success"]("Logged in successfully");
                //saveSecurityLogs(menuUrl,"Login", undefined, user._id)
                  const roleName= user.userInfo.roleName
                window.location.href='/'
                //navigate('/dashboard/default', { replace: true });
              } else {
                //toast["error"](res && res.data && res.data.message? res.data.message:"user name or Password is wrong. Please try again!");
              }
            })
            .catch((err) =>{
              setLoader(false)
              const errorMessage = 'Login error'
              //toast["error"](errorMessage);
            });

            return false;
        }}

        // onSubmit={ async (values, { setSubmitting }) => {
    
        // }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...rest}>
            <TextField
              error={Boolean(touched.userId && errors.userId)}
              fullWidth
              helperText={touched.userId && errors.userId}
              label="Win Peak Trade Id"
              margin="normal"
              name="userId"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.userId}
              variant="outlined"
            />

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mt: theme.spacing(3), mb: theme.spacing(1) }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text">
                  {' '}
                  {errors.password}{' '}
                </FormHelperText>
              )}
            </FormControl>
            {/* <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="subtitle2" color="primary" sx={{ textDecoration: 'none' }}>
                  Forgot Password?
                </Typography>
              </Grid>
            </Grid> */}

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box mt={2}>
              <Button color="primary" 
              //disabled={isSubmitting} 
              fullWidth size="large" type="submit" variant="contained">
                Log In
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
