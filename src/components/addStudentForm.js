import React,{useState} from 'react'
import { Grid,MenuItem,TextField,Box,Button,Alert,CircularProgress } from '@mui/material'
import {collection,addDoc} from "firebase/firestore"
import { db } from '../config/firebaseConfig'

export const AddStudentForm = () => {
  const [validation,setValidation] = useState("")
  const [loading,setLoading] = useState(false)
  const [alert,setAlert] = useState(false)
  const [error,setError] = useState(false)
  const studentsCollections = collection(db,"students")
  let classOptions = []
  const [student,setStudent] = useState({
    first_name : "",
    middle_name : "",
    last_name : "",
    Class : "",
    division: "",
    roll_no : 0,
    address_1 : "",
    address_2 : "",
    landMark : "",
    city : "",
    pin_code : 0
  })

  const input = (key,label,type,xs,sm,md) => {
    return (
      <Grid item my={1} xs={xs} sm={sm} md={md}>
      <TextField 
      onChange={(e) => setStudent({...student,[key] : key === "roll_no" || key === "pin_code" ? parseInt(e.target.value) : e.target.value})}
      sx={{width:"95%"}}
    variant='outlined'
    label={label}
    type={type}
    required
    value={student.key}
    />
      </Grid>
    )
  }

  const options = () => {
    for (let index = 1; index < 13; index++) {
          classOptions.push(index)
    }
  }

  const selectInput = (key,label) => {
    return (
      <Grid item my={1} xs={12} sm={6} md={4}>
         {key === "division" ? 
      <TextField
      select
      onChange={(e) => setStudent({...student,[key] : e.target.value})}
      sx={{width:"95%"}}
      variant='outlined'
      label={label}
      value={student.key}
      required
      >
       <MenuItem value="A" >A</MenuItem>
       <MenuItem value="B" >B</MenuItem>
       <MenuItem value="C" >C</MenuItem>
       <MenuItem value="D" >D</MenuItem>
       <MenuItem value="E" >E</MenuItem>
    </TextField>
    : <TextField
    select
    onChange={(e) => setStudent({...student,[key] : e.target.value})}
    sx={{width:"95%"}}
    variant='outlined'
    label={label}
    value={student.key}
    required
    >
      {options()}
    {classOptions.map((option,index) => {
        return (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        )
      })
    }
  </TextField>}
      </Grid>
    )
  }

  const handleClick = async() => {
    const {roll_no,pin_code,first_name,last_name,middle_name,city,landMark,address_1,address_2,division,Class} = student

  if(!first_name || !middle_name || !last_name || !city || !landMark || !address_1 || !address_2 ||!roll_no || !pin_code || !division || !Class){
        setValidation("All the information is reqiured")
        setTimeout(() => {setValidation("")},2000) 
        return
      }
      else if(pin_code.toString().length !== 6){
      setValidation("Invalid pin code")
      setTimeout(() => {setValidation("")},2000)
      return
    }
    else if (roll_no.toString().length > 2){
      setValidation("Invalid roll number")
      setTimeout(() => {setValidation("")},2000) 
      return
      }
    else{
      try {
        setLoading(true)
        await addDoc(studentsCollections,student)
        setAlert(true)
        setTimeout(() => {setAlert(false)},2000)
        setLoading(false)
      } catch (error) {
        setError(true)
        setTimeout(() => {setError(false)},2000)
        setLoading(false)
      }
    }
  }

  return (
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",gap:"20px"}}>
      {validation ? <Alert severity={"warning"}>{validation}</Alert> :null}
       {alert ? 
        <Alert severity={!error ?"success" : "warning"}>{error ?"Something went Wrong Try Again":"Student Added"}</Alert>
        : null}
      <Grid container={"true"} style={{width : "100%"}}>
       {input("first_name","Name","text",12,6,4)}
       {input("middle_name","Middle Name","text",12,6,4)}
       {input("last_name","Last Name","text",12,6,4)}
       {selectInput("Class","Select Class")}
       {selectInput("division","Select Division")}
       {input("roll_no","Enter roll number in digits","number",12,6,4)}
       </Grid>
       <Grid container style={{width : "100%"}}>
       {input("address_1","Address 1","text",12,6,6)}
       {input("address_2","Address 2","text",12,6,6)}
       {input("landMark","Landmark","text",12,6,4)}
       {input("city","City","text",12,6,4)}
       {input("pin_code","Pincode","number",12,6,4)}
       </Grid>
       <Button onClick={() => handleClick()} sx={{margin:"auto",marginLeft:"0px","&:hover" : {backgroundColor:"#0277bd",
    color : "white"}}}>{loading?<CircularProgress color="inherit" size={"1.5rem"}/>:"Add Student"}</Button>
    </Box>
  )
}
