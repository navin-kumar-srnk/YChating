import { useRef,useContext } from "react";
import socketIOClient from "socket.io-client";
import { useHistory } from "react-router-dom";
import {messageContext,userContext,playContext,UrlContext} from './context'

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "/";

const useChat = () => {
  // const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  const history = useHistory();
  const {messages, setMessages} = useContext(messageContext)
  const { setUsers} = useContext(userContext)
  const { setplay} = useContext(playContext)
  const { setUrl} = useContext(UrlContext)
  // useEffect(() => {
    
  //   // Creates a WebSocket connection
    
    

  //   // Destroys the socket reference
  //   // when the connection is closed
  //   return () => {
  //     socketRef.current.disconnect();
  //   };
  // }, []);




  socketRef.current = socketIOClient(SOCKET_SERVER_URL);
  
socketRef.current.on('setUrl',(url)=>{
console.log(url);
setUrl((prevUrl)=> url.url)
})



  socketRef.current.on('letIn', (users) => {
   console.log(users);
  setUsers(prevState => {return [...prevState, users]
  })
    history.push('/home')

  });

 

    // Listens for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
 
   
 console.log(message);
 
 setMessages((messages)=>{ return [...messages,message]})
 console.log(messages);

    });
  
      
      // On video play
      socketRef.current.on("playVideo", (message) => {
 console.log(message.state);
       setplay(message.state)
           });
   
  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT,  messageBody);
    // setMessages(''); 
   };

  const joinRoom = (messageBody) => {
return new Promise((resolve, reject)=>{
  socketRef.current.emit('joinRoom',messageBody,(res)=>{
    console.log(res);
    resolve(res)
        });
})
  };


  const playVideo = (messageBody) => {

      socketRef.current.emit('onVideoPlay',messageBody);
  
      };

      const setPlayerUrl = (url) => {

        socketRef.current.emit('setUrl',url);
    
        };

      
  return { sendMessage, joinRoom,playVideo,setPlayerUrl};
};

export default useChat;