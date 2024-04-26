let wss = new WebSocket({port:3001})

let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

let messages = []

let namei = window.sessionStorage.getItem("name")


content.me.send.addEventListener("click", function() {
    sendMessage(content.me.text.value)
})

/**
 * @Called When content.me.send is clicked
 * @Do ask the server to write the message/name
 * @param {String} message the message in question
 */
function sendMessage(message) {
    let msg = 
        {'todo':'write-on-server',
        'name':namei,
        'message':message}
    wss.send(JSON.stringify(msg))
}

/**
 * @Called when a message is sent
 * @Do Receive the messages from the server
 */
function receiveMessages() {
    wss.on('message', (message) => {
        console.log(message)
    })
}

/**
 * @Called After the client receive the server's messages
 * @Do write the messages of the server on the client
 * @param {{name:String, message:String}} message 
 */
function writeMessage(message) {
    let div = document.createElement('div')
    div.setAttribute('id','message')
    
    let messages = document.createElement('span')
    messages.setAttribute('id','message')

    let author = document.createElement('span')
    author.setAttribute('id','author')

    messages.textContent = message["message"]
    author.textContent = message["name"]

    div.appendChild(messages)
    div.appendChild(author)

    content.general.appendChild(div)
}
