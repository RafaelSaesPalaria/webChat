let xhr = new XMLHttpRequest()

let content = {
    namei : document.querySelector('input#name'),
    password : document.querySelector('input#password'),
    submit : document.querySelector('input#submit'),
}

content.submit.addEventListener("click",() => {
    let name = content.namei.value
    let password = content.password.value
    xhr.open('POST',location.href.concat('login'))
    xhr.send(JSON.stringify({"name":name,"password":password}))
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 & xhr.readyState == xhr.DONE) {
            window.sessionStorage.setItem("name",name)
            document.open()
            document.write(xhr.response)
            document.close()
        }
    }
})

