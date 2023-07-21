import React from 'react'
import { Dialog,DialogTitle,DialogContent, Typography,Box } from '@mui/material'


export const capitalize = (string) => {
  let char = string?.charAt(0).toUpperCase()
  return char + string?.slice(1)
}

export const ViewDetails = ({children,open,setOpen,student}) => {
  
  const details = (type,studentData) => {
    return(
      <Typography sx={{borderBottom : "solid 1px black",padding : "7px",fontWeight:"800"}} component={"span"}>{type} - {studentData}</Typography>
    )
  }

  return (
    <>
    {children}
    <Dialog 
    sx={{width:"100%"}}
    open={open} 
    onClick={() => setOpen(false)}
    aria-labelledby='dialog-title' aria-describedby='dialog-description'>
      <DialogTitle sx={{textAlign:"center"}} id={"dialog-title"}>Student Details</DialogTitle>
      <DialogContent id={"dialog-description"}>
        <Box sx={{display:"flex",flexDirection:"column",width:"400px",height : "500px",marginTop:"30px"}}>
       {details("First Name",capitalize(student.first_name))}
       {details("Middle Name",capitalize(student.middle_name))}
       {details("Last Name",capitalize(student.last_name))}
       {details("Roll Number",student.roll_no)}
       {details("Class",student.Class)}
       {details("Division",student.division)}
       {details("City",student.city)}
       {details("Address 1",student.address_1)}
       {details("Address 2",student.address_2)}
       {details("Land Mark",student.landMark)}
       {details("Pin code",student.pin_code)}
        </Box>
      </DialogContent>
    </Dialog>
    </>
  )
}