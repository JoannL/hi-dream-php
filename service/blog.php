<?php
//包含数据库连接文件
include('blog.class.php');
header("content-type:text/html;charset=utf-8");
session_start();

header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
header('Access-Control-Allow-Headers:x-requested-with');
header('Access-Control-Max-Age:86400');
header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers:x-requested-with,content-type');
header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');

    $blogService = new BlogService();
    switch ($_SERVER['REQUEST_METHOD']) {
        case "POST":
            $blog['user_id']=$_SESSION['userid'];
            if($blog['user_id'] === null){
                echo "noLogin";
                exit;
            }
            $blog['title']=$_POST['title'];
            $blog['content']=$_POST['content'];
            $blog['create_time']=date("Y-m-d H:i:s");
            $blogService ->save($blog);
            echo "success";
            break;
        case "GET":
            $arr = $blogService -> findBlogByUserId(1);
            echo json_encode($arr);
            break;
        default:
            echo "不支持其他请求方式";
    }


