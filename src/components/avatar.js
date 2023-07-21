import React,{useEffect,useState} from 'react'
import { Avatar,Tooltip } from '@mui/material'
import { collection,getDocs} from 'firebase/firestore';
import{db} from "../config/firebaseConfig.js"
import { ref,listAll,getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebaseConfig'

export const AvatarPic = ({setImageList,imageList,userId,setPicOpen,userEmail,pic,show}) => {
  let array = []
  const studentsCollections = collection(db,"userPic")
  const [pics,setPics] = useState([])

  const getPics = async() => {
    const data = await getDocs(studentsCollections)
    setPics(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  const refImageList = ref(storage,`${userEmail}/`)

useEffect(() => {
  getPics()
},[pic,show])

const getImages = async() => {
  setImageList([])
 await listAll(refImageList).then((res) => {
    res.items.forEach((item) => {
        getDownloadURL(item).then((URL) => {
          setImageList(pre => [...pre,URL])
        })
    })
  })
}

useEffect(() => {
  getImages()
 },[userEmail,show])

const handlePic = () => {
 pics.filter((item) => {
      if(item.email === userEmail){
     array = imageList.filter((image) => image.split("%2F")[1].split("?")[0] === item.pic)
      }
  })
  return array[0]
}

return (
    <Tooltip  sx={{cursor : "pointer"}} title={imageList.length ?"Edit photo" : "Add photo"}>
    <Avatar onClick={() =>  setPicOpen(true)} src={handlePic()} sx={{color : "white",cursor : "pointer"}}
    >
      {userId?.split("")[0].toUpperCase()}
    </Avatar>
    </Tooltip>     
  )
}