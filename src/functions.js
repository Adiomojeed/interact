function focused(a){
    a.placeholder = ''
    a.previousElementSibling.style.visibility='visible'
}

function blurred(b) {
    b.placeholder=b.previousElementSibling.innerHTML
    b.previousElementSibling.style.visibility='hidden'
}