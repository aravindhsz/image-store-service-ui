import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const navigate = useNavigate();

  return (
        <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
          <CameraIcon href="/home" sx={{ mr: 2 }} onClick={() => {
            navigate("/home")
          }} />
          <Typography variant="h6" noWrap>
            Lights and Shutter
          </Typography>
        </Toolbar>
        </AppBar>
  );
}
