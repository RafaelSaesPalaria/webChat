let app = require('express')
let routes = app.Router()
const fs = require('fs')
let server_data = fs.readFileSync('server/server_config.json','utf-8')
server_data = JSON.parse(server_data)

// SERVER SETTINGS
server_data['hasPasword'] = server_data.password ? true : false 



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
    server_data,
    password
}