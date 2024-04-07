let xhr = new XMLHttpRequest()

let content = {
    namei : document.querySelector('input#name'),
    password : document.querySelector('input#password'),
    submit : document.querySelector('input#submit'),
}

content.submit.addEventListener("click",() => {
    let name = content.namei.value
    let password = content.password.value
    console.log(name)
    console.log(password)
    xhr.open('POST',location.href.concat(':login'))
    console.log(xhr.response)
    xhr.send(JSON.stringify({"name":name,"password":password}))
})

