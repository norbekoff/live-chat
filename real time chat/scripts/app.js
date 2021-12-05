
const list = document.querySelector('.chat-list');
const chatRooms = document.querySelector('.chat-rooms');
const nameForm = document.querySelector('.new-name');
const form = document.querySelector('.new-chat');
const notf = document.querySelector('.notification');

form.addEventListener('submit', e=> {
    e.preventDefault();

    const msg = form.message.value.trim();
    chatroom.addChat(msg)
        .then(()=> {
            form.reset();
            list.scrollTo(0,999999999)})
        .catch(err=> console.log(err));
       
        
    })

nameForm.addEventListener('submit', e=> {
    e.preventDefault();
    const username = nameForm.name.value.trim();
    chatroom.updateName(username);
    nameForm.reset();

    notf.textContent = `your name was updated to  ${username}`
    setTimeout(() => {
        notf.textContent =  ''
    }, 3000);
})

  
   const username = localStorage.username ? localStorage.username : 'anon';
    
    const chatUI = new ChatUI(list);
    const chatroom = new Chatroom("gaming", username);
    
    chatroom.getChats((data)=> {
        
        chatUI.render(data)
    });


  
chatRooms.addEventListener('click', e=> {
    if(e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats((data) => {
            chatUI.render(data)
        })
    }
})