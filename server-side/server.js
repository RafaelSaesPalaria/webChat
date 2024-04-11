const http = require('http')
const fs = require('fs')
const rd = require('readline-sync')

let devMode = true
let messages = []

console.log('Developer mode: ' + devMode)

let port = devMode ? 3000 : rd.question('Port: ')
let password = devMode ? 123 : rd.question('Password: ')

const app = http.createServer((req, res) => {
    console.log('Someone is trying to acess: '.concat(req.url))

    let path = '../client-side/'

    switch (req.url) {
        case '/chat.css':
            path+='chat.css'
            break
        case '/chat.js':
            res.setHeader('Content-Type','text/javascript')
            path+='chat.js'
            break
        case '/chat.html':
            path+='chat.html'
            break
        case '/login.css':
            path+='login.css'
            break
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
                        res.end(fs.readFileSync(path.concat('chat.html')))
                    }
                })
            }
            return
            break
        case '/login.js':
            res.setHeader('Content-Type','text/javascript')
            path+='login.js'
            break;
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
        case '/':
        default:
            path+='login.html'
            break
    }
    res.end(fs.readFileSync(path))
})

app.listen(port, () => {
    console.log('Server open')
})