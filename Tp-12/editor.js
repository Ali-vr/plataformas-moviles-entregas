```js
/**
 * Buscamos el texto que queremos modificar.
 */
const texto = document.querySelector("#texto");


/**
 * funcionNegrita()
 *
 * Esta función cambia el texto entre negrita
 * y texto normal.
 */
function funcionNegrita() {

    if (texto.style.fontWeight == "bold") {
        texto.style.fontWeight = "normal";
        document.querySelector("#btn-negrita").innerText = "Bold (Negrita)";
    } else {
        texto.style.fontWeight = "bold";
        document.querySelector("#btn-negrita").innerText = "Bold (Activado)";
    }

}


/**
 * funcionCursiva()
 *
 * Esta función cambia el texto entre cursiva
 * y texto normal.
 */
function funcionCursiva() {

    if (texto.style.fontStyle == "italic") {
        texto.style.fontStyle = "normal";
        document.querySelector("#btn-cursiva").innerText = "Italic (Cursiva)";
    } else {
        texto.style.fontStyle = "italic";
        document.querySelector("#btn-cursiva").innerText = "Italic (Activado)";
    }

}


/**
 * funcionSubrayado()
 *
 * Esta función cambia el texto entre subrayado
 * y texto normal.
 */
function funcionSubrayado() {

    if (texto.style.textDecoration == "underline") {
        texto.style.textDecoration = "none";
        document.querySelector("#btn-subrayado").innerText = "Underline (Subrayado)";
    } else {
        texto.style.textDecoration = "underline";
        document.querySelector("#btn-subrayado").innerText = "Underline (Activado)";
    }

}


/**
 * funcionColor()
 *
 * Cambia el color del texto.
 *
 * En este caso utilizamos la propiedad style.color
 * para modificar el color directamente desde JavaScript.
 */
function funcionColor() {

    if (texto.style.color == "red") {
        texto.style.color = "black";
        document.querySelector("#btn-color").innerText = "Color";
    } else {
        texto.style.color = "red";
        document.querySelector("#btn-color").innerText = "Color (Activado)";
    }

}


/**
 * handlerBoton()
 *
 * Obtiene el valor de data-formato del botón
 * y decide qué función ejecutar.
 */
function handlerBoton(e) {

    const funcionBoton = e.target.dataset.formato;

    switch (funcionBoton) {

        case "negrita":
            funcionNegrita();
            break;

        case "cursiva":
            funcionCursiva();
            break;

        case "subrayado":
            funcionSubrayado();
            break;

        case "color":
            funcionColor();
            break;
    }

}


/**
 * Asociamos el evento click a los botones
 * que tienen la clase btn.
 */
document
    .querySelectorAll("button.btn")
    .forEach(e => e.addEventListener("click", handlerBoton));


/**
 * Editar el texto
 *
 * Buscamos el input y detectamos cuando
 * el usuario escribe.
 */
const inputTexto = document.querySelector("#input-texto");

inputTexto.addEventListener("input", function() {

    texto.innerText = inputTexto.value;

});


/**
 * Tamaño del texto
 *
 * Guardamos un tamaño inicial.
 */
let tamañoTexto = 16;


/**
 * Aumentar tamaño
 */
document.querySelector("#btn-aumentar").addEventListener("click", function() {

    tamañoTexto = tamañoTexto + 2;

    texto.style.fontSize = tamañoTexto + "px";

});


/**
 * Disminuir tamaño
 */
document.querySelector("#btn-disminuir").addEventListener("click", function() {

    tamañoTexto = tamañoTexto - 2;

    texto.style.fontSize = tamañoTexto + "px";

});


/**
 * BONUS TRACK
 *
 * Cambiar la alineación del texto.
 *
 * Utilizamos la propiedad textAlign del style
 * para modificar la alineación del párrafo.
 */


/**
 * Alinear a la izquierda
 */
document.querySelector("#btn-izquierda").addEventListener("click", function() {

    texto.style.textAlign = "left";

});


/**
 * Alinear al centro
 */
document.querySelector("#btn-centro").addEventListener("click", function() {

    texto.style.textAlign = "center";

});


/**
 * Alinear a la derecha
 */
document.querySelector("#btn-derecha").addEventListener("click", function() {

    texto.style.textAlign = "right";

});
```
