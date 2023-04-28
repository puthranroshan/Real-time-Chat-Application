const socket =io('http://localhost:9000');

const form =document.getElementById('send_container');
const messageInput =document.getElementById('messageinp');
const messageContainer =document.querySelector('.container');

var audio =new Audio('Message Tone.mp3');
const append =(message, position)=>{
    const messageElement =document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const message =messageInput.value;
  append(`You : ${message}`,'right');
  socket.emit('send',message);
})


const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);



socket.on('user-joined',data=>{
    //right yak andre right side al display aik adhke
    append(`${name} joined the chat`,'right');
})


socket.on('recieve',data=>{
   
    append(`${data.name}: ${data.message} `,'left');
})
socket.on('leave',name =>{
   
    append(`${data.name} left the chat `,'left');
})

