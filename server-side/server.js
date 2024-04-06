const http = require('http')
const fs = require('fs')

let messages = ["Hi",'World']

const app = http.createServer((req, res) => {
    console.log('Someone is trying to acess: '.concat(req.url))

    let path = '../client-side/'

    switch (req.url) {
        case '/style.css':
            path+='style.css'
            break
        case '/index.js':
            res.setHeader('Content-Type','text/javascript')
            path+='index.js'
            break;
        case '/:messages':
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
            path+='index.html'
            break
    }
    res.end(fs.readFileSync(path))
})

app.listen(3000, () => {
    console.log('Server open')
})