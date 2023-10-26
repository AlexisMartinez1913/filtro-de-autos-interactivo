
//variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const max = new Date().getFullYear(); //obtener año actual
const min = max - 10;
//contenedor resultados
const resultado = document.querySelector('#resultado');

//generar un objeto con datos de la busqueda del user
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}


//eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); //se llama a la funcion mostrar autos, que muestra los datos

    //llena las opciones de años
    llenarSelect();
})

//event listener para los select de busqueda
marca.addEventListener('change', e =>{
    datosBusqueda.marca = e.target.value;
    filtrarAuto(); //filtrar en base a la busqueda
    
})
year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtrarAuto();
    
})
minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
    
})
maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
    
})
puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);
    filtrarAuto();
    
})

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})
color.addEventListener('change', e =>{
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})



//funciones
function mostrarAutos(autos) {
    limpiarHtml(); // ->  elimina el html previo
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = `
            ${marca} - ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - ${color}

        `;
        //insertar en el html
        resultado.appendChild(autoHTML);
        
    });

}

//funcion para limpiar el html
function limpiarHtml() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}

//genera los años del select
function llenarSelect() {
    for(let i = max; i>=min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agregar opciones de año al select
    }

}

//filtrar de acuerdo a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    //console.log(resultado);
    mostrarAutos(resultado);
    if(resultado.length) {
        mostrarAutos(resultado);
    }else {
        noHayDatos();
    }
}

function noHayDatos() {
    limpiarHtml();
    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados, intenta con otros términos de búsqueda.';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    if(datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto; // si no selecciono, no perder referencia de valores

}

function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;

}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}