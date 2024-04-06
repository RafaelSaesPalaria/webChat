let xhr = new XMLHttpRequest()
let content = {
    general: document.querySelector('div#general-talk'),
    me : {
        text: document.querySelector('div#me input#text'),
        send:document.querySelector('div#me input#submit')
    }
}

xhr.open('GET',location.href.concat(":messages"))
xhr.onreadystatechange = function() {
    console.log(xhr.responseText)
}
xhr.send()
