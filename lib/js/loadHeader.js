$(function(){
    $("#container").prepend('<header class="header"></header>');
    $(".header").load(getRootPath() + "/page/head.html");
})