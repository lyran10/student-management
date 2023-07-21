import { Alert, Box,Button, TextField, Typography, CircularProgress } from '@mui/material'
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import React,{useEffect, useState} from 'react'
import { Auth } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'


const button = {
  width : "50%",
  borderRadius : "0px",
  backgroundColor : "white",
  color : "#0277bd",
  border : "1px solid #0277bd",
  "&:hover" : {
    backgroundColor : "#0277bd",
    color : "white",
    transition :"0.2s",
  }
}

export const Register = ({setError}) => {
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
const [user,setUser] = useState({
  email : "",
  password : ""
})

const handleClick = async() => {
  setLoading(true)
  const {email,password} = user
  if(!email || !password){
    setError("fill all detail")
    setTimeout(() => {setError("")},2000)
    setLoading(false)
    return
  }
try {
  const {email,password} = user
    await createUserWithEmailAndPassword(Auth,email,password)
    navigate("/studentManagement")
    setLoading(false)
    
} catch (error) {
  setError(error.message)
  setTimeout(() => {setError("")},2000)
  setLoading(false)

}
}

useEffect(() => {
  onAuthStateChanged(Auth,(currentUser) => {
    if (currentUser) navigate("/studentManagement")
  })
},[])

  return (
    <Box>
        <Typography sx={{textAlign:"center",marginTop : "70px",color : "#0277bd"}} variant='h4'>
          Register
        </Typography>
        <Box sx={{display : "flex",flexDirection : "column",justifyContent : "center",alignItems: "center",marginTop : "20px"}}>

      <TextField 
      onChange={(e) => {setUser({...user,email : e.target.value})}}
      sx={{width:"95%",marginTop : "10px",marginBottom :"10px",backgroundColor : "white"}}
    placeholder={"Email"}
    type={"email"}
    required
    />
     <TextField 
     onChange={(e) => {setUser({...user,password : e.target.value})}}
     sx={{width:"95%",marginTop : "10px",marginBottom :"10px",backgroundColor : "white"}}
    placeholder={"Password"}
    type={"password"}
    required
    value={user.password}
    />
    <Button onClick={() => handleClick()} sx={button}>{loading ? <CircularProgress color="inherit" size={"1.5rem"}/> : "Register"}</Button>
        </Box>
        </Box>
  )
  }