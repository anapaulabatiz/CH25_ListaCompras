let txtNombre = document.getElementById("Name");    // Campo input
let txtNumber = document.getElementById("Number");  // Campo input

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let tabla = document.getElementById("tablaListaCompras"); // llamas a la tabla que está en el html
let cuerpoTabla = tabla.getElementsByTagName("tbody"); // hace que de lo que está dentro de la tabla, busca lo del "tbody", si no tengo lo de arriba (el let tabla....) no puedo hacer esto.

let contadorProductos = document.getElementById("contadorProductos"); // llama al contador de productos
let productosTotal = document.getElementById("productosTotal"); // llama al total de productos 
let precioTotal =  document.getElementById("precioTotal"); // llama al precio total de productos

let isValid = true;
let idTimeout; // para que no se bugueee el botón
let precio = 0;
let contador = 0;
let totalEnProductos = 0; // lo va a ir agarrando el valor y lo va a ir convirtiendo en números
let costoTotal = 0;

let datos = []; //Aquí se almacenarán los datos de la tabla

// Limpiar campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    cuerpoTabla[0].innerHTML = "";

    contador= 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText = "0"; // me va a borrar el campo cuando presione el boton borrar todo
    productosTotal.innerText = "0"; // me va a borrar el campo cuando presione el botón borrar todo
    precioTotal.innerText = "0"; // me va a borrar el campo cuando presione el botón borrar todo

    localStorage.setItem("contadorProductos", contador); // Borra la información del contador de productos en el local storage
    localStorage.setItem("totalEnProductos", totalEnProductos); // Borra el total en productos en el local storage
    localStorage.setItem("costoTotal", costoTotal.toFixed(2)); // Borra el costo total en el local storage

});// click btnClear

function validarCantidad(){
    if(txtNumber.value.length==0){// valida que haya dato
        return false;
    } //if

    if (isNaN(txtNumber.value)){// si no es un número que te regrese que es falso
        return false;
    }

    if (parseFloat(txtNumber.value)<=0){ //si es número es igual o menor que 0 regresa falso
        return false;
    }// if

    return true;
}// Validar cantidad, que me regrese un true or false 
function getPrecio(){
   return Math.floor(Math.random() * 50 * 100) / 100; //math.floor te redondea hacia abajo,  math.random te da un número al azar.
}// toma el número random 0.981657 y lo multiplica por 50 (0.981657)(50)= 49.08285 y ese resultado lo multiplica por 100 (49.08285)(100)= 4908.285 y luego usa el floor para que quite los decimales (4908) y luego lo divide entre 100 para que solo sean dos decimales 4908/100= 49.08

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    // console.log("borde: ", txtNombre.style.border); //Muestra en la consola el estilo de un elemento.
   clearTimeout(idTimeout);
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";
    // txtNombre.value = txtNombre.value.trim();       //Borra los espacios al principio y al final
    
    let lista = "Los siguientes campos deben ser llenados correctamente: <ul> ";
    if(txtNombre.value.length<=2){ //si te da un nombre con menos de dos letras te da el mensaje, no te deja poner menos de eso
        txtNombre.style.border="solid thin red";    //Se pone rojo si el usuario da click y el input está vacío
        lista += "<li>Se debe escribir un nombre válido</li>";
        // alertValidacionesTexto.innerHTML="Se debe escribir un nombre válido";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNombre.style.border="";                  //Quitarle el estilo cuando el input es diferente de cero.
    }//if txtNombre
    
    if(!validarCantidad()){// para validar la cantidad, si me muestra falso en cualquiera de los parametros de la función entonces ya va a hacer lo de abajo, para eso es la negación "!", si regresga un verdadero no hace la negación
        txtNumber.style.border="solid thin red";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        // alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNumber.style.border="";
    }//if txtNumber
    lista += "</ul>"
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    idTimeout = setTimeout(function (){ //Para desaparecer el mensaje de alerta después de cierto tiempo
        alertValidaciones.style.display="none"; // Este borra el mensaje de alerta 
    }, 5000);// el tiempo que va a durar la alerta
    if (isValid){
    precio = getPrecio();
    contador++;
    let row = `<tr> 
                <th>${contador}</th>
                <td>${txtNombre.value}</td>
                <td>${txtNumber.value}</td>
                <td>${precio}</td>

              </tr>`;//tr = table rox, th= un encabezado, entonces lo pone en negritas y en medio, td= table data (campo de información)
    let elemento = `{ 
                    "id": ${contador},
                    "nombre" : "${txtNombre.value}",
                    "cantidad" : "${txtNumber.value}",
                    "precio" : "${precio}"
                    }`;
    datos.push( JSON.parse(elemento) );

    localStorage.setItem("datos", JSON.stringify(datos) );
    
    cuerpoTabla[0].insertAdjacentHTML("beforeend", row); // me agrega los elementos a la lista
    contadorProductos.innerText = contador;
    totalEnProductos += parseFloat(txtNumber.value); // suma los productos que se van agregando convirtiendo el string en número
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * parseFloat(txtNumber.value);
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    let resumen =`{"contadorProductos" : ${contador},
                   "totalEnProductos"  : ${totalEnProductos},
                   "costoTotal"        : ${costoTotal.toFixed(2)}  }`;
    localStorage.setItem("resumen", resumen);
    //localStorage.setItem("contadorProductos", contador); // guardar la información del contador de productos en el local storage
    //localStorage.setItem("totalEnProductos", totalEnProductos); // guardar el total en productos en el local storage
    //localStorage.setItem("costoTotal", costoTotal.toFixed(2)); // Guardar el costo total en el local storage
    txtNombre.value="";//limpia el campo después de agregar
    txtNumber.value=""; // Limpia el campo despues de agregar
    txtNombre.focus(); // Despues de agregar te lleva el cursor al campo del nombre
    }// if is valid, para que si es verdadero, me escriba los articulos en la lista, si no es válido no lo agrega
}); //btnAgregar click

txtNumber.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
}); // txtNombre.blur

txtNombre.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim(); // Trim elimina los espacios del campo
});// txtNombre.blur



window.addEventListener("load", function(event){
    if (localStorage.getItem("resumen")== null) {
        let resumen = `{"contadorProductos" : ${contador},
        "totalEnProductos"  : ${totalEnProductos},
        "costoTotal"        : ${costoTotal.toFixed(2)}  }`;
        localStorage.setItem("resumen", resumen);    
    }//if
    let res = JSON.parse (localStorage.getItem("resumen"));
    if (localStorage.getItem("datos")!== null) {
        datos = JSON.parse(localStorage.getItem("datos"));

        datos.forEach(r => {
            let row = `<tr>
                <th>${r.id}</th>
                <td>${r.nombre}</td>
                <td>${r.cantidad}</td>
                <td>${r.precio}</td>
            </tr>`;
            cuerpoTabla[0].insertAdjacentHTML("beforeend", row);
            
        });
    } // !=null

    // Esto se sustituye por el objeto de arriba

    // if(localStorage.getItem("contadorProductos")== null){
    //   localStorage.getItem("contadorProductos", "0");
    // }// if
    // if(localStorage.getItem("totalEnProductos")== null){
    //    localStorage.getItem("totalEnProductos", "0");
    // }// if
    // if(localStorage.getItem("costoTotal")== null){
    //    localStorage.getItem("costoTotal", "0.0");
    // }// if
    contador = res.contadorProductos;// contador = parseInt(localStorage.getItem("contadorProductos")); 
    totalEnProductos = res.totalEnProductos;//totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
    costoTotal = res.costoTotal;//costoTotal = parseFloat (localStorage.getItem("costoTotal")); 
    
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;
});