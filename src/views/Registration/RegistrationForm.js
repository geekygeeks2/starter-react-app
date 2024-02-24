import React from 'react';
import Axios from "axios";
import { Button,
    DialogActions,
    DialogContent,
    DialogTitle,     
    Typography, 
    Grid,
    TextField,
    Autocomplete,
    Box,
} from '@mui/material';
import {RegisterFormValidation as validationSchema} from '../Utils/validation';
import { useFormik } from 'formik';
import { SETTING } from 'app-config/cofiguration';


const RegisterationForm = ({handleCloseModal}) => {
    const formik = useFormik({
        initialValues :{
            firstName:"",
            lastName:"",
            gender:"",
            phone1:"",
            email:"",
            aadharNumber:"",
            panNumber:""
       },
        validationSchema,
       onSubmit: async (values) => {
        console.log("values",values)    
          //setLoader(true)
          let dataToSend = {
           ...values,
           roleName:"AGENT"
          };
          let options = SETTING.HEADER_PARAMETERS;
          options['Authorization'] = localStorage.getItem("token")
          await Axios.post(SETTING.APP_CONSTANT.API_URL+`admin/addUser`, dataToSend,{headers: options})
          .then((res) => {
            setLoader(false)
            if (res && res.data.success) {
                handleCloseModal()
              //toast["success"]("Logged in successfully");
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
      
        }
    })
   
    const genderData = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Other', label: 'Other' },
      ];
    const handleClose = () => {
        handleCloseModal()
    }

  return (
    <>
        <Box paddingY={7}>
        <form onSubmit={formik.handleSubmit}>
            <DialogTitle align='center' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <Typography variant='h4'>
                    {/* <Iconify icon="gridicons:briefcase" width="1em"  style={{color: '#45AA97', marginRight:"7px"}} /> */}
                    Registration Form
                </Typography>
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2} paddingX={5} paddingTop={2}>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        fullWidth
                        name="firstName" 
                        label="First Name" 
                        type='text'
                        value={formik.values?.firstName}
                        error={formik.touched.firstName && !!formik.errors.firstName}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        fullWidth 
                        name="lastName" 
                        label="Last Name" 
                        type='text' 
                        value={formik.values?.lastName}
                        error={formik.touched.lastName && !!formik.errors.lastName}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
              disablePortal
              options={genderData}
              name="gender"
              fullWidth
              onChange={(event, newValue) => {
                formik.setFieldValue("gender",newValue?.label); // Set the value in formik
              }}
              value={formik.values?.gender}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={Boolean(
                    formik?.touched?.gender &&
                      formik?.errors?.gender
                  )}
                  name="gender"
                  helperText={
                    formik.touched.gender &&
                    formik.errors.gender
                  }
                  label="Gender"
                />
              )}
            />  
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="phone1" 
                        label="phone number" 
                        type='text' 
                        value={formik.values?.phone1}
                        error={formik.touched.phone1 && !!formik.errors.phone1}
                        helperText={formik.touched.phone1 && formik.errors.phone1}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="email" 
                        label="Email" 
                        type='email' 
                        value={formik.values?.email}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="aadharNumber" 
                        label="Aadhar Number" 
                        type='text' 
                        value={formik.values?.aadharNumber}
                        error={formik.touched.aadharNumber && !!formik.errors.aadharNumber}
                        helperText={formik.touched.aadharNumber && formik.errors.aadharNumber}
                        onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="panNumber" 
                        label="Pan Number" 
                        type='text' 
                        value={formik.values?.panNumber}
                        error={formik.touched.panNumber && !!formik.errors.panNumber}
                        helperText={formik.touched.panNumber && formik.errors.panNumber}
                        onChange={formik.handleChange}
                    />
                </Grid>

            </Grid>            
            </DialogContent>
            <DialogActions sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <Button size='small' type='submit' variant='contained'>Submit</Button>
                <Button size='small'onClick={handleClose} variant='contained'>Cancel</Button>
            </DialogActions> 
        </form>   
        </Box>  
    </> 
  )
}
export default RegisterationForm;