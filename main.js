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

function mostrarResultados(){
    let botonAleatorio = document.querySelector('#boton-aleatorio');
    let botonEspecifico = document.querySelector('#boton-especifico');
    let resultDiv = document.querySelector('#result-row');
    let inputResult = resultDiv.querySelector('#input-result');

    botonAleatorio.addEventListener('click', () => {
        resultDiv.classList.remove('visually-hidden');
        inputResult.value = '';
        let opcUser = leerOpcionesUsuario();

        generarCadenaAleatoria(opcUser);
    });
    botonEspecifico.addEventListener('click', () => {
        resultDiv.classList.remove('visually-hidden');
        inputResult.value = '';
    });
}
mostrarResultados();

function generarCadenaAleatoria(opcUsr){
    let cadena = agregarCarac(opcUsr);
    cadena = shufflearCadena(cadena);
    
    console.log(cadena);
}

function agregarCarac(opcUsr){
    let cadena = [];
    switch (opcUsr[1]) {
        case 'ambas':
            for (let i= 65; i <= 90; i++){
                cadena.push(String.fromCharCode(i));
            }
            for (let i= 97; i <= 122; i++){
                cadena.push(String.fromCharCode(i));
            }
            break;
        case 'solo-min':
            for (let i= 97; i <= 122; i++){
                cadena.push(String.fromCharCode(i));
            }
            break;
        case 'solo-may':
            for (let i= 65; i <= 90; i++){
                cadena.push(String.fromCharCode(i));
            }
            break;
        default:
            break;
    }
    switch (opcUsr[2]) {
        case true:
            for (let i= 48; i <= 57; i++){
                cadena.push(String.fromCharCode(i));
            }
            break;
        case false:
            break;
        default:
            break;
    }
    switch (opcUsr[3]) {
        case 'all-car-esp':
            for (let i= 33; i <= 47; i++){
                cadena.push(String.fromCharCode(i));
            }
            for (let i= 58; i <= 64; i++){
                cadena.push(String.fromCharCode(i));
            }
            for (let i= 91; i <= 96; i++){
                cadena.push(String.fromCharCode(i));
            }
            for (let i= 123; i <= 126; i++){
                cadena.push(String.fromCharCode(i));
            }
            break;
        case 'some-car-esp':
            cadena.push(String.fromCharCode(42));
            cadena.push(String.fromCharCode(43));
            cadena.push(String.fromCharCode(45));
            cadena.push(String.fromCharCode(47));
            break;
        default:
            let newCad = opcUsr[3].split('');
            for (let i = 0; i < newCad.length; i++){
                if (newCad[i] !== ' '){
                    cadena.push(newCad[i]);
                }
            }
            break;
    }
    return cadena;
}

function shufflearCadena(cadena){
    // fisher-yates shuffle
}

function leerOpcionesUsuario(){
    let longitud = document.querySelector('#opc-long').value;
    let hasLetras = document.querySelector('#letras-check').checked;
    let hasNumeros = document.querySelector('#num-check').checked;
    let hasEspChar = document.querySelector('#charesp-check').checked;
    if (hasLetras){
        let valorLetras = document.querySelector('#options-letras').value;
        hasLetras = valorLetras;
    }
    if (hasEspChar){
        let valorChar = document.querySelector('#options-charesp').value;
        if (valorChar === 'custom-car-esp'){
            let charEspecifico = document.querySelector('#char-especif-aleat').value;
            hasEspChar = charEspecifico;
        } else {
            hasEspChar = valorChar;
        }
    }
    let opcionesUser = [longitud, hasLetras, hasNumeros, hasEspChar];
    return opcionesUser;
}

function extraerEspecChar(string){

}