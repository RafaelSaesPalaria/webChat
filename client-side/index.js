let xhr = new XMLHttpRequest()
let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

setInterval(receiveMessages,100)


content.me.send.addEventListener("click", function() {
    sendMessage(content.me.text.value)
})

function sendMessage(message) {
    xhr.open('POST',location.href.concat(':messages'))
    xhr.send(message)
}

function receiveMessages() {
    xhr.open('GET',location.href.concat(":messages"))
    xhr.onreadystatechange = function() {
        if (xhr.readyState === xhr.DONE &
            xhr.status == 200) {
            content.general.textContent = ''
            let messages = JSON.parse(xhr.responseText)
            for (let message of messages) {
                console.log(message)
                writeMessage(message)
            }
        }
    }
    xhr.send()
}

function writeMessage(message) {
    let div = document.createElement('div')
    div.setAttribute('id','message')
    
    let messages = document.createElement('span')
    messages.setAttribute('id','message')

    let author = document.createElement('span')
    author.setAttribute('id','author')

    messages.textContent = message
    author.textContent = 'Null'

    div.appendChild(messages)
    div.appendChild(author)

    content.general.appendChild(div)
}
