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