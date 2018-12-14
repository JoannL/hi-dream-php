<?php
header("content-type:text/html;charset=utf-8");
ini_set("session.cookie_domain",'hi-dream.com');
session_start();

echo    $_SESSION['username'];
echo    $_SESSION['userid'];
echo    $_SESSION['code'];
echo    $_SESSION['login_name'];


?>