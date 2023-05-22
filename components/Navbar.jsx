import * as React from 'react';
import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import logo from "../public/logo.png"

import Image from 'next/image';
function Navbar() {
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        
          <Image
        src={logo}
     
        alt="logo"
  
      />

          
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default  Navbar;

