let xhr = new XMLHttpRequest()
let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

let messages = []

let namei = window.sessionStorage.getItem("name")
setInterval(receiveMessages,100)


content.me.send.addEventListener("click", function() {
    sendMessage(content.me.text.value)
})

/**
 * @Called When content.me.send is clicked
 * @Do ask the server to write the message/name
 * @param {String} message the message in question
 */
function sendMessage(message) {
    xhr.open('POST',location.href.concat('messages'))
    xhr.send(JSON.stringify({
        'todo':'write-on-server',
        'name':namei,
        'message':message}))
}

/**
 * @Called at every 100ms
 * @Do Receive the messages from the server
 */
function receiveMessages() {
    xhr.open('POST',location.href.concat("messages"),true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE &
            xhr.status == 200) {
            content.general.textContent = ''
            messages = JSON.parse(xhr.response)
            for (let message in messages) {
                writeMessage(messages[message])
            }
        }
    }
    xhr.send(JSON.stringify({
        'todo':'read-on-server',
        'msg-count':Object.keys(messages).length}))
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
