import React,{useEffect,useState} from 'react'
import { AppBar,Toolbar,Typography,Box } from '@mui/material'
import { onAuthStateChanged } from 'firebase/auth'
import { Auth } from '../config/firebaseConfig';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AddPic } from './addPic';
import { Stack } from '@mui/system'
import { Skeleton } from '@mui/material'
import { AvatarPic } from './avatar';

export const NavBar = () => {
  const matches = useMediaQuery('(max-width:480px)');
  const [picOpen,setPicOpen] = useState(false)
  const [userEmail,setUserEmail] = useState("")
  const [imageList,setImageList] = useState([])
  const [show,setShow] = useState(false)
  const [pic,setPic] = useState("")

  useEffect(() => {
    setTimeout(() => {setShow(true)}, 2500); 
    onAuthStateChanged(Auth,(currentUser) => {
      if (currentUser) setUserEmail(currentUser.email)
      else setUserEmail("")
    })
  },[imageList,pic])

  return (
    <AppBar position='static' style={{backgroundColor:"#0277bd",alignSelf:"start"}}>
      <Toolbar sx={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
     
        <Typography variant={matches ? "h6" : "h4"} component={"div"} fontWeight={"800"}>
          LOGO
        </Typography>

        <Typography component={"div"} sx={{display : "flex",justifyContent : "center",alignItems:"center"}}>
       
          <Box sx={{transition : "0.2s",display : "flex",gap:"5px",alignItems : "center"}}>
          <AddPic setShow={setShow}  picOpen={picOpen} setPicOpen={setPicOpen} setImageList={setImageList} setPic={setPic}>
          {show && userEmail? 
            <AvatarPic show={show} pic={pic} setImageList={setImageList} imageList={imageList} setPicOpen={setPicOpen} userId={userEmail} userEmail={userEmail}/>
            : userEmail ? <Stack>
            <Skeleton sx={{width : "10px",height : "100%"}}></Skeleton>
            </Stack> :null}
           
          </AddPic>
          {userEmail && show ? 
          <Typography fontSize={matches ? "medium" : "large"} component={"span"} paddingLeft={"5px"} fontWeight={"800"}>
          {userEmail}
          </Typography>
          : userEmail ? <Stack>
          <Skeleton sx={{width : "100px",height : "100%"}}></Skeleton>
          </Stack> : null}
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}