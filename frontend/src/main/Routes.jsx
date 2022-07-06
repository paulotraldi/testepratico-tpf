import React, {useContext} from "react"
import { Routes, Route, Navigate} from "react-router-dom"
 
import Home from '../componentes/home/Home'
import UserMnt from '../componentes/user/UserMnt'
import Login from '../componentes/login/Login'
import Logoff from '../componentes/login/Logoff'
import CourseMnt from '../componentes/course/CourseMnt'
import UserCourseMnt from '../componentes/user_course/UserCourseMnt'
import { AuthProvider, AuthContext } from './Auth'

export default props => {
   const Private = ({children})=>{
      const { authenticated, loading } = useContext(AuthContext)
      if(loading){
         return <div className="loading">Carregando...</div>
      }
      if (!authenticated){
         return <Navigate to ="/login" />
      }
      return children

   }
  
   return (
      <AuthProvider>
         <Routes>
            <Route exact path ="/" element={<Private><Home /></Private>} />
            <Route path ="/login" element={<Login />} />
            <Route path ="/users" element={<Private><UserMnt /></Private>} />
            <Route path ="/courses" element={<Private><CourseMnt /></Private>} />
            <Route path ="/userscourses" element={<Private><UserCourseMnt /></Private>} />
            <Route path ="/logoff" element={<Private><Logoff /></Private>} />
            <Route  path ="*" element={<Private><Home /></Private>} />
         </Routes>
      </AuthProvider>
   )
   }