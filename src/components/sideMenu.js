import React from 'react'
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';


export const SideMenu = ({children,show}) => {
  const matches = useMediaQuery('(max-width:505px)');
  return (
    <Box container sx={{width:matches ? "100%" :"20%",display:"flex",flexDirection:!matches ? "column" :null,textAlign:"start"}}>
      {children}
    </Box>
  )
}