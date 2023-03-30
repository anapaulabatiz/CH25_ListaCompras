let txtNombre = document.getElementById("Name");    // Campo input
let txtNumber = document.getElementById("Number");  // Campo input

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let tabla = document.getElementById("tablaListaCompras");
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0;

// Limpiar campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
    cuerpoTabla[0].innerHTML="";

    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0;
    contadorProductos.innerText="0";
    productosTotal.innerText="0";
    precioTotal.innerText="$ 0";

    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));

}); // click btnClear


function validarCantidad(){
    if(txtNombre.value.length==0){
        return false;
} 
    if (isNaN(txtNumber.value)){
        return false;
    }
    if(parseFloat(txtNumber.value)<=0){
        return false;
    }

    return true;
};// validar cantidad

function getPrecio(){ // math floor redondea hacia abajo, random regenra un num entre > 0 y 1
    return Math.floor(Math.random() * 50 * 100) / 100; // 50 es para que no pase de $50 y el *100 / 100 es para que nos de 2 decimales
}; // get Precio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);
    // console.log("borde: ", txtNombre.style.border); //Muestra en la consola el estilo de un elemento.
    
    // txtNombre.value = txtNombre.value.trim();       //Borra los espacios al principio y al final
    alertValidacionesTexto.innerHTML=""; // esto hace que se limpie cuando se corrige
    alertValidaciones.style.display="none"; // esto hacer que se quite

    let lista = "Los siguientes campos deben ser llenados correctamente: <ul> ";
    if(txtNombre.value.length<2){
        txtNombre.style.border="solid thin red";    //Se pone rojo si el usuario da click y el input está vacío
        lista += "<li>Se debe escribir un nombre válido</li>";
        // alertValidacionesTexto.innerHTML="Se debe escribir un nombre válido";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNombre.style.border="";                  //Quitarle el estilo cuando el input es diferente de cero.
    }
    
    if(! validarCantidad()){
        txtNumber.style.border="solid thin red";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        // alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida";
        alertValidaciones.style.display="block";
        isValid = false;
    }else{
        txtNumber.style.border="";
    }
    lista += "</ul>"
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);

    //1. crear variable
    // 2. asignarla a la funcion de setTimeout
    // 3. agregar clearTimeout(idTimeout); al boton
    // Esto es para que no se borre el mensaje cada que des click en el boton

    idTimeout = setTimeout(function(){ // oculta la funcion en cierto tiempo
        alertValidaciones.style.display="none";
    },5000); // sirmpre es en mseg
    if (isValid){
    precio = getPrecio();
    contador ++;

    // el th lo pone centrado y en negritas se refiere a HEAD y td se refiere a DATO
    let row = `<tr>
                    <th>${contador}</th> 
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`

    cuerpoTabla[0].insertAdjacentHTML("beforeend", row); // agrego a la tabla
    contadorProductos.innerText=contador;
    totalEnProductos += parseFloat(txtNumber.value);
    productosTotal.innerText = totalEnProductos;
    costoTotal += precio * parseFloat(txtNumber.value);
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`; // e; ${ } es para que haga la funcion y no se escriba el texto
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal.toFixed(2));
    txtNombre.value=""; // limpia los campos
    txtNumber.value="";
    txtNombre.focus(); // te lleva al campo de nombre
    };

}); // btnAgregar click

txtNumber.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});

txtNombre.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});

window.addEventListener("load", function(event){
    if (localStorage.getItem("contadorProductos")==null){
        localStorage.setItem("contadorProductos", "0");
    }
    if (localStorage.getItem("totalEnProductos")==null){
        localStorage.setItem("totalEnProductos", "0");
    }
    if (localStorage.getItem("costoTotal")==null){
        localStorage.setItem("costoTotal", "0.0");
    }

    contador = parseInt(localStorage.getItem("contadorProductos"));
    totalEnProductos = parseInt(localStorage.getItem("totalEnProductos"));
    costoTotal = parseFloat(localStorage.getItem("costoTotal"));

    contadorProductos.innerText=contador;
    productosTotal.innerText=totalEnProductos;
    precioTotal.innerText=`$ ${costoTotal}`;
});
