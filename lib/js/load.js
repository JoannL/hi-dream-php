$(function(){
    $("#container").prepend('<header class="header"></header>');
    $(".header").load(getRootPath() + "/page/head.html");
    $("#body").load(getRootPath() + "/page/body.html");
})