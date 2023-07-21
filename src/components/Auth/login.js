import { Box,Button, TextField, Typography,Alert,CircularProgress } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { Register } from './register'

const buttonStyle= () => {
  return {width : "50%",
  borderRadius : "0px",
  backgroundColor : "white",
  color : "#0277bd",
  border : "1px solid #0277bd",
  "&:hover" : {
    backgroundColor : "#0277bd",
    color : "white",
    transform : "translateY(-5px)",
    transition :"0.2s"
  }
}
}


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

const mainBox = (opacity) => {
  return {
  display : "flex",
  justifyContent:"center",
  alignItems:"center",
  width : "100vw",
  height : "90vh",
  flexDirection : "column",
  transition : "0.2s",
  opacity : opacity
  }
}

const loginDiv =  {
  width : "60%",
  height : "70%",
  borderRadius:"5px",
  transition : "0.5s",
}

export const Login = () => {
  const [opacity,setOpacity] = useState("0")
  const [loading,setLoading] = useState(false)
  const [string,setString] = useState("register")
  const [error,setError] = useState("")
  const navigate = useNavigate()
const [user,setUser] = useState({
  email : "",
  password : ""
})

const handleClick = async() => {
  setLoading(true)
  const {email,password} = user
  if(!email || !password){
    setError("fill all details")
    setTimeout(() => {setError("")},2000)
    setLoading(false)
    return
  }
try {
  const {email,password} = user
  await signInWithEmailAndPassword(Auth,email,password)
  navigate("/studentManagement")
} catch (error) {
  setError("Invalid email/password")
  setTimeout(() => {setError("")},3000)
  setLoading(false)
}
}

useEffect(() => {
  setTimeout(() => {setOpacity("1")},200)
  onAuthStateChanged(Auth,(currentUser) => {
    if (currentUser) navigate("/studentManagement")
  })
},[])

  return (
    <Box sx={mainBox(opacity)}>
      <Alert sx={{opacity : !error ? "0" :"1"}} severity={"warning"}>{error}</Alert>
      <Box sx={loginDiv}>
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>
        <Button onClick={() => setString("register")} sx={buttonStyle}>Register</Button>
        <Button onClick={() => setString("login")} sx={buttonStyle}>Login</Button>
        </Box>
        {string === "login" ?
        <Box>
        <Typography sx={{textAlign:"center",marginTop : "70px",color : "#0277bd"}} variant='h4'>
          Login
        </Typography>
        <Box sx={{display : "flex",flexDirection : "column",justifyContent : "center",alignItems: "center",marginTop : "20px"}}>

      <TextField 
      onChange={(e) => {setUser({...user,email : e.target.value})}}
      sx={{borderRadius :"5px",width:"95%",marginTop : "10px",marginBottom :"10px",backgroundColor : "white"}}
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
    <Button onClick={() => handleClick()} sx={button}>{loading ?  <CircularProgress color="inherit" size={"1.5rem"}/> : "Login"}</Button>
        </Box>
        </Box>
        :

        <Register setError={setError}/>}
       
      </Box>
    </Box>
  )
  }