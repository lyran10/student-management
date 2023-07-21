import React, { useEffect,useState } from 'react'
import { TableContainer,TableHead,TableCell,Table,TableBody,Paper, TableRow, IconButton, CircularProgress, Typography,Tooltip } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { collection,getDocs,deleteDoc,doc } from 'firebase/firestore';
import{db} from "../config/firebaseConfig.js"
import { Skele } from './skeleton.js';
import { ViewDetails } from './viewDetails.js';
import { EditDetails } from './editDetails.js';
import { capitalize } from './viewDetails.js';

export const StudentsList = () => {
const [loading,setLoading] = useState(false)
const studentsCollections = collection(db,"students")
const [students,setStudents] = useState([])
const [selectStudent,setSelectedStudent] = useState({})
const [open,setOpen] = useState(false)
const [editOpen,setEditOpen] = useState(false)

const getStudents = async() => {
  const data = await getDocs(studentsCollections)
  setStudents(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
}

useEffect(() => {

  getStudents()

},[selectStudent,editOpen])

const handleClick = (setOpen,student) => {
  setOpen(true)
  setSelectedStudent(student)
}

const handleDelete = async(student) => {
  setSelectedStudent(student)
  setLoading(true)
  const studentDoc = doc(db,"students",student.id)
  await deleteDoc(studentDoc)
  setLoading(true)
  getStudents()
}

  return (
    <TableContainer component={Paper} >
      <Typography variant='h6' sx={{textAlign : "center"}}>{!students.length ? "No Students":""}</Typography>
      {students.length ?
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align='center'>Class</TableCell>
            <TableCell align='center'>Roll no</TableCell>
            <TableCell>View / Edit / Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student,index) => {
            return (
              <TableRow key={index}>
            <TableCell>{capitalize(student.first_name)}</TableCell>
            <TableCell align='center'>{student.Class}</TableCell>
            <TableCell align='center'>{student.roll_no}</TableCell>
            <TableCell>
              <ViewDetails open={open} setOpen={setOpen} student={selectStudent}>
                <Tooltip title={"View Details"}>
              <IconButton onClick={() => handleClick(setOpen,student)}>
              <VisibilityRoundedIcon/>
              </IconButton>
              </Tooltip>
              </ViewDetails>
              <EditDetails editOpen={editOpen} setEditOpen={setEditOpen} student={selectStudent}>
                <Tooltip title={"Edit Details"}>
              <IconButton onClick={() => handleClick(setEditOpen,student)}> 
              <EditRoundedIcon />
              </IconButton>
              </Tooltip>
              </EditDetails>
              <Tooltip title={"Delete"}>
              <IconButton onClick={() => handleDelete(student)}>
                {loading && student.id === selectStudent.id? 
                <CircularProgress color="inherit" size={"1.5rem"}/>
              :<DeleteRoundedIcon/>}
              </IconButton>
              </Tooltip>
              </TableCell>
          </TableRow>
            )
          })
          }
        </TableBody>
      </Table>
      :<Skele/>}
    </TableContainer>
  )
}