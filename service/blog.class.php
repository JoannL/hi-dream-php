<?php
class BlogService{

    /**
     * 根据用户id查询博客
     * @param $userId
     * @return array
     */
    function findBlogByUserId($userId){
        include('conn.php');
        $db=ConnectMysqli::getIntance();
        $sql = "select * from b_blog where user_id = '$userId' and flag = 1 order by id desc";
        $result = $db-> getAll($sql);
        return $result;
    }
}