// VALIDAR NOMBRE Y APELLIDO
function campoRequerido(input) {
    if (input.value != "" && isNaN(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

// VALIDAR MAIL
function validarMail(input) {
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    if (input.value != "" && expresion.test(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

//  VALIDAR CONSULTA
function validarConsulta(input) {
    const cantidadCaracteres = 10;
    if (input.value != "" && input.value.length >= cantidadCaracteres && isNaN(input.value)) {
        input.className = "form-control is-valid";
        return true;
    } else {
        input.className = "form-control is-invalid";
        return false;
    }
}

// VALIDAR GENERAL
function validarGeneral(event) {
    event.preventDefault();
    console.log("desde la función validar general" + event);
    if (campoRequerido(document.getElementById(`nombre`)) &&
        campoRequerido(document.getElementById(`apellido`)) &&
        validarMail(document.getElementById(`email`)) &&
        validarConsulta(document.getElementById(`consulta`))) {
        enviarEmail();
    }
}

// ENVIAR MAIL
function enviarEmail() {
    let template_params = {
        from_name: `${document.getElementById(`apellido`).value}, ${document.getElementById(`nombre`).value}`,
        message_html: `Mensaje: ${document.getElementById(`consulta`).value}<br> Email: ${document.getElementById(`email`).value}`
    }

    let service_id = "default_service";
    let template_id = "contacto_cv";
    emailjs.send(service_id, template_id, template_params).then(function (response) {
        document.getElementById(`alerta`).className = "alert alert-success mt-4";
        document.getElementById(`alerta`).innerText = "El formulario se envió correctamente.";
        limpiarFormulario();
    },
        function (error) {
            document.getElementById(`alerta`).className = "alert alert-danger mt-4";
            document.getElementById(`alerta`).innerText = "Ocurrió un error, inténtelo nuevamente en unos minutos.";
        });
}

// LIMPIAR FORMULARIO
function limpiarFormulario() {
    document.getElementById(`formCurriculum`).reset();
    document.getElementById(`alerta`).className= "";
    document.getElementById(`alerta`).innerText= "";
    document.getElementById(`nombre`).className = "form-control";
    document.getElementById(`apellido`).className = "form-control";
    document.getElementById(`email`).className = "form-control";
    document.getElementById(`consulta`).className = "form-control";
}