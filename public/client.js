var socket = io("http://localhost:4000");

socket.on("server-send-dki-thatbai",function(){
    alert("Da co nguoi su dung ten nay");
})

socket.on("server-send-danhsach-User",function(data){
        $("#boxContent").html("");
        data.forEach(function(i) {
            $("#boxContent").append("<div class='user'>"+ i + "</div>");
        });
})

socket.on("server-send-dki-thanhcong",function(data){
    $("#currentUser").html(data); 
    $("#loginForm").hide(200);
    $("#chatForm").show(100);
})



socket.on("server-send-message",function(data){
    $("#listMessage").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>");
})

socket.on("someone-typing",function(data){
    $("#thongbao").html(data)
})

socket.on("someone-stop",function(){
    $("#thongbao").html("")
})



$(document).ready(function(){
    $("#loginForm").show();
    $("#chatForm").hide();

    $("#btnRegister").click(function(){
       socket.emit("client-send-Username", $("#txtUsername").val());
    })

    $("#btnLogout").click(function(){
       socket.emit("logout");
    });

    $("#txtMessage").focusin(function(){
        socket.emit("typing");
     })
 
    $("#txtMessage").focuson(function(){
        socket.emit("stop-typing");
    })
    $("#btnSendMessage").click(function(){
        socket.emit("user-send-message", $("#txtMessage").val());
    })
    
});

(function($){
    
    $.fn.autoResize = function(options) {
        
        // Just some abstracted details,
        // to make plugin users happy:
        var settings = $.extend({
            onResize : function(){},
            animate : true,
            animateDuration : 150,
            animateCallback : function(){},
            extraSpace : 20,
            limit: 1000
        }, options);
        
        // Only textarea's auto-resize:
        this.filter('textarea').each(function(){
            
                // Get rid of scrollbars and disable WebKit resizing:
            var textarea = $(this).css({resize:'none','overflow-y':'hidden'}),
            
                // Cache original height, for use later:
                origHeight = textarea.height(),
                
                // Need clone of textarea, hidden off screen:
                clone = (function(){
                    
                    // Properties which may effect space taken up by chracters:
                    var props = ['height','width','lineHeight','textDecoration','letterSpacing'],
                        propOb = {};
                        
                    // Create object of styles to apply:
                    $.each(props, function(i, prop){
                        propOb[prop] = textarea.css(prop);
                    });
                    
                    // Clone the actual textarea removing unique properties
                    // and insert before original textarea:
                    return textarea.clone().removeAttr('id').removeAttr('name').css({
                        position: 'absolute',
                        top: 0,
                        left: -9999
                    }).css(propOb).attr('tabIndex','-1').insertBefore(textarea);
					
                })(),
                lastScrollTop = null,
                updateSize = function() {
					
                    // Prepare the clone:
                    clone.height(0).val($(this).val()).scrollTop(10000);
					
                    // Find the height of text:
                    var scrollTop = Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
                        toChange = $(this).add(clone);
						
                    // Don't do anything if scrollTip hasen't changed:
                    if (lastScrollTop === scrollTop) { return; }
                    lastScrollTop = scrollTop;
					
                    // Check for limit:
                    if ( scrollTop >= settings.limit ) {
                        $(this).css('overflow-y','');
                        return;
                    }
                    // Fire off callback:
                    settings.onResize.call(this);
					
                    // Either animate or directly apply height:
                    settings.animate && textarea.css('display') === 'block' ?
                        toChange.stop().animate({height:scrollTop}, settings.animateDuration, settings.animateCallback)
                        : toChange.height(scrollTop);
                };
            
            // Bind namespaced handlers to appropriate events:
            textarea
                .unbind('.dynSiz')
                .bind('keyup.dynSiz', updateSize)
                .bind('keydown.dynSiz', updateSize)
                .bind('change.dynSiz', updateSize);
            
        });
        
        // Chain:
        return this;
        
    };
    
    
    
})(jQuery);