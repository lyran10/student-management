import React from 'react'
import { NavBar } from '../components/navBar'
import { MainComponents } from '../components/mainComponents'
import { Box } from '@mui/material'

export const StudentManagement = () => {
  return (
    <Box style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems : "center",width:"100vw"}}>
        <MainComponents/>
    </Box>
  )
}