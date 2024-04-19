const http = require('http')
const fs = require('fs')
const rd = require('readline-sync')
const express = require('express')
const app = express()

let devMode = true
let messages = []

console.log('Developer mode: ' + devMode)

let serverName = devMode ? 'Test' : rd.question('Server name: ')
let port = devMode ? 3000 : rd.question('Port: ')
let password = devMode ? 123 : rd.question('Password: ')

/*
app = http.createServer((req, res) => {
    console.log('Someone is trying to acess: '.concat(req.url))

    let path = '../client-side/'

    switch (req.url) {
        case '/:login':
            if (req.method === 'POST') {
                let body = ''
                req.on('data', (chunk) => {
                    body+=chunk
                })
                req.on('end',() => {
                    body = (JSON.parse(body))
                    if (body.password==password) {
                        lastName = body.name
                        res.end(fs.readFileSync(path.concat('view/chat.html')))
                    }
                })
            }
            return
            break
        case '/:messages':
        case '/chat:messages':
            if (req.method === 'POST') {
                let body = ''
                req.on('data', (chunk) => {
                    body+=chunk
                })
                req.on('end',() => {
                    body = JSON.parse(body)
                    console.log(body)
                    if (body['todo']==='write-on-server') {
                        messages.push(body)
                        res.end()
                    } else if (body['todo']==='read-on-server') {
                        res.end(JSON.stringify(messages))
                    }
                })
                return
            }
            break;
*/

// SERVER SETTINGS

app.set('view engine','ejs')
app.set('views','./../client-side/views/')

app.listen(port, () => {
    console.log('Server open')
})

// MIDDLEWARE
app.use(express.static('./../client-side/public'))

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
        body = (JSON.parse(body))
        if (body.password==password) {
            lastName = body.name
            res.render('chat.ejs')
        }
    })
})

app.post('/messages', (req, res) => {
    let body = ''
        req.on('data', (chunk) => {
            body+=chunk
        })
        req.on('end',() => {
            body = JSON.parse(body)
            console.log(body)
            if (body['todo']==='write-on-server') {
                messages.push(body)
                res.end()
            } else if (body['todo']==='read-on-server') {
                res.end(JSON.stringify(messages))
            }
        })
})
app.use('/',(req, res) => {
    res.render('login.ejs',{})
})
app.use((req, res) => {
    console.log('404: ',req.url)
    res.status(404).render('login.ejs',{})
})
