const ws = require('ws')
module.exports = class WebServer_Socket {
    constructor(port) {
        this.connections = []
        this.wss = this.create_socket(port)
        this.connect_socket(this.wss)
    }

    /**
     * @Called at the start of the server
     * @Do Create a socket server
     * @param {Number} port 
     * @returns the server
     */
    create_socket(port) {
    return new ws.Server({'port':port}, () => {
            console.log('Web socket created')
        })
    }

    /**
     * @Called when a client connect to the socket
     * @Do resend the message to all connections
     * @param {WebSocket.Server} wss 
     */
    connect_socket(wss) {
        wss.on('connection', (stream) => {
            let con = stream

            stream.on('message', (message) => {
                this.connections.forEach(con => {
                    con.send(message.toString())
                })
            })

            this.connections.push(con)
        })
    }
}