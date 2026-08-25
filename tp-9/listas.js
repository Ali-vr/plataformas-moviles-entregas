var listaNumerosEjemplo = [2,4,6,-1,5,-4,0];


/**
 * 01 - invertirLista
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - una lista de números con los mismos elementos pero en orden inverso al que fueron recibidos.
 *
 * Ejemplos:
 * - invertirLista([2,3,4]) retorna [4,3,2]
 */
function invertirLista(listaDeNumeros) {
    // Recorremos la lista desde el último elemento hasta el primero.
    // Usamos push() para agregar cada elemento a la nueva lista.
    let listaInvertida = [];

    for (let i = listaDeNumeros.length - 1; i >= 0; i--) {
        listaInvertida.push(listaDeNumeros[i]);
    }

    return listaInvertida;
}
console.log("invertirLista([2,3,4]): ", invertirLista([2,3,4]));


/**
 * 02 - sumarLista
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - un numero con el resultado de la suma de todos los elementos de la lista.
 *
 * Ejemplos:
 * - sumarLista([2,3,4]) retorna 9
 */
function sumarLista(listaDeNumeros) {
    // forEach() recorre todos los elementos y vamos acumulando la suma.
    let suma = 0;

    listaDeNumeros.forEach((numero) => {
        suma = suma + numero;
    });

    return suma;
}
console.log("sumarLista([2,3,4]): ", sumarLista([2,3,4]));


/**
 * 03 - contarElementosLista
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - un numero con la cantidad de elementos contenidos dentro de la lista.
 *
 * Ejemplos:
 * - contarElementosLista([2,3,4]) retorna 3
 * - contarElementosLista([2,3]) retorna 2
 * - contarElementosLista([]) retorna 0
 */
function contarElementosLista(listaDeNumeros) {
    // length indica directamente la cantidad de elementos del array.
    return listaDeNumeros.length;
}
console.log("contarElementosLista([2,3,4]): ", contarElementosLista([2,3,4]));


/**
 * 04 - calcularPromedio
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - un numero, con el valor calculado de promedio para los números en la lista recibida.
 *
 * Ejemplos:
 * - calcularPromedio([2,3,4]) retorna 3
 */
function calcularPromedio(listaDeNumeros) {
    // El promedio se obtiene dividiendo la suma por la cantidad de elementos.
    // Si la lista está vacía, devolvemos 0 para evitar una división por cero.
    if (listaDeNumeros.length === 0) {
        return 0;
    }

    let suma = sumarLista(listaDeNumeros);
    return suma / listaDeNumeros.length;
}
console.log("calcularPromedio([2,3,4]): ", calcularPromedio([2,3,4]));
console.log("calcularPromedio(listaNumerosEjemplo): ", calcularPromedio(listaNumerosEjemplo));


/**
 * 05 - triplicarLista
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - una lista de números donde cada elemento es el triple del valor original.
 *
 * Ejemplos:
 * - triplicarLista([1, 2, 3]) retorna [3, 6, 9]
 */
function triplicarLista(listaDeNumeros) {
    // map() crea una nueva lista aplicando la operación a cada elemento.
    return listaDeNumeros.map((numero) => {
        return numero * 3;
    });
}
console.log("triplicarLista([1, 2, 3]): ", triplicarLista([1, 2, 3]));


/**
 * 06 - crearListaDeNumeros
 *
 * Recibe
 * - `inicio`: un número, con el valor inicial de la lista
 * - `fin`: un número, con el valor final de la lista
 *
 * Retorna:
 * - una lista (array) con valores numéricos en secuencia, desde `inicio` hasta `fin`.
 *
 * Ejemplos:
 * - crearListaDeNumeros(1,5) retorna [1,2,3,4,5]
 * - crearListaDeNumeros(3,6) retorna [3,4,5,6]
 * - crearListaDeNumeros(2,2) retorna [2]
 */
function crearListaDeNumeros(inicio, fin) {
    // Usamos un for para generar todos los números desde inicio hasta fin.
    let lista = [];

    for (let numero = inicio; numero <= fin; numero++) {
        lista.push(numero);
    }

    return lista;
}
console.log("crearListaDeNumeros(2,5): ", crearListaDeNumeros(2,5));


/**
 * 07 - ordenarDeMayorAMenor
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - una lista de números con los mismos elementos pero en orden decreciente (de mayor a menor).
 *
 * Ejemplos:
 * - ordenarDeMayorAMenor([2,-1,4]) retorna [4,2,-1]
 */
function ordenarDeMayorAMenor(listaDeNumeros) {
    // slice() crea una copia para no modificar la lista original.
    // sort() recibe una función de comparación numérica para ordenar de mayor a menor.
    let listaOrdenada = listaDeNumeros.slice();

    listaOrdenada.sort((a, b) => {
        return b - a;
    });

    return listaOrdenada;
}
console.log("ordenarDeMayorAMenor([2,3,4]): ", ordenarDeMayorAMenor([2,3,4]));
console.log("ordenarDeMayorAMenor(listaNumerosEjemplo): ", ordenarDeMayorAMenor(listaNumerosEjemplo));


/**
 * 08 - encontrarNumeroMayor
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - un numero, con el valor del numero más grande contenido en la lista recibida.
 *
 * Ejemplos:
 * - encontrarNumeroMayor([2,3,4]) retorna 4
 */
function encontrarNumeroMayor(listaDeNumeros) {
    // Partimos del primer elemento y comparamos el resto de la lista.
    if (listaDeNumeros.length === 0) {
        return undefined;
    }

    let mayor = listaDeNumeros[0];

    for (let i = 1; i < listaDeNumeros.length; i++) {
        if (listaDeNumeros[i] > mayor) {
            mayor = listaDeNumeros[i];
        }
    }

    return mayor;
}
console.log("encontrarNumeroMayor([2,3,4]): ", encontrarNumeroMayor([2,3,4]));
console.log("encontrarNumeroMayor(listaNumerosEjemplo): ", encontrarNumeroMayor(listaNumerosEjemplo));


/**
 * 09 - ordenarPalabrasPorLongitud
 *
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 *
 * Retorna:
 * - una lista (array) de palabras (string), con los mismos valores que la lista recibida pero ordenados de manera creciente de acuerdo a su cantidad de caracteres.
 *
 * Ejemplos:
 * - ordenarPalabrasPorLongitud(['abc', 'a', 'ab']) retorna ['a', 'ab', 'abc']
 */
function ordenarPalabrasPorLongitud(listaDePalabras) {
    // Copiamos la lista y usamos sort() comparando la cantidad de caracteres.
    let listaOrdenada = listaDePalabras.slice();

    listaOrdenada.sort((a, b) => {
        return a.length - b.length;
    });

    return listaOrdenada;
}
console.log("ordenarPalabrasPorLongitud(['abc', 'a', 'ab']): ", ordenarPalabrasPorLongitud(['abc', 'a', 'ab']));


/**
 * 10 - encontrarPalabraMasCorta
 *
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 *
 * Retorna:
 * - una palabras (string) que dentro del listado tenga la menor cantidad de caracteres de longitud. En caso de que haya varias palabras con la misma longitud, se puede devolver la primera encontrada.
 *
 * Ejemplos:
 * - encontrarPalabraMasCorta(['abc', 'a', 'ab', 'c']) retorna 'a'
 */
function encontrarPalabraMasCorta(listaDePalabras) {
    // Guardamos la primera palabra como la más corta y luego comparamos las demás.
    if (listaDePalabras.length === 0) {
        return undefined;
    }

    let palabraMasCorta = listaDePalabras[0];

    for (let i = 1; i < listaDePalabras.length; i++) {
        if (listaDePalabras[i].length < palabraMasCorta.length) {
            palabraMasCorta = listaDePalabras[i];
        }
    }

    return palabraMasCorta;
}
console.log("encontrarPalabraMasCorta(['abc', 'a', 'ab']): ", encontrarPalabraMasCorta(['abc', 'a', 'ab']));


/**
 * 11 - filtrarSoloPositivos
 *
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 *
 * Retorna:
 * - una lista (array) de números, conteniendo sólo los valores positivos de la lista de números recibida.
 *
 * Ejemplos:
 * - filtrarSoloPositivos([1,-1,2]) retorna [1,2]
 */
function filtrarSoloPositivos(listaDeNumeros) {
    // filter() conserva solamente los elementos para los que la condición sea true.
    // 0 no es positivo, por eso usamos > 0.
    return listaDeNumeros.filter((numero) => {
        return numero > 0;
    });
}
console.log("filtrarSoloPositivos([1,-1,0]): ", filtrarSoloPositivos([1,-1,0]));
console.log("filtrarSoloPositivos(listaNumerosEjemplo): ", filtrarSoloPositivos(listaNumerosEjemplo));


/**
 * 12 - contarAprobados
 *
 * Recibe
 * - `listaDeNotas`: una lista (array) de números con valores entre 1 y 10.
 *
 * Retorna:
 * - un numero, con la cantidad de notas que superan el criterio de aprobación.
 *
 * Ejemplos:
 * - contarAprobados([10,2,9]) retorna 2
 */
function contarAprobados(listaDeNotas) {
    // En este ejercicio se toma como aprobación una nota mayor a 6.
    // filter() deja únicamente las notas que cumplen ese criterio.
    let aprobados = listaDeNotas.filter((nota) => {
        return nota > 6;
    });

    return aprobados.length;
}
console.log("contarAprobados([10, 4, 6, 7, 1, 9]): ", contarAprobados([10, 4, 6, 7, 1, 9]));


/**
 * 13 - filtrarSoloTruthy
 *
 * Recibe
 * - `listaDeValores`: una lista (array) de valores de distintos tipos.
 *
 * Retorna:
 * - una lista (array) conteniendo sólo los valores que son considerados 'truthy' por el lenguaje JavaScript
 *
 * Ejemplos:
 * - filtrarSoloTruthy(["Hola", "", 0, 1]) retorna ["Hola", 1]
 */
function filtrarSoloTruthy(listaDeValores) {
    // filter() evalúa cada valor como booleano.
    // Solo los valores que sean truthy quedan dentro de la nueva lista.
    return listaDeValores.filter((valor) => {
        return Boolean(valor);
    });
}
console.log("filtrarSoloTruthy(): ", filtrarSoloTruthy(["Hola", "", null, 1, 0, -1, undefined, [], {}]));


/**
 * 14 - enumerarLista
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (strings).
 *
 * Retorna:
 * - Una oración (string), donde se enumeran cada una de las palabras recibidas en la lista.
 * - Bonus: una oración correctamente formada debería empezar en mayúscula, terminar con punto, y además el ultimo elemento de enumeración deberia estar separado con "y".
 *
 * Ejemplos:
 * - enumerarLista(["Han", "Leia", "Luke", "Yoda"]) "Han, Leia, Luke y Yoda."
 */
function enumerarLista(listaDePalabras) {
    // Si no hay palabras, no podemos construir una enumeración.
    if (listaDePalabras.length === 0) {
        return "";
    }

    // Con una sola palabra solo necesitamos agregar mayúscula y punto.
    if (listaDePalabras.length === 1) {
        let unaPalabra = listaDePalabras[0];
        return unaPalabra.charAt(0).toUpperCase() + unaPalabra.slice(1) + ".";
    }

    // Copiamos las palabras para no modificar el array recibido.
    let palabras = listaDePalabras.slice();

    // Formamos la enumeración: todas menos la última separadas por coma
    // y la última precedida por "y".
    let ultima = palabras.pop();
    let oracion = palabras.join(", ") + " y " + ultima;

    // La primera letra de toda la oración debe estar en mayúscula.
    oracion = oracion.charAt(0).toUpperCase() + oracion.slice(1);

    // Terminamos la oración con un punto.
    return oracion + ".";
}
console.log("enumerarLista(): ", enumerarLista(["Han", "Leia", "Luke", "Yoda"]));
