<?php
class BlogService{
    var $db;

    function __construct() {
        include('conn.php');
        $this-> $db = ConnectMysqli::getIntance();
    }
    /**
     * 根据用户id查询博客
     * @param $userId
     * @return array
     */
    function findBlogByUserId($userId){
        $sql = "select * from b_blog where user_id = '$userId' and flag = 1 order by id desc";
        $result = $this -> getDB() -> getAll($sql);
        return $result;
    }

    /**
     * 保存一条记录
     * @param $blog
     */
    function save($blog){
        $this->getDB()->insert("b_blog",$blog);
    }

    /**
     * 获取数据库链接
     * @return bool|ConnectMysqli
     */
    function getDB(){
        return $this -> $db;
    }
}