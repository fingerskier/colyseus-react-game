import { Room, Client } from "colyseus";
import uuid from "uuid4"

const Context = require('../Context')
const Users = new Context('./data/users.json')


function validLogin(username='', password='') {
    let result,thisUser

    try {
        thisUser = Users[username]
        console.log('existing user', username)
        result = thisUser.password === password
        console.log('valid login')
    } catch (error) {
        Users[username] = {
            password: 'new',
            token: uuid(),
        }
        console.log('new user', username)
        result = false
    }

    return result
}

function validToken(token='',username='') {
    let result,thisUser

    try {
        thisUser = Users[username]
        console.log('existing user', username)
        result = thisUser.token === token
        console.log('valid token')
    } catch (error) {
        Users[username] = {
            password: 'new',
            token: uuid(),
        }
        console.log('new user', username)
        result = false
    }

    return result
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

        const {token,password,username} = options

        if (validToken(token,username)) {
            return username
        } else if (validLogin(username,password)) {
            const newToken = uuid()
            Users[username].token = newToken

            return true
        } else {

            return false
        }
    }

    onJoin (client: Client, options: any, auth: any) {
        console.log("successful join");
        console.log(client.id)
        console.log(client.sessionId)
        console.log(client.auth)
        console.log(options)
        console.log(auth)
    }

    onLeave (client: Client) {
        console.log('client leaving')
        console.log(client);
    }

    onDispose () {
        console.log("Dispose AuthRoom");
    }
}