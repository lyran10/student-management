import React,{useEffect, useState} from 'react'
import { Dialog,DialogTitle,DialogContent,DialogActions,Button,TextField,CircularProgress,Alert } from '@mui/material'
import { storage } from '../config/firebaseConfig'
import { ref,uploadBytes } from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../config/firebaseConfig'
import {collection,addDoc,getDocs,updateDoc,doc} from "firebase/firestore"
import { db } from '../config/firebaseConfig'

const buttonStyle = {
  "&:hover" : {
    backgroundColor:"#0277bd",
    color : "white"
  }
}

export const AddPic = ({children,picOpen,setPicOpen,setPic,setShow}) => {
  const studentsCollections = collection(db,"userPic")
  const [userEmail,setUserEmail] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [alert,setAlert] = useState(false)
  const [image,setImage] = useState(null)

  useEffect(() => {
    onAuthStateChanged(Auth,(currentUser) => {
      if (currentUser) setUserEmail(currentUser.email)
      else setUserEmail("")
    })
  },[])

  const messages = (message) => {
    setError(message)
    setAlert(true)
    setTimeout(() => {setError("")},2000)
    setTimeout(() => {setAlert(false)},2000)
    setLoading(false)
  }

  const handleDocs = async(UUID) => {
    const data = await getDocs(studentsCollections)
    let Doc = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    let filterByEmail = Doc.filter(item => item.email === userEmail)
    if(filterByEmail.length){
      const userDoc = doc(db,"userPic",filterByEmail[0].id)
          await updateDoc(userDoc,{email : userEmail,pic : `${image.name}${UUID}`})
    }else{
      await addDoc(studentsCollections,{email : userEmail,pic : `${image.name}${UUID}`})
    }
  
  }

  const handleClick = async() => {
    setLoading(true)
   let UUID = `${crypto.randomUUID()}`
    if(image === null) return messages("select Image")
    handleDocs(UUID)
    setPic(`${image.name + UUID}`)
    const refImage = ref(storage,`${userEmail}/${image.name+UUID}`)
    await uploadBytes(refImage,image).
    then((image) => {
        setAlert(true)
        setTimeout(() => {setAlert(false)},2000)
        setLoading(false)
        setPicOpen(false)
        setShow(false)
    })
    .catch((error) => {
      messages("someting went wrong try again")
  })
}

  return (
    <>
    {children}
    <Dialog 
    sx={{width:"100%"}}
    open={picOpen} 
    aria-labelledby='dialog-title' aria-describedby='dialog-description'>
      <DialogTitle sx={{textAlign:"center"}} id={"dialog-title"}>Add Photo
      </DialogTitle>
      {alert ? 
        <Alert severity={!error ?"success" : "warning"}>{error ?error:"Uploaded Picture"}</Alert>
        : null}
      <DialogContent id={"dialog-description"}>
        <TextField 
         type={"file"}
         onChange={(e) => setImage(e.target.files[0])}
          />
      </DialogContent>
      <DialogActions>
      <Button onClick={() => handleClick()}  sx={buttonStyle}>
        {loading ? <CircularProgress color="inherit" size={"1.5rem"} fontSize={"medium"}/> : "Submit"}
        </Button>
        <Button sx={buttonStyle} onClick={() => setPicOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
    </>
  )
}
