let xhr = new XMLHttpRequest()

let content = {
    namei : document.querySelector('input#name'),
    password : document.querySelector('input#password'),
    submit : document.querySelector('input#submit'),
}

content.submit.addEventListener("click",() => {
    let data = {
        'name' : content.namei.value,
        'password' : content.password ? content.password.value : undefined 
    }

    xhr.open('POST',location.href.concat('login'))
    xhr.send(JSON.stringify(data))
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 & xhr.readyState == xhr.DONE) {
            let response = JSON.parse(xhr.response)

            window.sessionStorage.setItem("name",data.name)
            if (response['todo']==='redirect') {
                window.location.href=(response['href'])
            }
            
        }
    }
})

