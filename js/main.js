// El código va aquí -> 
let txtNombre = document.getElementById("Name");    // Campo input
let txtNumber = document.getElementById("Number");  // Campo input

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

// Limpiar campos
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtNombre.value="";
    txtNumber.value="";
});

let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    // console.log("borde: ", txtNombre.style.border); //Muestra en la consola el estilo de un elemento.
    
    // txtNombre.value = txtNombre.value.trim();       //Borra los espacios al principio y al final
    alertValidacionesTexto.innerHTML=""; // esto hace que se limpie cuando se corrige
    alertValidaciones.style.display="none"; // esto hacer que se quite

    let lista = "Los siguientes campos deben ser llenados correctamente: <ul> ";
    if(txtNombre.value.length==0){
        txtNombre.style.border="solid thin red";    //Se pone rojo si el usuario da click y el input está vacío
        lista += "<li>Se debe escribir un nombre válido</li>";
        // alertValidacionesTexto.innerHTML="Se debe escribir un nombre válido";
        alertValidaciones.style.display="block";
    }else{
        txtNombre.style.border="";                  //Quitarle el estilo cuando el input es diferente de cero.
    }
    
    if(txtNumber.value.length==0){
        txtNumber.style.border="solid thin red";
        lista += "<li>Se debe escribir una cantidad válida</li>";
        // alertValidacionesTexto.innerHTML+="Se debe escribir una cantidad válida";
        alertValidaciones.style.display="block";
    }else{
        txtNumber.style.border="";
    }
    lista += "</ul>"
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
});

txtNumber.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});

txtNombre.addEventListener("blur", function(event){        //evento blur: perder el foco --> salirse del campo
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();
});