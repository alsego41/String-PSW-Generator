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

function seleccionTipoPatron(){
    let radio = document.querySelectorAll('input[name="patron"]');
    
    radio.forEach((tipo) => {
        tipo.addEventListener('change', () => {
            let tipoSeleccionado = document.querySelector('input[name="patron"]:checked');
            let id = tipoSeleccionado.getAttribute('id');
            cambioDePatron(id);
        });
    });
}
seleccionTipoPatron()

function cambioDePatron(id){
    let secEspPat = document.querySelector('#patron-espec');
    let resultados = document.querySelector('#result-row');

    let opciones = document.querySelector('#opc-selec');
    let genCadena = document.querySelector('#gen-cadena-top-hint');
    let custom = document.querySelector('#custom-row');
    if (id === 'pat-aleatorio'){
        secEspPat.classList.add('visually-hidden');
        resultados.classList.add('visually-hidden');
        opciones.classList.remove('visually-hidden');
        genCadena.classList.remove('visually-hidden');
        custom.classList.remove('visually-hidden');
    }
    else if (id === 'pat-especifico'){
        secEspPat.classList.remove('visually-hidden');
        resultados.classList.add('visually-hidden');
        opciones.classList.add('visually-hidden');
        genCadena.classList.add('visually-hidden');
        custom.classList.add('visually-hidden');
    }
}