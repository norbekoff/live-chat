class Chatroom {
    constructor(room, username, color) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.unsub;
    }

    async addChat(message) {
       const now = new Date();
       const chat = {
           message,
           username: this.username,
           room: this.room,
           created_at: firebase.firestore.Timestamp.fromDate(now)
       }
       const response = await this.chat.add(chat);
       return response;
    }

    getChats(callback){
        this.unsub = this.chat
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added') {
                        callback(change.doc.data());
                    }
                })
        })
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', username)
    }

    updateRoom(room){
        this.room = room;
        if(this.unsub) {
            console.log('room updated mate')
            this.unsub();
        }
    }




}


// const msg = prompt('what is your message mate?')
// nigga.addChat(msg)
//     .then(() => console.log('its been added'))
//     .catch(err => console.log(err))


// setTimeout(() => {
//     chatroom.updateName('dima');
//     chatroom.updateRoom('gaming');
//     chatroom.getChats(data => {
//         console.log(data)
//     })
//     chatroom.addChat('qalesanla ish yoqmasla')
// }, 3000);