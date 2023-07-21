import { Typography,Box, Grid } from '@mui/material'
import { Container } from '@mui/system'
import React, { useState,useEffect } from 'react'
import { SideMenu } from './sideMenu'
import { AddStudentForm } from './addStudentForm'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import { StudentsList } from './studentsList'
import { Auth } from '../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import {onAuthStateChanged } from 'firebase/auth'

const addStudentStyle = (boolean,string) => {
  return {display:"flex",
  gap:"5px",
  cursor : "pointer",
  borderRadius : "5px",
  transition : "0.2s",
  padding:"10px",
  backgroundColor : string === "add" ? "#0277bd":"white",
  color : string === "add" ? "white" :"#0277bd",
  "&:hover" : {
    backgroundColor:"#0277bd",
    color : "white"}
  }
}

const logOutStyle = {
  display:"flex",
  gap:"5px",
  cursor : "pointer",
  borderRadius : "5px",
  transition : "0.2s",
  padding:"10px",
  color : "#0277bd",
  "&:hover" : {
    backgroundColor:"#0277bd",
    color : "white"
  }
}

const manageStudentStyle = (boolean,string) => {
  return {display:"flex",
  gap:"5px",
  cursor : "pointer",
  borderRadius : "5px",
  transition : "0.2s",
  padding:"10px",
  backgroundColor : string === "list" ? "#0277bd":"white",
  color : string === "list" ? "white" :"#0277bd",
  "&:hover" : {
    backgroundColor:"#0277bd",
    color : "white"}
  }
}

const container = (matches) => {
  return {display:"flex",
  alignSelf:"center",
  flexDirection : matches ?"column" : null,
  backgroundColor : "",
  width:"100%",
  gap:"10px"
}
}

export const MainComponents = () => {
  const time = new Date().toLocaleTimeString()
  const [opacity,setOpacity] = useState("0")
  const [cTime,setCtime] = useState()
  const navigate = useNavigate()
  const matches = useMediaQuery('(max-width:500px)');
  const [show,setShow] = useState(true)
  const [string,setString] = useState("add")
  const date = Date.now()
  const dateAndTime = new Date(date)

  const updateTime = () => {
    const time = new Date().toLocaleTimeString()
    setCtime(time)
  }

  useEffect(() => {
    setInterval(updateTime,1000)
    setTimeout(() => {setOpacity("1")},200)
    onAuthStateChanged(Auth,(currentUser) => {
      if (currentUser) navigate("/studentManagement")
    })
  },[])

  const handleClick = (boolean,string) => {
    setShow(boolean)
    setString(string)
  }

  const logOut = async() => {
   await Auth.signOut()
    navigate("/")
  }

  return (
  <Container sx={{display : "flex",opacity : opacity,flexDirection:"column",marginTop:"100px",gap:"30px",transition : "0.2s"}}>

     <Grid container={"true"} sx={{flexDirection:"column",alignItems:"center"}}>
      <Typography lg={6} md={6} xs={12} variant='h6' component={"span"}>{show ?"Add Student" : "Manage Student"}</Typography>
      <Box sx={{display : "flex",gap:"1px",justifyContent : "center",alignItems : "center",flexDirection : matches ? "column" : null}}>
      <Typography lg={6} md={6} xs={12} component={"span"}>{`Date - ${dateAndTime.toLocaleDateString("en-US")}`}</Typography>
      <Typography>{matches ? null: ","}</Typography>
      <Typography lg={6} md={6} xs={12} component={"span"}>{`Time - ${time}`}</Typography>
      </Box>
     
    </Grid>

    <Box sx={container(matches)}>
    <SideMenu>
    
      <Typography onClick={() => handleClick(true,"add")} component={"span"} sx={addStudentStyle(show,string)}>
      <PeopleAltOutlinedIcon/>
      Add Student
      </Typography>
  
      <Typography onClick={() => handleClick(false,"list")} component={"span"} sx={manageStudentStyle(show,string)}>
      <TimelineOutlinedIcon/>
      Manage Student
      </Typography>
     
      <Typography onClick={() => logOut()} component={"span"} sx={logOutStyle}>
      < LogoutOutlinedIcon/>
      Log Out
      </Typography>
   
    </SideMenu>
    {show ? <AddStudentForm/>: <StudentsList/>}
    
    </Box>
  </Container>
  )
}