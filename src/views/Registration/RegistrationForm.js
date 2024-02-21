import React from 'react';
import { Button,
    DialogActions,
    DialogContent,
    DialogTitle,     
    Typography, 
    FormControl, 
    Grid,
    TextField,
    Autocomplete,
    Box,
    Chip,
} from '@mui/material';
// import { useFormik } from 'formik';


const RegisterationForm = ({handleCloseModal}) => {

    // const formik = useFormik({
    //     initialValues :{
    //         title: "",
    //         experience: "",
    //         numberOfOpenings: "",
    //         location:[""],
    //         salary: "",
    //         mustHaveSkills:[],
    //         jobDescription:"",
    //         industryType: "",
    //         department:"",
    //         employmentType: "",
    //         jobProfile:"",
    //         education: "",
    //         workPlaceType:[],
    //         status:"",
    //         technologyId:[],
    //         aboutCompany:"",
    //         openingDate:null,
    //         expiryDate:null,
    //         experienced:true
    //    },
    //     validationSchema:vacancySchema,
    //    onSubmit: (values: CreateVacancy) => {
    //     values.jobDescription = description
    //     const openingDate = dayjs((values.openingDate as any)["$d"]).valueOf();
    //     const expireDate = dayjs((values.expiryDate as any)["$d"]).valueOf();
    //     const payload={
    //         title: values.title,
    //         experience: values.experience,
    //         numberOfOpenings: values.numberOfOpenings,
    //         location:values.location,
    //         salary: values.salary,
    //         mustHaveSkills:values.mustHaveSkills,
    //         jobDescription:values.jobDescription,
    //         industryType:values.industryType,
    //         department:values.department,
    //         employmentType: values.employmentType,
    //         jobProfile:values.jobProfile,
    //         education: values.education,
    //         status:values.status,
    //         workPlaceType:values.workPlaceType,
    //         aboutCompany:values.aboutCompany,
    //         technologyId:values.technologyId,    
    //         openingDate:openingDate,
    //         expiryDate:expireDate,
    //         experienced:values.experienced
    //     }
    //     setLoading(true)
    //     dispatch(createVacancys(payload)).then(()=>{
    //         handleCloseModal()
    //     }).catch((err)=>{
    //         console.log(err.message)
    //     }).finally(()=>{
    //         setLoading(false)
    //     })
    // }
    // })
   
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
        <form>
            <DialogTitle align='center' sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                <Typography variant='h4'>
                    {/* <Iconify icon="gridicons:briefcase" width="1em"  style={{color: '#45AA97', marginRight:"7px"}} /> */}
                    Registration Form</Typography>
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2} paddingX={5} paddingTop={2}>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        fullWidth
                        name="name" 
                        label="First Name" 
                        type='text'
                        // value={formik.values?.title}
                        // error={formik.touched.title && !!formik.errors.title}
                        // helperText={formik.touched.title && formik.errors.title}
                        // onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField 
                        fullWidth 
                        name="lastName" 
                        label="Last Name" 
                        type='text' 
                        // value={formik.values?.experience}
                        // error={formik.touched.experience && !!formik.errors.experience}
                        // helperText={formik.touched.experience && formik.errors.experience}
                        // onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                <Autocomplete
              disablePortal
              options={genderData}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Gender" />}
            //   onChange={(event, newValue) => {
            //     formik.setFieldValue("gender",newValue?.label); // Set the value in formik
            //   }}
            //   value={formik.values.gender}
            //   renderInput={(params) => (
            //     <TextField
            //       {...params}
            //       error={Boolean(
            //         formik?.touched?.gender &&
            //           formik?.errors?.gender
            //       )}
            //       name="gender"
            //       helperText={
            //         formik.touched.gender &&
            //         formik.errors.gender
            //       }
            //       label="Gender"
            //     />
            //   )}
            />  
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="phone" 
                        label="Phone number" 
                        type='text' 
                        // value={formik.values?.experience}
                        // error={formik.touched.experience && !!formik.errors.experience}
                        // helperText={formik.touched.experience && formik.errors.experience}
                        // onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="email" 
                        label="Email" 
                        type='email' 
                        // value={formik.values?.experience}
                        // error={formik.touched.experience && !!formik.errors.experience}
                        // helperText={formik.touched.experience && formik.errors.experience}
                        // onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="adhaarCard" 
                        label="Aadhar Card" 
                        type='text' 
                        // value={formik.values?.experience}
                        // error={formik.touched.experience && !!formik.errors.experience}
                        // helperText={formik.touched.experience && formik.errors.experience}
                        // onChange={formik.handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        name="panCard" 
                        label="Pan Card" 
                        type='text' 
                        // value={formik.values?.experience}
                        // error={formik.touched.experience && !!formik.errors.experience}
                        // helperText={formik.touched.experience && formik.errors.experience}
                        // onChange={formik.handleChange}
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