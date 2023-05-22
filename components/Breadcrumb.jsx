import * as React from 'react';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';



export default function Breadcrumb() {

 
const handleClick=(event)=> {
   event.preventDefault();

  
 
}
  return (

    <>
   
    <div onClick={handleClick}>
        <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{padding:"10px"}}
      >
        
        <Link
          underline="always"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="#"
        >
          <HomeIcon sx={{ mr: 0.9 ,mb:0.5,
    color: "#9E9E9E"}}  />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashbord"
        >
        Dashbord
        </Link>
       
      </Breadcrumbs>

    </div>
    </>
  );
}
