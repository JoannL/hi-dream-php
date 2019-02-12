/**
 * 引用JS和CSS头文件
 */
var rootPath = getRootPath(); //项目路径
/**
 * 动态加载CSS和JS文件
 */
var dynamicLoading = {
    meta : function(){
        document.write('<!doctype html><html lang="zh-CN">');
        document.write('<meta name="viewport" content="width=device-width, initial-scale=1">');
        document.write('<meta charset="utf-8" /> ');
        document.write('<meta name="keywords" content="" />');
        document.write('<title>HI DREAM</title>');
    },
    css: function(path){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<link rel="stylesheet" type="text/css" href="' + path + version + '">');
    },
    js: function(path, charset){
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<script charset="' + (charset ? charset : "utf-8") + '" src="' + path + version + '"></script>');
    }
};

/**
 * 取得项目路径
 */
function getRootPath() {
    //取得当前URL
    var path = window.document.location.href;
    //取得主机地址后的目录
    var pathName = window.document.location.pathname;
    var post;
    if(pathName == '/'){
        post =  path.length-1;
    }else{
        post = path.indexOf(pathName);
    }
    //取得主机地址
    var hostPath = path.substring(0, post);
    //取得项目名
    //var name = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return hostPath + name + "/";
}

//动态生成meta
dynamicLoading.meta();
//动态加载项目 CSS文件
dynamicLoading.css(rootPath + "lib/model/css/bootstrap.css");
dynamicLoading.css(rootPath + "lib/css/style.css");
//字体
dynamicLoading.css(rootPath + "lib/model/css/font-awesome.css");
dynamicLoading.css(rootPath + "lib/model/css/yanone_kaffeesatz.css");
dynamicLoading.css(rootPath + "lib/model/css/dancing.css");

//动态加载项目 JS文件
dynamicLoading.js(rootPath + "lib/js/common/jquery-1.11.1.min.js", "utf-8");
dynamicLoading.js(rootPath + "lib/js/load.js", "utf-8");
dynamicLoading.js(rootPath + "lib/model/js/bootstrap.js", "utf-8");
dynamicLoading.js(rootPath + "lib/js/jtools.js", "utf-8");
