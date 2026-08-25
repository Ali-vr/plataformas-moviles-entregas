var personaEjemplo = {
    "apellido": "Perez",
    "nombre": "Juan",
    "edad": 20,
    "documento": 12345
};

/**
 * 01 - crearPersona
 *
 * Recibe
 * - `nombre`: string, con el nombre.
 * - `apellido`: string, con el apellido.
 * - `edad`: numero entero, con la edad de la persona.
 * - `documento`: numero entero, con el documento de la persona.
 *
 * Retorna:
 * - un objeto, representando una persona, con los campos recibidos.
 */
function crearPersona(nombre, apellido, edad, documento) {

    let crearPersona = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        documento: documento
    };

    return crearPersona;
}

console.log(
    "resultado crearPersona: ",
    crearPersona("Juan", "Pérez", 20, 123456)
);


/**
 * 02 - agregarApodo
 *
 * Recibe
 * - `persona`: objeto de la forma persona.
 * - `apodo`: string, con el apodo que agregarle a la persona.
 *
 * Retorna:
 * - un objeto, representando a la misma persona recibida,
 *   pero con un nuevo campo 'apodo'.
 */
function agregarApodo(persona, apodo) {

    // Agregamos la propiedad "apodo" al objeto persona.
    persona.apodo = apodo;

    return persona;
}

console.log(
    "resultado agregarApodo: ",
    agregarApodo(personaEjemplo, "JuanPe")
);


/**
 * 03 - sinDocumento
 *
 * Recibe
 * - `persona`: objeto de la forma persona.
 *
 * Retorna:
 * - un objeto, representando a la misma persona recibida,
 *   pero sin el campo documento.
 */
function sinDocumento(persona) {

    // Eliminamos la propiedad documento del objeto.
    delete persona.documento;

    return persona;
}

console.log(
    "resultado sinDocumento: ",
    sinDocumento(personaEjemplo)
);


/**
 * 04 - tieneDocumento
 *
 * Recibe
 * - `persona`: objeto de la forma persona.
 *
 * Retorna:
 * - un valor boolean ('true' o 'false'), indicando si
 *   la propiedad 'documento' existe en el objeto recibido.
 */
function tieneDocumento(persona) {

    // Comprobamos si existe la propiedad "documento".
    return "documento" in persona;
}

console.log(
    "resultado tieneDocumento: ",
    tieneDocumento(personaEjemplo)
);


/**
 * 05 - nombreCompletoDePersona
 *
 * Recibe
 * - `persona`: objeto de la forma persona.
 *
 * Retorna:
 * - un string con el nombre completo en formato
 *   "Apellido, Nombre".
 */
function nombreCompletoDePersona(persona) {

    let nombreCompleto = persona.apellido + ", " + persona.nombre;

    return nombreCompleto;
}

console.log(
    "resultado nombreCompletoDePersona: ",
    nombreCompletoDePersona(personaEjemplo)
);


/**
 * 06 - felizCumpleaños
 *
 * Recibe
 * - `persona`: objeto de la forma persona.
 *
 * Retorna:
 * - un objeto, representando a la misma persona recibida,
 *   pero con un año más.
 */
function felizCumpleaños(persona) {

    // Aumentamos la edad de la persona en 1.
    persona.edad = persona.edad + 1;

    return persona;
}

console.log(
    "resultado felizCumpleaños: ",
    felizCumpleaños(personaEjemplo)
);


/**
 * 07 - sonLaMismaPersona
 *
 * Recibe
 * - `persona1`: un objeto de la forma persona.
 * - `persona2`: otro objeto de la forma persona.
 *
 * Retorna:
 * - true si todos los datos de ambas personas coinciden.
 * - false si algún dato es diferente.
 */
function sonLaMismaPersona(persona1, persona2) {

    return persona1.nombre === persona2.nombre
        && persona1.apellido === persona2.apellido
        && persona1.edad === persona2.edad
        && persona1.documento === persona2.documento;
}

console.log(
    "resultado sonLaMismaPersona: ",
    sonLaMismaPersona(
        personaEjemplo,
        {
            apellido: "Perez",
            nombre: "Juan",
            edad: 20,
            documento: 12345
        }
    )
);


/**
 * 08 - personaMasGrande
 *
 * Recibe
 * - `persona1`: un objeto de la forma persona.
 * - `persona2`: otro objeto de la forma persona.
 *
 * Retorna:
 * - el objeto de la persona con mayor edad.
 * - si tienen la misma edad, retorna cualquiera de las dos.
 */
function personaMasGrande(persona1, persona2) {

    if (persona1.edad > persona2.edad) {
        return persona1;
    } else {
        return persona2;
    }
}

console.log(
    "resultado personaMasGrande: ",
    personaMasGrande(
        { nombre: "Ana", edad: 30 },
        { nombre: "Luis", edad: 25 }
    )
);