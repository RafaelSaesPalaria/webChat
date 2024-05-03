let app = require('express')
let routes = app.Router()

// SERVER SETTINGS

let devMode = true

console.log('Developer mode: ' + devMode)

let serverName = devMode ? 'MyServer' : rd.question('Server name: ')
let server_port = devMode ? 3009 : rd.question('Server Port: ')
let socket_port = devMode ? 3002 : rd.question('Socket Port: ')
let password = devMode ? 123 : rd.question('Password: ')

let server_data = {
    serverName,
    server_port,
    socket_port,
    hasPassword: password ? true : false 
}


let look_url = (req, res, next) => {
    console.log('User requesting: ',req.url)
    next()
}

let get_chat = (req, res) => {
    res.render('chat',{server_data})
}

let get_login = (req, res) => {
    res.render('login',{server_data})
}

let post_login = (req, res) => {
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
}

let not_found = (req, res) => {
    console.log('404: ',req.url)
    res.status(404).render('login')
}

module.exports = { 
    routes: {
        look_url,
        get_chat,
        get_login,
        post_login,
        not_found
    },
    server_data
}