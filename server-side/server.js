const http = require('http')

const app = http.createServer((req, res) => {
    console.log('Someone is trying to acess: '.concat(req.url))
})

app.listen(3000, () => {
    console.log('Server open')
})