<?php
class BlogService{

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

    function save($blog){

        $this->getDB()->insert("b_blog",$blog);
    }

    function getDB(){
        include('conn.php');
        $db=ConnectMysqli::getIntance();
        return $db;
    }
}