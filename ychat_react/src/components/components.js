import React from "react";
import "./component.css";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState ,useContext} from "react";
import useChat from "../socket";
import {GlobalContext,messageContext,userContext,playContext,UrlContext} from '../context'
// import {useHistory} from 'react-router-dom'
import './login.css';
import playbutton from '../baseline_play_circle_filled_black_24dp.png';
function Home() {
  


  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row p-0">
            <div className="col-lg-4  p-0">
              <ChatBox></ChatBox>
            </div>
            <div className="col-lg-8 p-0   d-flex align-items-center" style={{backgroundColor:"#121212b0"}}>
              <VideoPlayer></VideoPlayer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function VideoPlayer() {
  const {playVideo,setPlayerUrl}=useChat()
  const {clientInfo}=useContext(GlobalContext)
  const {playState}=useContext(playContext)
  const {url}=useContext(UrlContext)
  const videPlayerRef = useRef()
  const urlInputRef=useRef()
  console.log(videPlayerRef.current);
  return (
 <>
   { url && <div style={{ height: "99vh", width: "100%" }}>
      <ReactPlayer
      ref={videPlayerRef}
        width="100%"
        height="100%"
        url={url} controls={false} playing={playState} onPause={(e)=>{playVideo({roomId:clientInfo.roomId,state:false})}}  onPlay={(e)=>{playVideo({roomId:clientInfo.roomId,state:true})}}
      />
    </div>}
   {!url&&<div  style={{ height: "99vh", width: "100%" ,display:"grid",placeItems:'center'}}>
<div className="d-flex flex-column">
<input className="p-2 form-control text-center" ref={urlInputRef} type="text" placeholder="video url"/> 
    <div className="p-4 d-flex justify-content-center">
    <span className="btn " onClick={()=>{ setPlayerUrl({roomId:clientInfo.roomId,url:urlInputRef.current.value})}}>

      <img src={playbutton} alt=""/>
    </span>
    </div>
</div>
   </div>
     
   
   
   }
 </>
  );
}
function JoinForm() {

  const {setClientInfo} = useContext(GlobalContext)

  const { joinRoom } = useChat();

  const roomIdRef = useRef();
  const nameRef = useRef();
  const [loading, setloading] = useState(false);

  const joinHandler = async (e) => {
    e.preventDefault();
    joinRoom({
      name: nameRef.current.value,
      roomId: roomIdRef.current.value,
    }).then((res) => {
       setClientInfo((prevState)=>{return {...prevState,name:res.name,roomId:res.roomId}})
      setloading((prevState) => {
        return !prevState;
      });

    });
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', height:'100vh'}}>
    <div class="text-center signBody">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Join Ychat</h1>
      
      <label for="inputEmail" style={{float: 'left'}} class="sr-only">Room ID</label>
      <input
              type="text"
              class="form-control"
              id="inputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter Room Id"
              ref={roomIdRef}
      />
      <small id="emailHelp" style={{display: 'inline-block'}}class="form-text text-muted">
              Ask your partner for room id if your joining
      </small>
      <label for="inputPassword" style={{float: 'left'}} class="sr-only">Name</label>
      <input
              type="text"
              class="form-control"
              id="inputPassword"
              placeholder="Name"
              ref={nameRef}
      />
      <button
              style={loading ? { pointerEvents: "none", opacity: "0.2" } : null}
              class="btn btn-lg btn-primary btn-block"
              onClick={(e) => {
                joinHandler(e);
              }}
            >
              {!loading && <span>JOIN</span>}
              {loading && (
                <span className="d-flex align-items-center h4">
                  {" "}
                  <span className="p-2">waiting for other to join </span>
                  <div class="p-2 spinner-border" role="status"></div>
                </span>
              )}
      </button>
     </form>
    </div>
  </div>
  );
}
function ChatBox() {

const textRef=useRef()
const {clientInfo}=useContext(GlobalContext)
const {messages}=useContext(messageContext)
const {users}=useContext(userContext)
const {sendMessage} = useChat()


console.log(users);
  return (
    <>
      <div style={{ height: "99vh" }}>
        <div className="topbar d-flex justify-content-lg-center align-items-center"> 
        
       {users[0]&&users[0].map((item,i)=>{ return  <div key={i} className="avatar m-2 text-uppercase" style={{backgroundColor:"black",color:"white",borderRadius:"50%",width:"50px",height:"50px",display:"grid",placeItems:"center"}}>{ item.name.substr(0,1)+item.name.substr(-1,1) }</div> })}
        
        </div>
        <div className="chatArea">
        { 
        messages.map((item,i)=>{ return  <div key={i} className={`container-fluid p-2 d-flex  ${clientInfo.name === item.name?'justify-content-end':'justify-content-start'}`}>
        <div className="w-75 message p-2 m-2">
           {/* eslint-disable-next-line  */}
          <h4 style={clientInfo.name === item.name?{ textAlign: "right" }:null,{wordBreak:"break-all"}} className='text-wrap'>{item.message}</h4>
        </div>
      </div>
       })
       
          }
          {/* <div className="container-fluid p-2 d-flex justify-content-end">
            <div className="w-75 bg-secondary rounded p-2  m-2">
              <h2 style={{ textAlign: "right" }}>hi</h2>
            </div>
          </div> */}
        </div>
        <div className="conatiner-fluid inputArea d-flex  justify-content-lg-around" style={{backgroundColor:"#1212124d",margin:'auto'}}>
          <input ref={textRef}
            className="flex-grow-1 form-control m-3"
            type="text"
            placeholder="text here"
          />
          <button className="btn btn-primary btn-sm m-auto" onClick={(()=>{ sendMessage({roomId:clientInfo.roomId,message:textRef.current.value,name:clientInfo.name}) ; textRef.current.value = ''; })}>SEND</button>
        </div>
      </div>
    </>
  );
}

export { VideoPlayer, JoinForm, Home, ChatBox };
