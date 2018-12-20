<?php
header("content-type:text/html;charset=utf-8");
ini_set("session.cookie_domain",'hi-dream.com');
session_start();

header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');  
header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');


//注销登录
if(@$_GET['action'] == "logout"){
    echo  $_COOKIE['userid'];
    unset($_SESSION['userid']);
    unset($_SESSION['username']);
    setcookie('userid', '', 1,"/",".hi-dream.com");
    echo  $_COOKIE['userid'];
    echo '注销登录成功！点击此处 <a href="login.html">登录</a>';
    exit;
}

//登录
if(!isset($_POST['submit'])){
    exit('非法访问!');
}
$username = htmlspecialchars($_POST['username']);
$password = MD5($_POST['password']);

//包含数据库连接文件
include('conn.php');

//检测用户名及密码是否正确
$db=ConnectMysqli::getIntance();
$sql = "select id,code,name from user where login_name='$username' and password='$password' limit 1";
$result = $db->getOne($sql);
if ($result === null) {
    exit ('登录失败！点击此处 <a href="javascript:history.back(-1);">返回</a> 重试');
} else { 
    //登录成功
    $_SESSION['username'] = $result->name;
    $_SESSION['userid'] = $result->id;
    $_SESSION['code'] = $result->code;
    $_SESSION['login_name'] = $username;
    setcookie('userid', $_SESSION['userid'], time()+3600*24*365*10,"/",".hi-dream.com");
    
    $redirect = $_POST['redirect'];
    $url = '';
    if(!isset($redirect)){
        $url = "location:../index.html";
    }else{
        $url = "location:$redirect";
    }
    echo $url;
    header($url);
}
