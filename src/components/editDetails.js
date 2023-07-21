import React,{useEffect, useState} from 'react'
import { Dialog,DialogTitle,DialogContent,DialogActions,Box,Button,TextField,MenuItem, Select, CircularProgress,Alert } from '@mui/material'
import { collection,updateDoc,doc } from 'firebase/firestore';
import{db} from "../config/firebaseConfig.js"

const buttonStyle = {
  "&:hover" : {
    backgroundColor:"#0277bd",
    color : "white"
  }
}

export const EditDetails = ({children,editOpen,setEditOpen,student}) => {
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [alert,setAlert] = useState(false)
  let classOptions = []
  const [editStudent,setEditStudent] = useState({})

  useEffect(() => {
      setEditStudent(student)
  },[student,])

  const input = (key,label,studentData) => {
    return(
      <Box>
      <TextField onChange={(e) => setEditStudent({...editStudent,[key] : key === "roll_no" || key === "pin_code" ? parseInt(e.target.value) : e.target.value})} sx={{paddingBottom:"20px",paddingTop : "20px",width:"70%",fontWeight:"800"}} value={studentData} variant={"outlined"} label={label} type={key === "roll_no" || key === "pin_code" ? "number" : "text" }/>
      </Box>
    )
  }

  const options = () => {
    for (let index = 1; index < 13; index++) {
          classOptions.push(index)
    }
  }

  const selectInput = (key,label,studentData) => {
    return (
      <Box>
         {key === "division" ? 
      <Select 
      onChange={(e) => setEditStudent({...editStudent,[key] : e.target.value})}
      sx={{width:"70%",marginTop:"20px",marginBottom : "20px"}}
      variant='outlined'
      value={studentData ? studentData: ""}
      label={label}
      >
      <MenuItem value="A" disabled>Select Division</MenuItem>
       <MenuItem value="A" >A</MenuItem>
       <MenuItem value="B" >B</MenuItem>
       <MenuItem value="C" >C</MenuItem>
       <MenuItem value="D" >D</MenuItem>
       <MenuItem value="E" >E</MenuItem>
    </Select>
    : <Select
    onChange={(e) => setEditStudent({...editStudent,[key] : e.target.value})}
    sx={{width:"70%"}}
    variant='outlined'
    label={label}
    value={studentData ? studentData: ""}
    >
      {options()}
      <MenuItem disabled>Select Class</MenuItem>
    {classOptions.map((option,index) => {
        return (
          <MenuItem key={index} value={option}>{option}</MenuItem>
        )
      })
    }
  </Select>}
      </Box>
    )
  }

  const messages = (message) => {
    setError(message)
    setAlert(true)
    setTimeout(() => {setError("")},2000)
    setTimeout(() => {setAlert(false)},2000)
    setLoading(false)
  }

  const handleClick = async(id) => {
    const {roll_no,pin_code} = editStudent
    setLoading(true)
    if(roll_no.toString().length > 2){
     messages("Invalid roll number")
      return
    }
    if(pin_code.toString().length !== 6){
      messages("Pin code should be of 6 digits")
      return
    }
    try {
      const studentDoc = doc(db,"students",id)
      await updateDoc(studentDoc,editStudent)
      setLoading(false)
      setAlert(true)
      setTimeout(() => {setAlert(false)},2000)
      setTimeout(() => {setEditOpen(false)},2400)
    } catch (error) {
        setError(error.msg)
        setTimeout(() => {setError("")},2000)
    }
   
  }

  return (
    <>
    {children}
    <Dialog 
    sx={{width:"100%"}}
    open={editOpen} 
    aria-labelledby='dialog-title' aria-describedby='dialog-description'>
      <DialogTitle sx={{textAlign:"center"}} id={"dialog-title"}>Edit Student Details
      </DialogTitle>
      {alert ? 
        <Alert severity={!error ?"success" : "warning"}>{error ?error:"Details updated"}</Alert>
        : null}
      <DialogContent id={"dialog-description"}>
        <Box sx={{display:"flex",flexDirection:"column",width:"350px",marginTop:"30px"}}>
       {input("first_name","First Name",editStudent?.first_name)}
       {input("middle_name","Middle Name",editStudent?.middle_name)}
       {input("last_name","Last Name",editStudent?.last_name)}
       {input("roll_no","Roll Number",editStudent?.roll_no)}
       {selectInput("Class","Select Class",editStudent?.Class)}
       {selectInput("division","Select Division",editStudent?.division)}
       {input("city","City",editStudent?.city)}
       {input("address_1","Address 1",editStudent?.address_1)}
       {input("address_2","Address 2",editStudent?.address_2)}
       {input("landMark","Land Mark",editStudent?.landMark)}
       {input("pin_code","Pin code",editStudent?.pin_code)}
        </Box>
      </DialogContent>
      <DialogActions>
      <Button onClick={() => handleClick(editStudent.id)} sx={buttonStyle}>
        {loading ? <CircularProgress color="inherit" size={"1.5rem"} fontSize={"medium"}/> : "Submit"}
        </Button>
        <Button sx={buttonStyle} onClick={() => setEditOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}
