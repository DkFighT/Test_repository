let more_fields = document.getElementById("more_fields");

window.addEventListener('click', ()=>{
    if(document.getElementById('mentorenok').checked){
        more_fields.classList.remove('hide');
    }
    else{
        more_fields.classList.add('hide');
    }
})
