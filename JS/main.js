document.addEventListener("DOMContentLoaded", function (event) {
    fetch('./info/info.json')
        .then(response => {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('prestamistas', JSON.stringify(data.Prestamistas))
        });
});

class user {
    constructor(nombre, apellido, mail, comentarios, telefono) {
        this.nombre = nombre,
            this.apellido = apellido,
            this.mail = mail,
            this.telefono = telefono,
            this.comentarios = comentarios
    }
}
class Prestamista {
    constructor(id, nombre) {
        this.id = id,
            this.nombre = nombre
    }
}

class Prestamo {
    constructor(id, monto) {
        this.id = id,
            this.monto = monto
    }
}

class Prestamista_Prestamo {
    constructor(id, prestamista, prestamo, porcentaje_recargo) {
        this.id = id,
            this.prestamista = prestamista,
            this.prestamo = prestamo,
            this.porcentaje_recargo = porcentaje_recargo
    }
}



localStorage.setItem('prestamos', JSON.stringify([
    new Prestamo(1, 5000),
    new Prestamo(2, 50000),
    new Prestamo(3, 15000)
]));

const prestamistas = JSON.parse(localStorage.getItem('prestamistas'));
const prestamos = JSON.parse(localStorage.getItem('prestamos'));

const Prestamos_Prestamistas =
    [
        new Prestamista_Prestamo(1, prestamistas[0], prestamos[0], 4),
        new Prestamista_Prestamo(2, prestamistas[1], prestamos[1], 10),
        new Prestamista_Prestamo(3, prestamistas[2], prestamos[0], 5),
        new Prestamista_Prestamo(4, prestamistas[2], prestamos[2], 5),
        new Prestamista_Prestamo(5, prestamistas[0], prestamos[2], 6),
        new Prestamista_Prestamo(6, prestamistas[1], prestamos[1], 11),
        new Prestamista_Prestamo(7, prestamistas[1], prestamos[2], 8),
        new Prestamista_Prestamo(8, prestamistas[2], prestamos[1], 8),
    ]


document.getElementById("btn_buscar_prestamistas").addEventListener("click", function (event) {
    let intro = document.getElementById('titulo');
    intro.style.color = '#0B4275';
    montoDeseado = document.getElementById('txt_buscar_prestamistas').value;
    guardarMontoDeseado(montoDeseado);
    prestamosRecomendados = obtenerPrestamosRecomendados();
    imprimirPrestamistasRecomendados(prestamosRecomendados);
});

document.getElementById("txt_buscar_prestamistas").addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        monto_deseado = document.getElementById('txt_buscar_prestamistas').value;
        if (!isNaN(monto_deseado) && monto_deseado > 0) {
            guardarMontoDeseado(monto_deseado);
            prestamosRecomendados = obtenerPrestamosRecomendados();
            imprimirPrestamistasRecomendados(prestamosRecomendados);
        } else {
            document.getElementById('resultado_prestamistas').innerHTML = '<p class="text-white"> Ingrese un monto válido </p>';
        }
    }
});
document.getElementById("form-contacto").addEventListener('submit', guardarFormularioLocalStorage);
function obtenerPrestamosRecomendados() {
    montoDeseado = localStorage.getItem('montoDeseado');
    localStorage.setItem('recomendados', JSON.stringify(Prestamos_Prestamistas.filter(x => x.prestamo.monto <= montoDeseado)))
    return Prestamos_Prestamistas.filter(x => x.prestamo.monto <= montoDeseado);
}

function imprimirPrestamistasRecomendados(prestamosRecomendados) {
    divresultado = document.getElementById('resultado_prestamistas');
    divresultado.innerHTML = '';
    if (prestamosRecomendados.length > 0) {
        for (const xprestamo in prestamosRecomendados) {
            divresultado = document.getElementById('resultado_prestamistas');
            divresultado.innerHTML += '<p>' + prestamosRecomendados[xprestamo].prestamista.nombre + ' $' +
                prestamosRecomendados[xprestamo].prestamo.monto + ' recargo de ' + prestamosRecomendados[xprestamo].porcentaje_recargo + '% </p>'
        }
    } else {
        Swal.fire({
            title: 'Lo sentimos',
            text: 'No encontramos prestamos que se adapten al monto ingresado, Puedes completar el formulario y recibir mayor informacion.',
            icon: 'error',
            iconColor: 'red',
            confirmButtonText: 'Aceptar',
            position: 'center',
            color: '#4C76E2',
            return: divresultado.innerHTML,
            timer: 7500,
            timerProgressBar: true,
        })
    }
}

function guardarMontoDeseado(montoDeseado) {
    localStorage.setItem('montoDeseado', montoDeseado);
}



function guardarFormularioLocalStorage() {
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let mail = document.getElementById('mail').value;
    let telefono = document.getElementById('telefono').value;
    let comentarios = document.getElementById('comentarios').value;
    localStorage.setItem('user-' + nombre, JSON.stringify(new user(nombre, apellido, mail, comentarios, telefono)));

    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';
    document.getElementById('mail').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('comentarios').value = '';
    

}
