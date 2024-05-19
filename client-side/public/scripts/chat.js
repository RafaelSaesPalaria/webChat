let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

let namei = window.sessionStorage.getItem("name")
let password = window.sessionStorage.getItem("password")


content.me.send.addEventListener("click", function() {
    sendMessage(content.me.text.value)
})

let url = window.location.href.replace('http://','').split(':')[0]

let wss = new WebSocket('ws://'+url+':'+socket_port)
wss.onopen = () => {

    wss.send(JSON.stringify({'todo':'connect','password':password}))

    wss.onmessage = (message) => {

        // Remove excess (11 is the max)
        if (content.general.children.length>10) {
            content.general.removeChild(content.general.children[0])
        }

        writeMessage(JSON.parse(message.data))
    }
}
    

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
