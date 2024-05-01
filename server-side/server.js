const http = require('http')
const fs = require('fs')
const rd = require('readline-sync')
const express = require('express')
const app = express()
const ws = require('ws')
const path = require('path');

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

// MIDDLEWARE
app.use(express.static(path.join(__dirname, '..', 'client-side', 'public')));

app.use((req, res, next) => {
    console.log('User requesting: ',req.url)
    next()
})

app.post('/login', (req, res) => {
    let body = ''
    req.on('data', (chunk) => {
        body+=chunk
    })
    req.on('end',() => {
        console.log(JSON.parse(body))
        body = (JSON.parse(body))
        if (body.password==password || password===undefined) {
            lastName = body.name
            res.json({
                'todo':'redirect',
                'href':'/chat'
            })
        }
    })
})
app.use('/chat', (req, res) => {
    res.render('chat',{serverData})
})

app.use('/',(req, res) => {
    res.render('login',{serverData})
})
app.use((req, res) => {
    console.log('404: ',req.url)
    res.status(404).render('login',{serverData})
})
