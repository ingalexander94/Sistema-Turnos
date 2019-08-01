var socket = io();
var label = $("#lblNuevoTicket");
var ticket = $("#animar");
var titulo = $("#titulo");
var boton = $("#onoff"); 

ticket.hide();

socket.on('connect', function () {
    console.log("Conectado al Servidor desde Frontend");
});

socket.on('disconnect', function () {
    console.log("Se perdio la conexión con el Servidor Frontend");
});
 
socket.on('estadoActual', function (ticketActual) {
    $("#actual").text(ticketActual.actual);
    titulo.text("Pida un ticket porfavor");
});


boton.click(function () {
    if ($(this).is(':checked')) {
        ticket.hide(); 
        ticket.removeClass("animated fadeInUpBig");
        setTimeout(() => { 
            socket.emit('siguienteTicket', null, function (siguienteTicket) {
                label.text(siguienteTicket);
                titulo.text(siguienteTicket + " espere su llamado");
                ticket.show();
                ticket.addClass("animated fadeInUpBig");
            });
        }, 1000);
        setTimeout(() => {
            boton.prop("checked", false);
            location.reload();
        }, 4000);
    }
});

