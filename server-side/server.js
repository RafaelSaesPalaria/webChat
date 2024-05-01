const http = require('http')
const fs = require('fs')
const rd = require('readline-sync')
const express = require('express')
const app = express()
const ws = require('ws')
const path = require('path');
const routes = require('./controller.js')

// SERVER SETTINGS

let devMode = true

console.log('Developer mode: ' + devMode)

let serverName = devMode ? 'MyServer' : rd.question('Server name: ')
let port = devMode ? 3000 : rd.question('Server Port: ')
let socket = devMode ? 3001 : rd.question('Socket Port: ')
let password = devMode ? 123 : rd.question('Password: ')

let serverData = {
    serverName,
    hasPassword: password ? true : false 
}

// WEBSOCKET

let wss = new ws.Server({'port':socket}, () => {
    console.log('Web socket created')
})

let connections = []

wss.on('connection', (stream) => {
    let con = stream

    stream.on('message', (message) => {
        connections.forEach(con => {
            con.send(message.toString())
        })
    })

    connections.push(con)
})
// EXPRESS SETTINGS

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '..', 'client-side', 'views'));

app.listen(port, () => {
    console.log('Server open')
})

app.use(express.static(path.join(__dirname, '..', 'client-side', 'public')));

// MIDDLEWARE

app.use((req, res, next) => routes.look_url)
app.post('/login', (req, res) => routes.post_login)
app.use('/chat', (req, res) => routes.get_chat)
app.use('/',(req, res) => routes.get_login)
app.use((req, res) => routes.not_found)
