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
        let cadenaGenerada = generarCadenaAleatoria(opcUser);
        inputResult.value = cadenaGenerada.join('');
    });
    botonEspecifico.addEventListener('click', () => {
        resultDiv.classList.remove('visually-hidden');
        inputResult.value = '';
        let patron = manejarInputEspec();
        let cadenaGenerada = generarCadenaEspec(patron);
        inputResult.value = cadenaGenerada.join('');
    });
}

function generarCadenaAleatoria(opcUsr){
    let cadena = agregarCarac(opcUsr);
    let cadenaAleatoria = [];
    let nroRandom;
    for (let i = 0; i < opcUsr[0]; i++) {
        shufflearCadena(cadena);
        nroRandom = Number(Math.floor(Math.random() * cadena.length));
        cadenaAleatoria.push(cadena[nroRandom]);
    }
    return cadenaAleatoria;
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
        case false:
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

function shufflearCadena(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

activarCollapseCharEspOpciones();
activarCustomization();
seleccionTipoPatron();
mostrarResultados();

function generarCadenaEspec(patron){
    let hasEspChar = document.querySelector('#pat-charesp-check').checked;
    let charEspec = [];
    if (hasEspChar){
        let inputCharEsp = document.querySelector('#input-charesp-pat-espec').value;
        let newCad = inputCharEsp.split('');
        for (let i = 0; i < newCad.length; i++){
            if (newCad[i] !== ' '){
                charEspec.push(newCad[i]);
            }
        }
    }
    let cadenaEspec = [];
    let mayus = [];
    for (let i= 65; i <= 90; i++){
        mayus.push(String.fromCharCode(i));
    }
    let minus = [];
    for (let i= 97; i <= 122; i++){
        minus.push(String.fromCharCode(i));
    }
    let nums = [];
    for (let i= 48; i <= 57; i++){
        nums.push(String.fromCharCode(i));
    }
    let allEspChar = [];
    for (let i= 33; i <= 47; i++){
        allEspChar.push(String.fromCharCode(i));
    }
    for (let i= 58; i <= 64; i++){
        allEspChar.push(String.fromCharCode(i));
    }
    for (let i= 91; i <= 96; i++){
        allEspChar.push(String.fromCharCode(i));
    }
    for (let i= 123; i <= 126; i++){
        allEspChar.push(String.fromCharCode(i));
    }
    
    for (let i = 0; i < patron.length ; i++){
        switch (patron[i]){
            case 'A':
                cadenaEspec.push(shufflearCadena(mayus)[0]);
                break;
            case 'a':
                cadenaEspec.push(shufflearCadena(minus)[0]);
                break;
            case '1':
                cadenaEspec.push(shufflearCadena(nums)[0]);
                break;
            case '+':
                if (hasEspChar){
                    cadenaEspec.push(shufflearCadena(charEspec)[0]);
                }
                else {
                    cadenaEspec.push(shufflearCadena(allEspChar)[0]);
                }
                break;
            default:
                break;
        }
    }
    return cadenaEspec;
}

function manejarInputEspec(){
    let inputPatron = document.querySelector('#ingr-pat-espec').value;
    let arrayPatron = inputPatron.split('');
    let patronLimpio = [];
    for (let i = 0; i < arrayPatron.length; i++){
        if (arrayPatron[i].match(/[Aa1+]/)){
            patronLimpio.push(arrayPatron[i]);
        }
    }   
    return patronLimpio;
}

function copyClipboard(){
    let copyBtn = document.querySelector('#copy-clip');
    copyBtn.addEventListener('click',()=>{
        let input = document.querySelector('#input-result');
        navigator.clipboard.writeText(input.value)
        let div = document.createElement('div');
        setTimeout(()=>{
            div.classList.remove('fs-1');
            div.textContent = 'Copiado!';
            div.classList.add('fs-6','bg-secondary','text-white', 'rounded','border','border-2','shadow','container','w-auto');
            div.setAttribute('id','div-tooltip');
            copyBtn.append(div);
        },100);
        setTimeout(()=>{
            div.remove();
        },1500);
    });
}

copyClipboard();

function refrescarCadena(){
    let relBtn = document.querySelector('#reload-btn');
    relBtn.addEventListener('click',() => {
        let tipoSeleccionado = document.querySelector('input[name="patron"]:checked');
        if (tipoSeleccionado.getAttribute('id') === 'pat-aleatorio'){
            let botonAleatorio = document.querySelector('#boton-aleatorio');
            botonAleatorio.click();
        }else {
            let botonEspecifico = document.querySelector('#boton-especifico');
            botonEspecifico.click();
        }
    });
}

refrescarCadena();

function cambiarTema(){
    let btnSwitch = document.querySelector('#theme-switch');
    let temaGuardado = localStorage.getItem('theme');
    if (temaGuardado !== null){
        aplicarTema(temaGuardado);
    } else {
        aplicarTema('white');
    }
    btnSwitch.addEventListener('click',()=>{
        let temaGuardado = localStorage.getItem('theme');
        if (temaGuardado === 'white'){
            aplicarTema('dark');
        } else{
            aplicarTema('white');
        }
    });
}

cambiarTema();

function aplicarTema(temaGuardado){
    let anterior;
    if (temaGuardado === 'white'){
        anterior = 'dark'
    } else{
        anterior = 'white';
    }
    document.body.classList.add('bg-' + temaGuardado);
    document.body.classList.remove('bg-' + anterior);
    localStorage.setItem('theme',temaGuardado);
    
    let elemConBordes = document.querySelectorAll('.border');
    let checks = document.querySelectorAll('.form-check-input');
    let inputs = document.querySelectorAll('.form-control');
    let selects = document.querySelectorAll('.form-select');
    let labelInput = document.querySelectorAll('.input-group-text');

    cambiarTemaNormal(elemConBordes,anterior,temaGuardado,'border');
    cambiarTemaNormal(checks,anterior,temaGuardado,'bg');
    cambiarTemaNormal(inputs,anterior,temaGuardado,'bg');
    cambiarTemaNormal(selects,anterior,temaGuardado,'bg');
    cambiarTemaNormal(labelInput,anterior,temaGuardado,'bg');
    cambiarTemaInverso(inputs,anterior,temaGuardado,'text');
    cambiarTemaInverso(selects,anterior,temaGuardado,'text');
    cambiarTemaInverso(labelInput,anterior,temaGuardado,'text');
}

function cambiarTemaNormal(elementos,anterior,temaGuardado,tipo){
    if (anterior === 'dark'){
        elementos.forEach((elem) => {
            elem.classList.remove(tipo + '-' + anterior);
        });
    } else {
        elementos.forEach((elem) => {
            elem.classList.add(tipo + '-' + temaGuardado);
        });
    }
}

function cambiarTemaInverso(elementos,anterior,temaGuardado,tipo){
    if (anterior === 'dark'){
        elementos.forEach((elem) => {
            elem.classList.remove(tipo + '-' + temaGuardado);
        });
    } else {
        elementos.forEach((elem) => {
            elem.classList.add(tipo + '-' + anterior);
        });
    }
}