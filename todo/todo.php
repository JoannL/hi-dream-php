<?php
header("content-type:text/html;charset=utf-8");
ini_set("session.cookie_domain",'hi-dream.com');
session_start();
$userid = $_COOKIE['userid'];

if(!isset($userid)){
    echo "nologin";
}
include('conn.php');
//检测用户名及密码是否正确
$db=ConnectMysqli::getIntance();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $sql = "select id,todo from b_todo where user_id ='$userid' limit 1";
    $result = $db->getOne($sql);
    echo $result->todo;
}else{
    $todo=$_POST['todo'];
    $todoArray=array("todo"=>$todo);
    $db->update('b_todo',$todoArray,"user_id ='$userid'");
}
exit;
?>