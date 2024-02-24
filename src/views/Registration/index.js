import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import { CardHeader, CardContent, Divider, } from '@mui/material';

// material-ui
import {
    Card,
    Table,
    Stack,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    IconButton,
    Typography,
    TableContainer,
    TablePagination,
    Grid,
    TextField,
    Button,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    useTheme,
    Tooltip,
    Checkbox,
    Autocomplete,
    Box
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';

// project import
import Breadcrumb from 'component/Breadcrumb';
import { gridSpacing } from 'config.js';
import RegisterationForm from './RegistrationForm';
import { SETTING } from 'app-config/cofiguration';

// ==============================|| SAMPLE PAGE ||============================== //

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

const RegistrationPage = () => {
    const [isRegister, setIsRegister]=useState(false)
    const [users, setUsers]= useState([])
    const [loader, setLoader]= useState(false)
    const styleButton = {
        bgcolor: 'primary',
        padding: '12px 20px'
      } 

      useEffect(() => {
        getAllUser()
      },[]); 
    const getAllUser=async()=>{

      let options = SETTING.HEADER_PARAMETERS;
      options['Authorization'] = localStorage.getItem("token")
      await Axios.get(SETTING.APP_CONSTANT.API_URL+`admin/getAllUser`,{headers: options})
      .then((res) => {
        setLoader(false)
        if (res && res.data.success) {
          setUsers( res.data.users)
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
    } 
    
      const handleRegister=(()=>setIsRegister(true))
      const handleClose = (() => setIsRegister(false))
  return (
    <>
      <Breadcrumb title="">
        <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
          Home
        </Typography>
        <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
          Registration
        </Typography>
      </Breadcrumb>
      <Stack direction="row" alignItems="center" justifyContent="left" mb={5}>
      <Button variant="contained" sx={styleButton} onClick={handleRegister}>
            Agent Registration
          </Button>
        </Stack>
        <Card>
    <TableContainer component={Paper} sx={{ minWidth:'100%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Phone Number</TableCell>
            {/* <TableCell align="right"></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length>0 && users.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.created}
              </TableCell>
              <TableCell align="right">{row.userInfo.fullName}</TableCell>
              <TableCell align="right">{row.userInfo.roleName}</TableCell>
              <TableCell align="right">{row.userInfo.phone1}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
          </TableContainer>
          </Card>

          {/* open registration form */}
   <Dialog 
   fullWidth
   open={isRegister} 
//    TransitionComponent={Transition} 
   keepMounted 
   maxWidth={'md'}
   onClose={handleClose}
 >
   <IconButton
     aria-label="close"
     onClick={handleClose}
     sx={{
       position: 'absolute',
       right: 8,
       top: 8,
       color: (theme) => theme.palette.grey[500],
     }}
   >
   <CloseIcon />
   </IconButton>
   <RegisterationForm handleCloseModal={handleClose}/>
</Dialog>

    </>
  );
}

export default RegistrationPage;


