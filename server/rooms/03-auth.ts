import { Room, Client } from "colyseus";


function validLogin(username='', password='') {
    return (username === 'test') && (password === 'pass')
}

function validToken(token='',username='') {
    return (username === 'test') && (token === '1234')
}


export class AuthRoom extends Room {
    onCreate (options: any) {
        console.log("StateHandlerRoom created!", options);

        this.onMessage("*", (client, type, message) => {
            console.log("AuthRoom received message from", client.sessionId, ":", message);
        });
    }

    async onAuth (client: Client, options: any) {
        console.log('auth.client', client.id)
        console.log('auth.options', options)

        const {accessToken,password,username} = options

        if (validToken(accessToken,username)) {
            return true
        } else if (validLogin(username,password)) {
            return true
        } else {
            return false
        }
    }

    onJoin (client: Client, options: any, auth: any) {
        console.log(client.sessionId, "joined successfully");
        console.log("Auth data: ", auth);
    }

    onLeave (client: Client) {
        console.log(client.sessionId, "left");
    }

    onDispose () {
        console.log("Dispose AuthRoom");
    }

}
