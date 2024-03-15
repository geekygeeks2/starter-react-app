import React from 'react';

// material-ui
import { styled } from '@mui/material/styles';
import './loader.css'

// ==============================|| LOADER ||============================== //

const Loader = ({loading}) => {
  return (
    true?<div className="loader-container"><span className="loader"></span></div>:null
  )
};

export default Loader;