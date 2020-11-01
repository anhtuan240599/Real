var socket = io("http://localhost:4000");

socket.on("server-send-room",function(data){
    $("#dsRoom").html("")
    data.map(function(r){
        $("#dsRoom").append("<h4 class='room'>"+ r + "</h4>");
    })
})
socket.on("server-send-room-socket",function(data){
    $("#roomHienTai").html(data);
})
socket.on("server-chat",function(data){
    $("#right").append("<div>" + data.un + ":"+ data.nd + "</div>");
})

$(document).ready(function(){
    $("#btnTaoRoom").click(function(){
        socket.emit("tao-room", $("#txtRoom").val());
    });
    $("#btnChat").click(function(){
        socket.emit("user-chat",$("#txtMessage").val());
    })
    
});