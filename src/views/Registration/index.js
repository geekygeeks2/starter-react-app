import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Axios from "axios";
import { CardHeader, CardContent, Divider, Snackbar, } from '@mui/material';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteIcon from '@mui/icons-material/Delete';
// import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';
import { green, red } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
import {passwordDecryptAES} from 'views/Utils/helper';
import Loader from 'component/Loader/Loader';


// ==============================|| SAMPLE PAGE ||============================== //

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

const JWT_AUTH_TOKEN = localStorage.getItem("token");
const USER = localStorage.getItem("userInformation") && JSON.parse(localStorage.getItem("userInformation"));
const roleName= USER && USER.userInfo && USER.userInfo.roleName
    
const RegistrationPage = () => {
    const [isRegister, setIsRegister]=useState(false)
    const [users, setUsers]= useState([])
    const [selectedUser, setSelectedUser]= useState({})
    const [loader, setLoader]= useState(false)
    const [toast, setToast]= useState({
      open: false, 
      message:'test',
      vertical: 'top',
      horizontal: 'right',
      error: false,
    })
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = (row) => {
      setDialogOpen(true);
      setSelectedUser(row)
    };
    const handleDialogClose = () => {
      setDialogOpen(false);
      setSelectedUser({})
    };
    const styleButton = {
        bgcolor: 'primary',
        padding: '12px 20px'
      } 

      useEffect(() => {
        getAllUser()
      },[isRegister]); 
    const getAllUser=async()=>{
      setLoader(true)
      let options = SETTING.HEADER_PARAMETERS;
      options['Authorization'] = localStorage.getItem("token")
      const userId = USER && USER.userInfo && USER.userInfo.userId? USER.userInfo.userId:''
     const url = roleName && roleName==='AGENT' ?'admin/getAllInvestor/?userId='+ userId : 'admin/getAllUser'
      await Axios.get(SETTING.APP_CONSTANT.API_URL+ url ,{headers: options})
      .then((res) => {
        setLoader(false)
        if (res && res.data.success) {
          setUsers( res.data.users)
          setToast({ ...toast, open: true, message:'All user get successfully'})
          //toast["success"]("Logged in successfully");
        } else {
          const errorMessage= res && res.data && res.data.message? res.data.message:"user not found"
          setToast({ ...toast, open: true, error: true, message:errorMessage})
        }
      })
      .catch((err) =>{
        setLoader(false)
        const errorMessage = 'Login error'
        //toast["error"](errorMessage);
      });
    } 
    const deleteUser=async(row)=>{
      setLoader(true)
      let options = SETTING.HEADER_PARAMETERS;
      options['Authorization'] = localStorage.getItem("token")
      await Axios.delete(SETTING.APP_CONSTANT.API_URL+`admin/deleteUser/`+row._id,{headers: options})
      .then((res) => {
        setLoader(false)
        if (res && res.data.success) {
         getAllUser()
          //toast["success"]("Logged in successfully");
        } else {
          //toast["error"](res && res.data && res.data.message? res.data.message:"user name or Password is wrong. Please try again!");
        }
      })
      .catch((err) =>{
        setLoader(false)
        //const errorMessage = 'Login error'
        //toast["error"](errorMessage);
      });
    } 
    
      const handleRegister=(()=>setIsRegister(true))
      const handleClose = (() => 
          setIsRegister(false)
      )
      const { vertical, horizontal, open, message, error } = toast;
  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{vertical, horizontal }}
        onClose={() => setToast({...toast, open: false})}
        TransitionComponent={Slide}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={1000}
        variant={error?'error':'success'}
      />
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
          {roleName && roleName==="AGENT"? "Investor": 'Agent'} Registration
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
                <TableCell align="right">Invest Amount</TableCell>
                {roleName && (roleName==='TOP_ADMIN' || roleName==='SUPER_ADMIN') && 
                  <TableCell align="right">Status</TableCell>
                }
                <TableCell align="right">Action</TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length>0 && users.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {new Date(row.created).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="center">{row.userInfo.fullName}</TableCell>
                  <TableCell align="center">{row.userInfo.roleName}</TableCell>
                  <TableCell align="center">{row.userInfo.phone1}</TableCell>
                  <TableCell align="center">{row?.investAmount}</TableCell>
                  {roleName && (roleName==='TOP_ADMIN' || roleName==='SUPER_ADMIN') && 
                    <TableCell align="center">
                      <Switch {...label} defaultChecked size="small"/>
                    </TableCell>
                  }
                  <TableCell align="center">
                    <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit">
                      <IconButton>
                        <Icon sx={{ color: '#0d47a1', fontSize: 20 }}>edit_note</Icon>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Password">
                      <IconButton onClick={()=>handleClickOpen(row)}>
                        <Icon sx={{ color: green[500], fontSize: 20 }}>lock</Icon>
                      </IconButton>
                    </Tooltip>
                    {roleName && (roleName==='TOP_ADMIN' || roleName==='SUPER_ADMIN') && 
                      <Tooltip title="Delete">
                        <IconButton onClick={()=>deleteUser(row)}>
                        <Icon sx={{ color: red[500], fontSize: 20 }}>delete</Icon>
                        </IconButton>
                      </Tooltip>
                    }
                      
                      {/* <Icon color="primary">add_circle</Icon>
                      <Icon sx={{ color: green[500] }}>add_circle</Icon>
                      <Icon fontSize="small">add_circle</Icon>
                      <Icon sx={{ fontSize: 30 }}>add_circle</Icon> */}
                    </Stack>
                    </TableCell>
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
        // TransitionComponent={Transition} 
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

      <Dialog
        onClose={handleDialogClose}
        //aria-labelledby="customized-dialog-title"
        open={dialogOpen}
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Password 
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Name : {selectedUser?.userInfo?.fullName}
          </Typography>
          <Typography gutterBottom>
            ID : {selectedUser?.userInfo?.userId}
          </Typography>
          <Typography gutterBottom>
            Password : {selectedUser &&selectedUser.userInfo&& selectedUser.userInfo.password && passwordDecryptAES(selectedUser?.userInfo?.password)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDialogClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RegistrationPage;


