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

    fetch('/login',{
        'method':'POST',
        'body':JSON.stringify(data)})
        
        .then((response) => response.json().then((response) => {
            window.sessionStorage.setItem("name",data.name)
            window.sessionStorage.setItem("password",data.password)
            if (response['todo']==='redirect') {
                window.location.href=(response['href'])
            }
        })).catch((err) => {
            console.log(err)
        })
})

