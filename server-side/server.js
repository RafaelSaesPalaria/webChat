const http = require('http')
const fs = require('fs')

const app = http.createServer((req, res) => {
    console.log('Someone is trying to acess: '.concat(req.url))

    let path = '../client-side/'

    switch (req.url) {
        case '/style.css':
            path+='style.css'
            break
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