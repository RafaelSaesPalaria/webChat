const http = require('http')
const fs = require('fs')
const rd = require('readline-sync')
const express = require('express')
const app = express()
const path = require('path');
const { routes, server_data } = require('./controller.js')
const WebServer_Socket = require('./webserver_socket.js')

// WEBSOCKET

new WebServer_Socket(server_data.socket_port)

// EXPRESS SETTINGS

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '..', 'client-side', 'views'));

app.listen(server_data.server_port, () => {
    console.log('Server open')
})

app.use(express.static(path.join(__dirname, '..', 'client-side', 'public')));

// MIDDLEWARE
app.use(routes.look_url)
app.post('/login', routes.post_login)
app.use('/chat', routes.get_chat)
app.use('/', routes.get_login)
app.use( routes.not_found)
