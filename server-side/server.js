const http = require('http')
const fs = require('fs')

let password = 123
let messages = []

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
                        res.end(fs.readFileSync(path.concat('chat.html')))
                    }
                })
                return
            }
            break
        case '/login.js':
            res.setHeader('Content-Type','text/javascript')
            path+='login.js'
            break;
        case '/chat:messages':
            if (req.method === 'GET') {
                res.setHeader('Content-Type','application/json')
                res.end(JSON.stringify(messages))
                return
            } else if (req.method === 'POST') {
                let body = ''
                req.on('data', (chunk) => {
                    body+=chunk
                })
                req.on('end',() => {
                    messages.push(body)
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

app.listen(3000, () => {
    console.log('Server open')
})