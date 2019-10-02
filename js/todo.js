$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

        // code to be implemented

        $("ol").on("click", ".done-todo", function() {
        if($(this).prop("checked") == true){
            $(this).parent().addClass("checked")
        }
        else if($(this).prop("checked") == false){
            $(this).parent().removeClass("checked")
        }
        });

        function newToDo() {
            let inputText = $(".input-text").val();

            if (inputText==""){
                alert("Empty Note discarded.");
            }
            else{
                $("ol").append('<li id='+ generateUUID() + ' class="">' + '<input name="done-todo" type="checkbox" class="done-todo">' + inputText+ '</li>');
                $(".input-text").val("");

            }
        }

        $('#button').click(newToDo);

        $('.input-text').bind('keypress', function(key) {
        if(key.keyCode==13){
            newToDo();
        }
        });

        function noteViews() {
            if ($(this).attr("data-filter") == "all") {
                $('ol li').show();
                $('[data-filter="active"],[data-filter="complete"]').removeClass("selected");
                $(this).addClass("selected");
            } else if ($(this).attr("data-filter") == "active") {
                $('ol li').show();
                $('ol li.checked').hide();
                $('[data-filter="all"],[data-filter="complete"]').removeClass("selected");
                $(this).addClass("selected");
            } else if ($(this).attr("data-filter") == "complete") {
                $('ol li').hide();
                $('ol li.checked').show();
                $('[data-filter="all"],[data-filter="active"]').removeClass("selected");
                $(this).addClass("selected");
            }
        };

        $("[href='#']").click(noteViews);

        $(document).on("dblclick", "li", function() {
            $(this).attr("contenteditable", "true");
        });
        $(document).on("focusout", "li", function() {
            $(this).attr("contenteditable", "false");
        });
            
    });