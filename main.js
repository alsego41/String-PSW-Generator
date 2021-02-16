function activarCollapseCharEspOpciones(){
    let select = document.querySelector('#options-charesp');
    let input = document.querySelector('#opc-charesp-input');
    let isChecked;
    select.addEventListener('change',() => {
        if (select.value === 'custom-car-esp'){
            select.setAttribute('data-bs-toggle','collapse');
            select.setAttribute('data-bs-target','#opc-charesp-input');
            setTimeout(()=>{
                select.removeAttribute('data-bs-toggle','collapse');
                select.removeAttribute('data-bs-target','#opc-charesp-input');
            },0);
        } else {
            if (input.classList.contains('show')){
                select.setAttribute('data-bs-toggle','collapse');
                select.setAttribute('data-bs-target','#opc-charesp-input');
                setTimeout(()=>{
                    input.classList.remove('show');
                    input.classList.remove('collapse');
                    input.classList.add('collapsing');
                },200);
                setTimeout(()=>{
                    input.classList.remove('show');
                    input.classList.remove('collapsing');
                    input.classList.add('collapse');
                    select.removeAttribute('data-bs-toggle','collapse');
                    select.removeAttribute('data-bs-target','#opc-charesp-input');
                },300);
            }
        }
    });
}

activarCollapseCharEspOpciones();

function activarCustomization(){
    let letrasOpc = document.querySelector('#letras-check');
    let letrasConf = document.querySelector('#letras-custom');
    let espCharOpc = document.querySelector('#charesp-check');
    let espCharConf = document.querySelector('#char-custom');

    letrasOpc.addEventListener('change',() => {
        letrasConf.classList.toggle('visually-hidden');
        manejarVisibilidadConfigs(letrasConf,espCharConf);
    });

    espCharOpc.addEventListener('change',() => {
        espCharConf.classList.toggle('visually-hidden');
        manejarVisibilidadConfigs(espCharConf,letrasConf);
    });
}

function manejarVisibilidadConfigs(objetoActual,objetoYaActivo){
    let row = document.querySelector('#custom-row');
    let configsInactivos = row.querySelectorAll('.visually-hidden').length;
    if (configsInactivos === 1){
        objetoActual.classList.remove('col-lg-6');
        objetoActual.classList.add('col-lg-12');
        objetoYaActivo.classList.remove('col-lg-6');
        objetoYaActivo.classList.add('col-lg-12');
    }
    else if (configsInactivos === 0){
        objetoActual.classList.add('col-lg-6');
        objetoActual.classList.remove('col-lg-12');
        objetoYaActivo.classList.add('col-lg-6');
        objetoYaActivo.classList.remove('col-lg-12');
    }
}

activarCustomization();