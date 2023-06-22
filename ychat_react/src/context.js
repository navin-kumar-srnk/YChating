import React, { useState, createContext } from 'react'

 const GlobalContext = createContext()
 const messageContext = createContext()
 const userContext = createContext()
 const playContext = createContext()
 const UrlContext = createContext()

 
const GlobalContextProvider = (props) => {
  const [clientInfo, setClientInfo] = useState({})
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [playState, setplay] = useState(false)
  const [url, setUrl] = useState("")
  return (
    <UrlContext.Provider  value={{url,setUrl}} > 
         <playContext.Provider value={{playState,setplay}}> 
    <userContext.Provider value={{users,setUsers}}>
    <messageContext.Provider value={{messages,setMessages}}>
    <GlobalContext.Provider value={{clientInfo,setClientInfo}}>
        {props.children}
    </GlobalContext.Provider>
    </messageContext.Provider>
    </userContext.Provider>
    </playContext.Provider>
    </UrlContext.Provider>

  )
}

export {GlobalContext,messageContext,userContext,playContext,UrlContext}
export default GlobalContextProvider