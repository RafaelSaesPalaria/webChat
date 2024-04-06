let xhr = new XMLHttpRequest()
let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

receiveMessages()

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
    let p = document.createElement('p')
    p.textContent = message
    content.general.appendChild(p)
}
