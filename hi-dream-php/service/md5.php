<?php
header("content-type:text/html;charset=utf-8");

$password = MD5($_GET['password']);
echo $password;

?>