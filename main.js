function mostrarInputCharEspecifico(){
    let seleccion = document.querySelectorAll('#options-char-esp option');
    let seleccionA = document.querySelector('#options-char-esp');
    let input = document.querySelector('#collapseCharEspecifico');
    seleccionA.addEventListener('click',manejarInput,false);

    function manejarInput(){
        if (seleccionA.value === 'custom-car-esp' && input.classList.contains('show') === false){
            if (input.classList.contains('show') === false){
                input.classList.add('show');
            }
            else if (input.classList.contains('show') === true){
                input.classList.remove('show','collapse');
                input.classList.add('collapsing');
                setTimeout(() => {
                    input.classList.remove('collapsing');
                    input.classList.add('collapse');
                },500);
            }
        } else {
            return;
        }
    }
}

mostrarInputCharEspecifico();