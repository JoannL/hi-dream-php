<?php
header("content-type:text/html;charset=utf-8");
ini_set("session.cookie_domain",'hi-dream.com');
session_start();
$userid = $_COOKIE['userid'];

if(isset($userid)){
    //包含数据库连接文件
    include('conn.php');
    
    //检测用户名及密码是否正确
    $db=ConnectMysqli::getIntance();
    $sql = "select id,code,name from user where id='$userid' limit 1";
    $result = $db->getOne($sql);
    if ($result !== null) {
        echo $result->name;
    }
}
exit;
?>