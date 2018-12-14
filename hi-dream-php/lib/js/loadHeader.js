$(function(){
    $("#container").prepend('<header class="header"></header>');
    $(".header").load(getRootPath() + "/page/page-head.html");
})