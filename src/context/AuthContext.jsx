import {createContext, useContext, useEffect, useState} from 'react';
import { getCurrentUser } from '../appwrite/api';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
  id:'',
  name:'',
  email:'',
  imageUrl:'',
  bio:''
}

export const INITIAL_STATE = {
  user:INITIAL_USER,
  isLoading: false,
  isAuthenticated:false,
  setUser:()=>{},
  setIsAuthenticated:()=>{},
  checkAuthUser:async ()=>false,
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if(
      localStorage.getItem('cookieFallback')==='[]' ||
      localStorage.getItem('cookieFallback')===null
    ){navigate('/sign-up');}
    
      checkAuthUser();
    
  },)
  
  const checkAuthUser = async() =>{
    try {
      const currentAccount = await getCurrentUser();
      if(currentAccount){
        setUser({
          id:currentAccount.$id,
          name:currentAccount.name,
          email:currentAccount.email,
          imageUrl:currentAccount.imageUrl,
          bio:currentAccount.bio
        })
        setIsAuthenticated(true);

        return true;
      }
      return false;

    } catch (error) {
      console.log(error);
      return false;
    }finally{
      setIsLoading(false)
    }
  }

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext) 