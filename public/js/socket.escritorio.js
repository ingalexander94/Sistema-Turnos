var socket = io();

var searchParam = new URLSearchParams(window.location.search);

if(!searchParam.has('escritorio')){
    window.location = "index.html";
    throw new Error("El escritorio es necesario");
}

var escritorio = searchParam.get('escritorio');
var label = $('small');

$('h1').text('Escritorio '+ escritorio);

$('button').on('click',function(){

    socket.emit('atenderTicket',{escritorio},function(res){
        if(res === "No hay tickets"){
            label.text(res);
            return;
        }
        label.text("Turno "+res.numero);
    });

});