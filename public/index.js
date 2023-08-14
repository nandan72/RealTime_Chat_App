const socket=io()   // create a new connection between the server and the client
let total=document.getElementById("client-total")
let messagecontainer =document.getElementById('message-container')

let nameinput=document.getElementById("name-input")
let messageform=document.getElementById("message-form")
let messageinput=document.getElementById("message-input")


messageform.addEventListener("submit",(e)=>{

e.preventDefault()

    sendmessage()

})

function sendmessage(){
    if(messageinput.value===""){
        return
    }
    console.log(messageinput.value)
    const data={
        "name":nameinput.value,
        "message":messageinput.value,
        "datetime":new Date()

    }
    socket.emit("message",data)
    addmessage(true,data)
    messageinput.value=""
}

socket.on("chat-message",(data)=>{
 console.log(data)
 addmessage(false,data)
})

function addmessage(ownmessage,data){
    const element=`<li class="${ownmessage?"message-right":"message-left"}">
    <p class="message">
      ${data.message}
      <span>${data.name} ${moment(data.dateTime).fromNow()}</span>
    </p>
  </li>`
  messagecontainer.innerHTML+=element
  scroll()
}



socket.on("clients-total",(data)=>{
    console.log(data)
    total.innerHTML=`total client ${data}`
    
})

function scroll(){
    messagecontainer.scrollTo(0,messagecontainer.scrollHeight)
}



