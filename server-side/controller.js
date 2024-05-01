let app = require('express')
let routes = app.Router()

let look_url = (req, res, next) => {
    console.log('User requesting: ',req.url)
    next()
}

let get_chat = (req, res) => {
    res.render('chat',{serverData})
}

let get_login = (req, res) => {
    res.render('login',{serverData})
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
    res.status(404).render('login',{serverData})
}

module.exports = {
    look_url,
    get_chat,
    get_login,
    post_login,
    not_found
}