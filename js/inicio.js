/*
se ejecuta cuando la pagina ha cargado completamente (DOM,CSS,JS , IMAGENES.ETCCC)
document.addEventListener('DOMContentLoaded', {})

*/

window.addEventListener('load',function(){
   

   const tipoDocumento = this.document.getElementById("tipoDocumento");
   const numeroDocumento = this.document.getElementById("numeroDocumento");
   const password = this.document.getElementById("password");
   const btnIngresar = this.document.getElementById("btnIngresar");
   const msgError = this.document.getElementById("msgError");

   //implemetar listener
   btnIngresar.addEventListener('click',function(){

    if(tipoDocumento.value === null || tipoDocumento.value.trim() === '' ||
         numeroDocumento.value === null || numeroDocumento.value.trim() === '' || password.value === null
        || password.value.trim() === ''){

            //Muestra el error en alerta
            mostrarAlerta("Error debe completar completamente sus credenciales");
            return;
        }
        ocultarAlerta();

        //Se consume auntenticar
        autenticar();
   });
});

function mostrarAlerta(mensaje){
    msgError.innerHTML = mensaje;
            msgError.style.display = "block";
}

function ocultarAlerta(){
    msgError.innerHTML = '';
            msgError.style.display = 'none';
}

 async function autenticar(){
    const url = 'http://localhost:8084/login/autenticar-async';
    const data = {
        tipoDocumento: tipoDocumento.value,
        numeroDocumento: numeroDocumento.value,
        password: password.value
    };
    try {

        const response = await fetch(url,{
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        });
        if(!response.ok){
            mostrarAlerta('Error :Ocurrio un problema al autenticarse ');
            throw new Error(`Error : ${response.statusText}`);
        }
        //validar respuesta del servivio
        const result = await response.json();
        console.log('Respuesta del servidor : ',result);
        if(result.codigo ==='00'){
            const userData = {
                nombreUsuario: result.nombreUsuario,
                tipoDocumento: tipoDocumento.value, // Agregar tipo de documento
                numeroDocumento: numeroDocumento.value, // Agregar número de documento
             
            };
            console.log(userData); 
           localStorage.setItem('result', JSON.stringify(userData));
            window.location.replace('principal.html');

        }else{
            mostrarAlerta(result.mensaje);
        }
        
        
        
    } catch (error) {
        console.error('Error : Ocurrio un problema no identificado', error);
        mostrarAlerta('Error : Ocurrio un problema no identificado ');
    }
}
