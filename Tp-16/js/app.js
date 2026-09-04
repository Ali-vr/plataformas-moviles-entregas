```javascript
// Cantidad de Pokémon que queremos mostrar inicialmente
let cantidadPokemon = 151;

// Pokémon que se mostrarán actualmente
let pokemonMostrados = 0;


// Elementos del DOM
let listaPokemon = document.querySelector("#lista-pokemon");
let spinner = document.querySelector("#spinner");
let btnMasPokemon = document.querySelector("#btn-mas-pokemon");

let modalTitulo = document.querySelector("#modal-titulo");
let modalContenido = document.querySelector("#modal-contenido");


// --------------------------------------------------
// MOSTRAR / OCULTAR SPINNER
// --------------------------------------------------

function mostrarSpinner() {

    spinner.classList.remove("d-none");

}

function ocultarSpinner() {

    spinner.classList.add("d-none");

}


// --------------------------------------------------
// OBTENER UN POKÉMON DESDE LA API
// --------------------------------------------------

async function obtenerPokemon(id) {

    let respuesta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${id}`
    );

    let pokemon = await respuesta.json();

    return pokemon;

}


// --------------------------------------------------
// MOSTRAR UN POKÉMON EN EL DOM
// --------------------------------------------------

function mostrarPokemon(pokemon) {

    // Creo la columna
    let columna = document.createElement("div");

    columna.classList.add(
        "col-12",
        "col-sm-6",
        "col-md-4",
        "col-lg-3"
    );


    // Creo la tarjeta
    let tarjeta = document.createElement("div");

    tarjeta.classList.add(
        "card",
        "h-100",
        "text-center"
    );


    // Creo la imagen
    let imagen = document.createElement("img");

    imagen.src = pokemon.sprites.front_default;

    imagen.classList.add(
        "card-img-top",
        "imagen-pokemon"
    );


    // Creo el cuerpo de la tarjeta
    let cuerpo = document.createElement("div");

    cuerpo.classList.add("card-body");


    // Creo el nombre
    let nombre = document.createElement("h5");

    nombre.classList.add("card-title");

    nombre.innerText =
        pokemon.name.toUpperCase();


    // Creo el texto de tipos
    let tipos = document.createElement("p");

    tipos.classList.add("card-text");

    let textoTipos = "";


    pokemon.types.forEach(function(tipo) {

        textoTipos =
            textoTipos + tipo.type.name + " ";

    });


    tipos.innerText = "Tipos: " + textoTipos;


    // Creo el botón
    let boton = document.createElement("button");

    boton.classList.add(
        "btn",
        "btn-primary"
    );

    boton.innerText = "Ver información";


    // Evento del botón
    boton.addEventListener("click", function() {

        mostrarInformacionPokemon(pokemon);

    });


    // Armo la tarjeta
    cuerpo.append(nombre);
    cuerpo.append(tipos);
    cuerpo.append(boton);

    tarjeta.append(imagen);
    tarjeta.append(cuerpo);

    columna.append(tarjeta);

    listaPokemon.append(columna);

}


// --------------------------------------------------
// MOSTRAR INFORMACIÓN ADICIONAL
// --------------------------------------------------

function mostrarInformacionPokemon(pokemon) {

    // Nombre
    modalTitulo.innerText =
        pokemon.name.toUpperCase();


    // Tipos
    let textoTipos = "";

    pokemon.types.forEach(function(tipo) {

        textoTipos =
            textoTipos + tipo.type.name + " ";

    });


    // Habilidades
    let textoHabilidades = "";

    pokemon.abilities.forEach(function(habilidad) {

        textoHabilidades =
            textoHabilidades +
            habilidad.ability.name +
            " ";

    });


    // Movimientos
    let textoMovimientos = "";

    pokemon.moves.forEach(function(movimiento, posicion) {

        if (posicion < 4) {

            textoMovimientos =
                textoMovimientos +
                movimiento.move.name +
                "<br>";

        }

    });


    // Creo la imagen
    let imagen = document.createElement("img");

    imagen.src = pokemon.sprites.front_default;

    imagen.classList.add(
        "img-fluid",
        "d-block",
        "mx-auto"
    );


    // Creo los textos
    let tiposElemento = document.createElement("p");

    tiposElemento.innerText =
        "Tipos: " + textoTipos;


    let habilidadesElemento =
        document.createElement("p");

    habilidadesElemento.innerText =
        "Habilidades: " + textoHabilidades;


    let movimientosElemento =
        document.createElement("p");

    movimientosElemento.innerHTML =
        "<strong>Movimientos:</strong><br>" +
        textoMovimientos;


    // Limpio el contenido anterior
    modalContenido.innerHTML = "";


    // Agrego los elementos
    modalContenido.append(imagen);
    modalContenido.append(tiposElemento);
    modalContenido.append(habilidadesElemento);
    modalContenido.append(movimientosElemento);


    // Muestro el modal de Bootstrap
    let modal = new bootstrap.Modal(
        document.querySelector("#modalPokemon")
    );

    modal.show();

}


// --------------------------------------------------
// CARGAR POKÉMON
// --------------------------------------------------

async function cargarPokemon(cantidad) {

    mostrarSpinner();

    // Deshabilito el botón mientras carga
    btnMasPokemon.disabled = true;


    for (
        let i = pokemonMostrados + 1;
        i <= cantidad;
        i++
    ) {

        let pokemon =
            await obtenerPokemon(i);

        mostrarPokemon(pokemon);

        pokemonMostrados = i;

    }


    ocultarSpinner();

    btnMasPokemon.disabled = false;

}


// --------------------------------------------------
// BOTÓN CARGAR MÁS
// --------------------------------------------------

btnMasPokemon.addEventListener(
    "click",
    function() {

        let nuevaCantidad =
            pokemonMostrados + 20;

        cargarPokemon(nuevaCantidad);

    }
);


// --------------------------------------------------
// CARGA INICIAL
// --------------------------------------------------

cargarPokemon(cantidadPokemon);
```
