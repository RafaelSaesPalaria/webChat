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

let url = window.location.href.replace('http://','').split(':')[0]

let wss = new WebSocket('ws://'+url+':3001')
wss.onopen = () => {
    wss.onmessage = (message) => {
        console.log(JSON.parse(message.data))
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
