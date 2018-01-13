// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery3
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widgets/dialog

function show_user(id) {
    $.getJSON("/users/"+id,function(data){
        $("#name").text(data.name);
        $("#email").text(data.email);
        $("#pPosts").hide();
        $("#tablePosts").hide();
        $("#bodyPosts").html("");
        $("#show").dialog({closeText:""});
    });
}

function show_user_posts(id) {
    $.getJSON("/users/show_with_posts/"+id,function(data){
        $("#name").text(data.name);
        $("#email").text(data.email);
        $("#pPosts").show();
        $("#tablePosts").show();
        $("#bodyPosts").html("");
        data.micropost.forEach(function (post,index){
            $("#bodyPosts").append("<tr>");
            $("#bodyPosts").append("<td>"+post.id+"</td>");
            $("#bodyPosts").append("<td>"+post.content+"</td>");
            $("#bodyPosts").append("</tr>");
        });
        $("#show").dialog({closeText:""});
    });
}

function edit_user(id) {
    $.get("/users/"+id+"/edit", function( data ) {
        $("#edit").empty();
        $("#edit").html( data );
        $("#edit").dialog({closeText:""});
        document.forms[0].id = "editUser"+id;
        $("#editUser"+id).submit(function(e) {
            if ($("#notice")) {
                $("#notice").html("User was successfully updated.");
            }
            var url = $("#editUser"+id).attr('action');
            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                data: $("#editUser"+id).serialize(), // serializes the form's elements.
                success: function(dataUpdated)
                {
                    if ($("#id_"+dataUpdated.id) && $("#id_"+dataUpdated.id).html() == id) {
                        $("#name_"+id).html(dataUpdated.name);
                        $("#email_"+id).html(dataUpdated.email);
                        if ($("#notice")) {
                            $("#notice").html("User was successfully updated.");
                        }
                    }
                }
            });
            e.preventDefault(); // avoid to execute the actual submit of the form.
            return false;
        });
    });
}
